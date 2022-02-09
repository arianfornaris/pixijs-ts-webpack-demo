import { Sprite } from "pixi.js";
import { Menu } from "./Menu";
import Scene from "./Scene";

export class BaseTest extends Scene {

    create(): void {

        const bg = new Sprite();
        bg.interactive = true;
        bg.width = this.app.screen.width;
        bg.height = this.app.screen.height;

        bg.on("pointerdown", async () => {

            await this.timer(100, p => this.app.stage.alpha = (1 - p));

            this.destroy();

            this.stage.alpha = 1;

            new Menu(this.app);
        });

        this.addChild(bg)
    }
}