import { Application, Sprite } from "pixi.js";

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const obj1 = Sprite.from("clampy.png");
obj1.scale.set(0.5);

const obj2 = Sprite.from("clampy.png");
obj2.angle = 90;
obj2.anchor.set(0.5);
obj1.addChild(obj2);

app.stage.addChild(obj1);

app.ticker.add(() => {
	obj1.x += 1;
	obj1.y += 1;
	obj1.angle += 1;
});