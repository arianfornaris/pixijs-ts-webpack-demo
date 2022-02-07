import { Text } from "pixi.js";
import Scene from "./Scene";

export class Test2 extends Scene {

    create(): void {

        this.addChild(new Text("TEST 2", { fill: "#fff" }));
    }
}