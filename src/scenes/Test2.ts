import { RichStringBuilder } from "../gameobjects/RichStringBuilder";
import Scene from "./Scene";

export class Test2 extends Scene {

    create(): void {

        const builder = new RichStringBuilder(5, 100);

        builder
            .string("hello", { fill: "red", fontSize: 16 })
            .string("世界", { fill: "darkblue", fontSize: 20 })
            .string("Мир", { fill: "green", fontSize: 50 })
            .build(this.stage);
    }
}