import { Text } from "pixi.js";
import Scene from "./Scene";

export class Test3 extends Scene {

    create(): void {

        this.addChild(new Text("TEST 3", { fill: "#fff" }));
    }
}