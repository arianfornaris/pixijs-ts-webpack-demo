import { Application, InteractionEvent, Text } from "pixi.js";
import Scene from "./Scene";
import { Test1 } from "./Test1";
import { Test2 } from "./Test2";
import { Test3 } from "./Test3";

export class Menu extends Scene {

    constructor(app: Application) {
        super(app);
    }

    create(): void {

        const testsInfo = [
            { title: "Test 1", factory: () => new Test1(this.app) },
            { title: "Test 2", factory: () => new Test2(this.app) },
            { title: "Test 3", factory: () => new Test3(this.app) }
        ]

        let i = 0;

        for (const testInfo of testsInfo) {

            const btn = new Text(testInfo.title, {
                fill: "#fff"
            });

            btn.position.set(100, 100 + i++ * 50);
            btn.interactive = true;
            btn.once("pointerdown", (e: InteractionEvent) => {

                this.destroy();

                testInfo.factory();
            });

            this.addChild(btn);
        }
    }
}