import { Application, Container, ITextStyle, Loader, Rectangle, Sprite, Text, TextStyle, Texture } from "pixi.js";

class StringElement {

    constructor(
        public text: string,
        public style?: Partial<ITextStyle> | TextStyle) {
    }
}

class ImageElement {

    constructor(
        public key: string,
        public frame: string,
        public height: number) {
    }
}

export class RichStringBuilder {

    private _letterSpacing: number = 10;
    private _x: number = 0;
    private _y: number = 0;
    private _fontSize: number = 16;
    private _elements: Array<StringElement | ImageElement> = [];

    position(x: number, y: number) {

        this._x = x;
        this._y = y;

        return this;
    }

    spacing(letterSpacing: number) {

        this._letterSpacing = letterSpacing;

        return this;
    }

    fontSize(fontSize: number) {

        this._fontSize = fontSize;

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

        let x = this._x;
        let y = this._y;

        // create objects and first metrics

        const lineData: Array<{ text?: Text, sprite?: Sprite, bounds?: Rectangle }> = [];

        for (const element of this._elements) {

            if (element instanceof StringElement) {

                const text = new Text(element.text, element.style);

                lineData.push({ text, bounds: text.getBounds() });

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

                lineData.push({ sprite, bounds: sprite.getBounds() });
            }
        }

        // compute line height

        let lineHeight = 0;

        for (const data of lineData) {

            if (data.text) {
                
                lineHeight = Math.max(lineHeight, data.bounds.height);
            }
        }

        // adjust lineHeight of texts

        for (const data of lineData) {

            if (data.text) {

                const style = data.text.style;
                style.lineHeight = lineHeight * 2;
            }
        }

        for (const data of lineData) {

            if (data.text) {

                data.text.position.set(x, y + (lineHeight - data.bounds.height));

            } else {

                data.sprite.position.set(x, y);
            }

            x += data.bounds.width + this._letterSpacing;
        }

        for (const data of lineData) {

            parent.addChild(data.text ?? data.sprite);
        }
    }
}