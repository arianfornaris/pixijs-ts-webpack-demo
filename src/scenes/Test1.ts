import { Sprite, Text } from "pixi.js";
import { BaseTest } from "./BaseTest";
import Scene from "./Scene";

const TOP_POSITION = 200;
const MOVE_CARD_DURATION = 2000;
const NEXT_CARD_DELAY = 1000;

export class Test1 extends BaseTest {

    async create() {

        super.create();

        this.addDebugText();

        const sheet = this.app.loader.resources["cards"].textures;

        const margin = 20;

        const cards: Sprite[] = [];

        for (let i = 0; i < 144; i++) {

            const card = new Sprite(sheet[(i % 10) + 1 + ".jpg"]);

            card.position.set(200 + Math.random() * margin, 500 + Math.random() * margin);
            card.anchor.set(0.5, 0.5);
            card.angle = (3 + Math.random() * 3) * (i % 2 == 0 ? 1 : -1);

            this.addChild(card);

            cards.push(card);
        }

        while (cards.length > 0) {

            await this.timer(NEXT_CARD_DELAY);

            const card = cards.pop();

            this.stage.setChildIndex(card, this.stage.children.length - 1);

            const y = card.position.y;
            const angle = card.angle;

            await this.timer(MOVE_CARD_DURATION, p => {

                card.y = Math.max(y - (y - TOP_POSITION) * p, TOP_POSITION);
                card.angle = angle - 2 * angle * p;

                card.scale.set(1 + Math.sin(p * Math.PI) * 0.2);
            });
        }
    }

    private addDebugText() {

        const label = new Text("0fps", { fill: "#f0f0f0", fontFamily: "monospace", fontSize: 14 });
        label.position.set(10, 10);
        this.addChild(label);

        this.app.ticker.add(() => {

            label.text = Math.round(this.app.ticker.FPS) + "fps";
        });
    }
}