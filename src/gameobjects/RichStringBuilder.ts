import { Container, ITextStyle, Rectangle, Text, TextStyle } from "pixi.js";

class StringElement {

    constructor(
        public text: string,
        public style?: Partial<ITextStyle> | TextStyle) {
    }
}

class ImageElement {
    key: string;
    frame?: string;
}

export class RichStringBuilder {

    private _y: number;
    private _x: number;
    private _letterSpacing: number = 10;
    private _elements: Array<StringElement | ImageElement>;

    constructor(x: number, y: number) {

        this._x = x;
        this._y = y;
        this._elements = [];
    }

    string(str: string, style?: Partial<ITextStyle> | TextStyle) {

        style = Object.assign(style || {}, { trim: true, textBaseline: "middle" });

        this._elements.push(new StringElement(str, style));

        return this;
    }

    build(parent?: Container) {

        let x = this._x;
        let y = this._y;

        const lineData: Array<{ text: Text, bounds: Rectangle }> = [];

        for (const element of this._elements) {

            if (element instanceof StringElement) {

                const text = new Text(element.text, element.style);
                const bounds = text.getBounds();

                lineData.push({ text, bounds });
            }
        }

        let lineHeight = 0;

        for (const data of lineData) {

            lineHeight = Math.max(lineHeight, data.bounds.height);
        }

        for(const data of lineData) {

            const style = data.text.style;
            style.lineHeight = lineHeight * 2;
        }

        for (const data of lineData) {

            console.log(data.text.text + " " + lineHeight + " " + data.bounds.height);

            data.text.position.set(x, y + (lineHeight - data.bounds.height));

            x += data.bounds.width + this._letterSpacing;
        }

        for (const data of lineData) {

            parent.addChild(data.text);
        }
    }

    // string(str: string, style?: Partial<ITextStyle> | TextStyle, parent?: Container) {

    //     const text = new Text(str, style);

    //     text.position.set(this._cursorX, this._cursorY);

    //     const bounds = text.getBounds();

    //     this._cursorX += bounds.width + this._spacing;

    //     if (parent) {

    //         parent.addChild(text);
    //     }

    //     return text;
    // }
}