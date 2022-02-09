import { Emitter } from "pixi-particles";
import { Container, Sprite, Text } from "pixi.js";
import { BaseTest } from "./BaseTest";
import Scene from "./Scene";

export class Test3 extends BaseTest {
    private _layer1: Container;
    private _emitters: Emitter[];
    private _layer2: Container;
    private _layer3: Container;

    async create() {

        super.create();

        this._emitters = [];

        this._layer1 = this.addChild(new Container());
        this._layer2 = this.addChild(new Container());
        this._layer3 = this.addChild(new Container());

        this.flames1();
        this.flames2();

        const sprite = new Sprite(this.app.loader.resources["emojis"].textures["emoji-08.png"]);

        this._layer2.addChild(sprite);

        const delta = 50;

        sprite.anchor.set(0.5);
        sprite.position.set(200 - delta/2, 500);
        sprite.alpha = 0.8;


        while (this.active) {

            const x1 = sprite.x;

            this.timer(2000, p => sprite.angle = -5 + 10 * Math.sin(p * Math.PI));

            await this.timer(1000, p => {

                sprite.x = x1 + delta * Math.sin(p * Math.PI/2);

                for (const emitter of this._emitters) {

                    emitter.spawnPos.set(sprite.x, sprite.y);
                }
            });

            const x2 = sprite.x;

            await this.timer(1000, p => {

                sprite.x = x2 - delta * Math.sin(p * Math.PI/2);

                for (const emitter of this._emitters) {

                    emitter.spawnPos.set(sprite.x, sprite.y);
                }
            });
        }
    }

    private flames1() {

        const textures = this.app.loader.resources["fire"].textures;

        const emitter = new Emitter(this._layer1,
            [
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-black.png"]
            ],
            {
                alpha: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ]
                },
                scale: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.2,
                            time: 1
                        }
                    ],
                },
                speed: {
                    list: [
                        {
                            value: 8000,
                            time: 0
                        },
                        {
                            value: 10000,
                            time: 1
                        }
                    ],
                },
                acceleration: {
                    x: -2000,
                    y: -4000
                },
                startRotation: {
                    min: -100,
                    max: -80
                },
                lifetime: {
                    min: 0.5,
                    max: 1
                },
                frequency: 0.01,
                spawnChance: 1,
                particlesPerWave: 6,
                emitterLifetime: 0,
                maxParticles: 1000,
                pos: {
                    x: 200,
                    y: 500
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 50
                }
            });

        emitter.emit = true;

        this._emitters.push(emitter);
    }

    private flames2() {

        const textures = this.app.loader.resources["fire"].textures;

        const emitter = new Emitter(this._layer3,
            [
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-red.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-yellow.png"],
                textures["particle-black.png"]
            ],
            {
                alpha: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ]
                },
                scale: {
                    list: [
                        {
                            value: 0.1,
                            time: 0
                        },
                        {
                            value: 0.001,
                            time: 1
                        }
                    ],
                },
                speed: {
                    list: [
                        {
                            value: 8000,
                            time: 0
                        },
                        {
                            value: 10000,
                            time: 1
                        }
                    ],
                },
                acceleration: {
                    x: -2000,
                    y: -4000
                },
                startRotation: {
                    min: -100,
                    max: -80
                },
                lifetime: {
                    min: 0.5,
                    max: 1
                },
                frequency: 0.01,
                spawnChance: 1,
                particlesPerWave: 6,
                emitterLifetime: 0,
                maxParticles: 1000,
                pos: {
                    x: 200,
                    y: 500
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 100
                }
            });

        emitter.emit = true;

        this._emitters.push(emitter);
    }

    protected update(delta?: number): void {

        this._emitters.forEach(e => e.update(delta * 0.001));
    }
}