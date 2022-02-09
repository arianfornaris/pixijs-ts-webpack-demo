import { Application, InteractionEvent, Sprite, Text } from "pixi.js";
import Scene from "./Scene";
import { Test1 } from "./Test1";
import { Test2 } from "./Test2";
import { Test3 } from "./Test3";

export class Menu extends Scene {

    constructor(app: Application) {
        super(app);
    }

    create(): void {

        const bg = new Sprite(this.app.loader.resources["bg"].texture);
        bg.interactive = true;
        bg.width = this.app.screen.width;
        bg.height = this.app.screen.height;
        this.addChild(bg);

        const testsInfo = [
            { frame: "test1-btn.png", factory: () => new Test1(this.app) },
            { frame: "test2-btn.png", factory: () => new Test2(this.app) },
            { frame: "test3-btn.png", factory: () => new Test3(this.app) }
        ]

        let i = 0;

        for (const testInfo of testsInfo) {

            const btn = new Sprite(this.app.loader.resources["buttons"].textures[testInfo.frame]);

            btn.position.set(this.app.screen.width / 2, 130 + i++ * 200);
            btn.anchor.set(0.5);
            btn.interactive = true;
            btn.once("pointerdown", (e: InteractionEvent) => {

                this.destroy();

                testInfo.factory();
            });

            this.addChild(btn);
        }

        //this.destroy();
        //new Test3(this.app);
    }
}