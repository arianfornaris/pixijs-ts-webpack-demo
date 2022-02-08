import { Application, Container, ITextStyle, Loader, Rectangle, Sprite, Text, TextStyle, Texture } from "pixi.js";

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

export class RichStringBuilder {

    private _letterSpacing = 10;
    private _lineSpacing = 5;
    private _x = 0;
    private _y = 0;
    private _fontSize = 16;
    private _width = 0;
    private _elements: Array<StringElement | ImageElement> = [];

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

        style = Object.assign(style || {}, { trim: true, textBaseline: "middle", fontSize: this._fontSize });

        this._elements.push(new StringElement(str, style));

        return this;
    }

    image(key: string, frame?: string) {

        this._elements.push(new ImageElement(key, frame, this._fontSize));

        return this;
    }

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

                const sprite = new Sprite(texture);
                sprite.height = element.height;
                sprite.scale.x = sprite.scale.y;

                element.object = sprite;
                element.bounds = sprite.getBounds();
            }
        }

        let x = this._x;
        let y = this._y;

        // {
        //     let height = 0;

        //     for (const element of this._elements) {

        //         if (x + element.bounds.width > this._width) {

        //             break;
        //         }

        //         x += element.bounds.width + this._letterSpacing;

        //         height = Math.max(height, element.bounds.height);
        //     }
        // }

        // compute line height

        let lineHeight = 0;

        for (const element of this._elements) {

            if (element instanceof StringElement) {

                lineHeight = Math.max(lineHeight, element.bounds.height);
            }
        }

        // adjust lineHeight of texts

        for (const element of this._elements) {

            if (element instanceof StringElement) {

                const style = element.object.style;
                style.lineHeight = lineHeight * 2;
            }
        }

        // adjust position

        for (const element of this._elements) {

            if (x + element.bounds.width > this._width) {

                x = this._x;
                y += lineHeight + this._lineSpacing;
            }

            if (element.object) {

                element.object.position.set(x, y + (lineHeight - element.bounds.height));

            } else {

                element.object.position.set(x, y);
            }

            x += element.bounds.width + this._letterSpacing;
        }

        // add the objects

        if (parent) {

            for (const element of this._elements) {

                parent.addChild(element.object);
            }
        }
    }
}