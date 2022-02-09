import EventEmitter from "eventemitter3";
import { Application } from "pixi.js";

export function timer(app: Application, duration: number, callback?: (progress: number) => void) {

    return new Timer(app, duration, callback);
}

export function timerPromise(app: Application, duration: number, callback?: (progress: number) => void) {

    return new Promise((resolver, reject) => {

        const timer = new Timer(app, duration, callback);

        timer.once("complete", () => resolver(undefined));
    });
}

export class Timer extends EventEmitter {

    private _time = 0;

    constructor(
        private app: Application,
        private duration: number,
        private callback?: (progress: number) => void) {

        super();

        this.app.ticker.add(this.update, this);

    }

    private update() {

        if (this._time >= this.duration) {

            if (this.callback) {

                this.callback(1);
            }

            this.stop();

        } else {

            if (this.callback) {

                this.callback(this._time / this.duration);
            }
        }

        this._time = this._time + this.app.ticker.elapsedMS;
    }

    stop() {

        this.app.ticker.remove(this.update, this);

        this.emit("complete");
    }
}