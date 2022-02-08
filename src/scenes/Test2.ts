import { RichStringBuilder } from "../gameobjects/RichStringBuilder";
import Scene from "./Scene";

export class Test2 extends Scene {

    create(): void {

        const builder = new RichStringBuilder();

        builder
            .position(5, 0)
            .spacing(5)
            .fontSize(45)
            .string("hello", { fill: "red" })
            .image("emojis", "emoji-07.png")
            .string("世界", { fill: "darkblue" })
            .image("emojis", "emoji-01.png")
            .string("Мир", { fill: "green" })
            .build(this.app);
    }
}