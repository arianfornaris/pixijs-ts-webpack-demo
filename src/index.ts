import { Application, Sprite, Texture } from "pixi.js";
import { Menu } from "./scenes/Menu";
import { Test2 } from "./scenes/Test2";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 400,
	height: 700,
});

app.loader
	.add("cards", "./assets/cards.json")
	.load(() => {

		console.log("complete");

		// new Menu(app);
		new Test2(app);
	});

