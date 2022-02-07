import { Text } from "pixi.js";
import Scene from "./Scene";

export class Test1 extends Scene {

    create(): void {

        this.addChild(new Text("TEST 1", { fill: "#fff" }));
    }
}