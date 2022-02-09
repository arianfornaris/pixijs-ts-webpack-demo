import { Application, Container, ITextStyle, Rectangle, Sprite, Text, TextStyle, Texture } from "pixi.js";

class ParagraphElement {

    public bounds: Rectangle;
}

class StringElement extends ParagraphElement {

    public object: Text;

    constructor(
        public text: string,
        public style?: Partial<ITextStyle> | TextStyle) {
        super();
    }
}

class ImageElement extends ParagraphElement {

    public object: Sprite;

    constructor(
        public key: string,
        public frame: string,
        public height: number) {
        super();
    }
}

class Line {
    elements: Array<StringElement | ImageElement> = [];
    height = 0;
}

export class RichStringBuilder {

    private _letterSpacing = 10;
    private _lineSpacing = 5;
    private _x = 0;
    private _y = 0;
    private _fontSize = 16;
    private _width = 0;
    private _elements: Array<StringElement | ImageElement> = [];

    build(app: Application, parent?: Container) {

        parent = parent ?? app.stage;

        // create objects and first metrics

        for (const element of this._elements) {

            if (element instanceof StringElement) {

                const text = new Text(element.text, element.style);

                element.object = text;
                element.bounds = text.getBounds();

            } else {

                let texture: Texture;

                if (element.frame) {

                    const sheet = app.loader.resources[element.key].textures;
                    texture = sheet[element.frame];

                } else {

                    texture = app.loader.resources[element.key].texture;
                }

                element.object = new Sprite(texture);
            }
        }

        const lines: Line[] = [];

        {
            let x = this._x;
            let y = this._y;
            let lastTextHeight = 0;

            let line = new Line();
            lines.push(line);

            for (const element of this._elements) {

                if (element instanceof ImageElement) {

                    // adjust the height of the image, based on current line height

                    const sprite = element.object;
                    sprite.height = (lastTextHeight === 0 ? element.height : lastTextHeight) * 0.75;
                    sprite.scale.x = sprite.scale.y;
                    element.bounds = sprite.getBounds();

                } else {

                    lastTextHeight = element.bounds.height;
                }

                if (x + element.bounds.width >= this._width) {

                    y += line.height + this._lineSpacing;
                    x = this._x;

                    line = new Line();
                    lines.push(line);
                }

                element.object.position.set(x, y);

                line.elements.push(element);

                line.height = Math.max(line.height, element.bounds.height);

                x += element.bounds.width + this._letterSpacing;

            }
        }

        // adjust lineHeight of texts

        for (const line of lines) {

            for (const element of line.elements) {

                if (element instanceof StringElement) {

                    const style = element.object.style;
                    style.lineHeight = line.height * 2;
                }
            }
        }

        // adjust position

        for (const line of lines) {

            for (const element of line.elements) {

                if (element instanceof StringElement) {
                    
                    element.object.position.y += (line.height - element.bounds.height);

                } else {

                    element.object.position.y += line.height - element.height * 0.75;
                }
            }
        }

        // add the objects

        if (parent) {

            for (const element of this._elements) {

                parent.addChild(element.object);
            }
        }
    }

    position(x: number, y: number) {

        this._x = x;
        this._y = y;

        return this;
    }

    letterSpacing(letterSpacing: number) {

        this._letterSpacing = letterSpacing;

        return this;
    }

    lineSpacing(lineSpacing: number) {

        this._lineSpacing = lineSpacing;

        return this;
    }

    fontSize(fontSize: number) {

        this._fontSize = fontSize;

        return this;
    }

    width(width: number) {

        this._width = width;

        return this;
    }

    string(str: string, style?: Partial<ITextStyle> | TextStyle) {

        style = Object.assign(style || {}, { textBaseline: "middle", fontSize: this._fontSize });

        this._elements.push(new StringElement(str, style));

        return this;
    }

    image(key: string, frame?: string) {

        this._elements.push(new ImageElement(key, frame, this._fontSize));

        return this;
    }
}