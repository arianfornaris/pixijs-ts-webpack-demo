import { RichStringBuilder } from "../gameobjects/RichStringBuilder";
import Scene from "./Scene";

export class Test2 extends Scene {

    create(): void {

        const builder = new RichStringBuilder();

        builder
            .position(5, 0)
            .letterSpacing(5)
            .lineSpacing(20)
            .fontSize(32)
            .width(400);

        for (let i = 0; i < 10; i++) {

            builder.string("hello", { fill: "pink" })
                .image("emojis", "emoji-07.png")
                .string("世界", { fill: "darkblue" })
                .image("emojis", "emoji-01.png")
                .string("Мир", { fill: "green" })
                .build(this.app);
        }
    }
}