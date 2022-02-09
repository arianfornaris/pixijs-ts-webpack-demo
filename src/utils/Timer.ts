import EventEmitter from "eventemitter3";
import { Application } from "pixi.js";

export class TimerManager {

    private _timers: Timer[] = [];

    timer(app: Application, duration: number, callback?: (progress: number) => void) {

        return new Promise((resolver, reject) => {

            const timer = new Timer(app, duration, callback);

            this._timers.push(timer);

            timer.once("complete", () => resolver(undefined));
        });
    }

    destroy() {

        for (const timer of this._timers) {

            timer.destroy();
        }
    }
}

export class Timer extends EventEmitter {

    private _time = 0;
    private _stopped = false;

    constructor(
        private app: Application,
        private duration: number,
        private callback?: (progress: number) => void) {

        super();

        this.app.ticker.add(this.update, this);
    }

    private update() {

        if (this._stopped) {

            return;
        }

        if (this._time >= this.duration) {

            if (this.callback) {

                this.callback(1);
            }

            this.completed();

        } else {

            if (this.callback) {

                this.callback(this._time / this.duration);
            }
        }

        this._time = this._time + this.app.ticker.elapsedMS;
    }

    destroy() {

        this._stopped = true;

        this.app.ticker.remove(this.update, this);
    }

    private completed() {

        this.destroy();

        this.emit("complete");
    }
}