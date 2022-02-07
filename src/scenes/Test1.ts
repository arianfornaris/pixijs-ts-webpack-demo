import { Sprite } from "pixi.js";
import Scene from "./Scene";

const BOTTOM = 500;
const DURATION = 2000;

export class Test1 extends Scene {

    private _stack: Sprite[];
    private _topCard: Sprite;
    private _time = 0;
    private _startAngle = 0;
    private _startY: number;

    create(): void {

        let sheet = this.app.loader.resources["cards"].textures;

        const margin = 20;

        this._stack = [];

        for (let i = 0; i < 144; i++) {

            const sprite = new Sprite(sheet[(i % 10) + 1 + ".jpg"]);

            sprite.position.set(200 + Math.random() * margin, 200 + Math.random() * margin);
            sprite.anchor.set(0.5, 0.5);
            sprite.angle = (3 + Math.random() * 3) * (i % 2 == 0 ? 1 : -1);

            this.addChild(sprite);

            this._stack.push(sprite);
        }

        this.popCard();
    }

    private popCard() {

        this._topCard = this._stack.pop();

        if (this._topCard) {

            this._time = 0;
            this._startAngle = this._topCard.angle;
            this._startY = this._topCard.y;

            this.stage.setChildIndex(this._topCard, this.stage.children.length - 1);
        }
    }

    protected update(): void {

        if (!this._topCard) {

            return;
        }

        this._time += this.app.ticker.elapsedMS;

        const p = this._time / DURATION;

        this._topCard.y = Math.min(this._startY + (BOTTOM - this._startY) * p, BOTTOM);
        this._topCard.angle = this._startAngle - 2 * this._startAngle * p;

        this._topCard.scale.set(1 + Math.sin(p * Math.PI) * 0.2);

        if (this._topCard.y >= BOTTOM) {

            this.popCard();
        }
    }
}