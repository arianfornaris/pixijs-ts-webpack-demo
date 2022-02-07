import { Application, DisplayObject } from "pixi.js";

export default class Scene {

    constructor(protected app: Application) {

        this.create();

        this.app.ticker.add(this.update, this);
    }

    protected get stage() {

        return this.app.stage;
    }

    protected addChild<T extends DisplayObject[]>(...children: T): T[0] {

        return this.stage.addChild(...children);
    }

    create() {

    }

    destroy() {

        this.app.ticker.remove(this.update, this);

        this.app.stage.removeChildren();
    }

    protected update(delta?: number) {

    }
}