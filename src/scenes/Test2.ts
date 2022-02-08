import { Container } from "pixi.js";
import { RichStringBuilder } from "../gameobjects/RichStringBuilder";
import Scene from "./Scene";

const COLOR = ["red", "white", "lime", "violet", "pink", "orange"];
const SIZE = [18, 20, 24, 32, 48];
const SHEETS = ["emojis"];

export class Test2 extends Scene {

    create(): void {

        // const text = this.generateText();

        // this.addChild(text);

        const b = new RichStringBuilder();

        b
            .fontSize(40)
            .lineSpacing(30)
            .width(400)
            
            .string("hello")
            .image("emojis", "emoji-01.png")
            .string("HERE")
            .image("emojis", "emoji-02.png")
            
            .fontSize(60)
            .string("one two tree")
            .image("emojis", "emoji-03.png")

            // .string("HERE")
            // .image("emojis", "emoji-04.png")
            // .string("Λούσι")
            // .image("emojis", "emoji-05.png")
            // .string("HERE")
            // .image("emojis", "emoji-01.png")

            // .fontSize(64)
            // .string("hello")
            // .image("emojis", "emoji-07.png")
            // .string("HERE")
            // .image("emojis", "emoji-08.png")
            // .string("Λούσι")
            // .image("emojis", "emoji-09.png")
            // .string("HERE")
            // .image("emojis", "emoji-01.png")

            .build(this.app);
    }

    private generateText() {

        const parent = new Container();

        const builder = new RichStringBuilder();

        builder
            .position(10, 10)
            .letterSpacing(5)
            .lineSpacing(20)
            .fontSize(32)
            .width(380);

        for (let i = 0; i < 25; i++) {

            //builder.fontSize(this.random(SIZE));

            this.generateRandomWord(builder);

            if (Math.random() < 0.5) {

                builder.string(" ");

            } else {

                this.generateRandomImage(builder);
            }
        }

        builder.build(this.app, parent);

        return parent;
    }

    private generateRandomImage(builder: RichStringBuilder) {

        const key = this.random(SHEETS);
        const textures = this.app.loader.resources[key].textures;
        const frame = this.random(Object.keys(textures));

        builder.image(key, frame);
    }

    private generateRandomWord(builder: RichStringBuilder) {

        builder.string(this.random(POEM), {
            fill: this.random(COLOR),
        });
    }

    private random(array: any[]) {

        return array[Math.round(Math.random() * (array.length - 1))];
    }
}

const POEM = `
Stare hard enough at the fabric of night
and if you're predisposed to dark let’s say   
the window you’ve picked is a black
postage stamp you spend hours at,
sleepless, drinking gin after the I Love   
Lucy reruns have gone off stare

Κοίταξε αρκετά δυνατά το ύφασμα της νύχτας,
και αν έχετε προδιάθεση για σκοτάδι ας πούμε
το παράθυρο που επιλέξατε είναι μαύρο
γραμματόσημο στο οποίο περνάτε ώρες,
άυπνος, πίνοντας τζιν μετά το I Love
Οι επαναλήψεις της Λούσι έχουν φύγει κοίτα

凝視著夜晚的織物，
如果你傾向於黑暗 - 讓我們說
你選擇的窗戶是黑色的
您花費數小時的郵票，
不眠不休，在我愛之後喝杜松子酒
露西重播已經結束 凝視

Достаточно пристально вглядеться в ткань ночи,
а если вы предрасположены к темноте скажем
окно, которое вы выбрали, черное
почтовая марка, на которой вы проводите часы,
бессонница, пьющая джин после Прошли повторы Люси смотри

`.replaceAll("\n", " ")
    .split(" ")
    .map(w => w.trim())
    .filter(w => w.length > 0);