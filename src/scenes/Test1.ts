import { Sprite, Text } from "pixi.js";
import Scene from "./Scene";

const TOP_POSITION = 200;
const MOVE_CARD_DURATION = 2000;
const NEXT_CARD_DELAY = 1000;

export class Test1 extends Scene {

    private _cards: Sprite[];
    private _movingCard: Sprite;
    private _time: number;
    private _cardInitAngle: number;
    private _cardInitY: number;
    private _state: "waiting" | "moving";

    create(): void {

        let sheet = this.app.loader.resources["cards"].textures;

        const margin = 20;

        this._cards = [];

        for (let i = 0; i < 144; i++) {

            const card = new Sprite(sheet[(i % 10) + 1 + ".jpg"]);

            card.position.set(200 + Math.random() * margin, 500 + Math.random() * margin);
            card.anchor.set(0.5, 0.5);
            card.angle = (3 + Math.random() * 3) * (i % 2 == 0 ? 1 : -1);

            this.addChild(card);

            this._cards.push(card);
        }

        this.addDebugText();

        this._state = "waiting";
        this._time = 0;
    }

    private addDebugText() {

        const label = new Text("0fps", {fill: "#f0f0f0"});
        label.position.set(10, 10);
        this.addChild(label);

        this.app.ticker.add(() => {

            label.text = Math.round(this.app.ticker.FPS) + "fps";
        });
    }    

    private popNextCard() {

        this._movingCard = this._cards.pop();

        if (this._movingCard) {

            this._cardInitAngle = this._movingCard.angle;
            this._cardInitY = this._movingCard.y;

            this.stage.setChildIndex(this._movingCard, this.stage.children.length - 1);
        }
    }

    private updateCardMovement() {

        if (!this._movingCard) {

            return;
        }

        this._time += this.app.ticker.elapsedMS;

        const p = this._time / MOVE_CARD_DURATION;

        this._movingCard.y = Math.max(this._cardInitY - (this._cardInitY - TOP_POSITION) * p, TOP_POSITION);
        this._movingCard.angle = this._cardInitAngle - 2 * this._cardInitAngle * p;

        this._movingCard.scale.set(1 + Math.sin(p * Math.PI) * 0.2);

        if (this._movingCard.y <= TOP_POSITION) {

            this._state = "waiting";
            this._time = 0;
        }
    }

    private updateWaiting() {

        this._time += this.app.ticker.elapsedMS;

        if (this._time > NEXT_CARD_DELAY) {

            this._state = "moving";
            this._time = 0;

            this.popNextCard();
        }
    }

    protected update(): void {

        if (this._state === "waiting") {

            this.updateWaiting();

        } else {

            this.updateCardMovement();
        }
    }
}