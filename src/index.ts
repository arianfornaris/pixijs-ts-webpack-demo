import { Application } from "pixi.js";
import { Preload } from "./scenes/Preload";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	// backgroundColor: 0x6495ed,
	backgroundColor: 0x1F2549,
	width: 400,
	height: 700,
});


app.view.style.width = "auto";
app.view.style.height = "100%";

new Preload(app);

