import { Application, DisplayObject } from "pixi.js";
import { TimerManager } from "../utils/Timer";

export default class Scene {

    private _timerManager: TimerManager;
    private _active = true;

    constructor(protected app: Application) {

        this._timerManager = new TimerManager();

        this.create();

        this.app.ticker.add(this.update, this);
    }

    protected get stage() {

        return this.app.stage;
    }

    protected addChild<T extends DisplayObject[]>(...children: T): T[0] {

        return this.stage.addChild(...children);
    }

    timer(duration: number, callback?: (progress: number) => void) {

        return this._timerManager.timer(this.app, duration, callback);
    }

    create() {

    }

    destroy() {

        this._active = false;

        this._timerManager.destroy();

        this.app.ticker.remove(this.update, this);

        this.app.stage.removeChildren();
    }

    get active() {

        return this._active;
    }

    protected update(delta?: number) {

    }
}