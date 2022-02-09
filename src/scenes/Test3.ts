import { Text } from "pixi.js";
import { BaseTest } from "./BaseTest";

export class Test3 extends BaseTest {

    create(): void {

        super.create();

        this.addChild(new Text("TEST 3", { fill: "#fff" }));
    }
}