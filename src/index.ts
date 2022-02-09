import { Application } from "pixi.js";
import { Menu } from "./scenes/Menu";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	// backgroundColor: 0x6495ed,
	backgroundColor: 0,
	width: 400,
	height: 700,
});

app.loader
	.add("cards", "./assets/cards.json")
	.add("emojis", "./assets/emojis.json")
	.add("fire", "./assets/fire.json")
	.add("bg", "./assets/bg.jpg")
	.load(() => {

		console.log("complete");

		new Menu(app);
	});

