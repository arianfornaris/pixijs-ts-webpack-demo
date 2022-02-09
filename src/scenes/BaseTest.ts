import { Container, Sprite } from "pixi.js";
import { Menu } from "./Menu";
import Scene from "./Scene";

export class BaseTest extends Scene {

    create(): void {

        const bg = new Sprite(this.app.loader.resources["bg"].texture);
        bg.interactive = true;
        bg.width = this.app.screen.width;
        bg.height = this.app.screen.height;

        bg.on("pointerdown", async () => {

            const sceneObjects = [];

            for(const obj of this.stage.children) {

                if (obj !== bg) {
                    
                    sceneObjects.push(obj);
                }
            }

            await this.timer(100, p => sceneObjects.forEach(e => e.alpha = 1 - p));

            this.destroy();

            this.stage.alpha = 1;

            new Menu(this.app);
        });

        this.addChild(bg)
    }
}