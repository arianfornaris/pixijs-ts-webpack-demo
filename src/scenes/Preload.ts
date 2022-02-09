import { Text } from "pixi.js";
import { Menu } from "./Menu";
import Scene from "./Scene";

export class Preload extends Scene {

    create(): void {

        const text = new Text("Loading", { fill: "white", fontSize: 18 });

        text.anchor.set(0.5);

        text.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

        this.addChild(text);

        this.app.loader
            .add("cards", "./assets/cards.json")
            .add("emojis", "./assets/emojis.json")
            .add("fire", "./assets/fire.json")
            .add("buttons", "./assets/buttons.json")
            .add("bg", "./assets/bg.jpg")
            .load(() => {


                this.destroy();

                new Menu(this.app);
            });

    }
}