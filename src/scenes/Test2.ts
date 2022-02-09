import { Container } from "pixi.js";
import { RichStringBuilder } from "../gameobjects/RichStringBuilder";
import { timer, timerPromise } from "../utils/Timer";
import Scene from "./Scene";

const SIZE = [18, 20, 20, 20, 20, 24, 32, 48, 48, 48, 48];
const FONT_FAMILY = ["serif", "sans serif"];
const COLOR = ["whitesmoke", "#0009"];
const SHEET = ["emojis"];

export class Test2 extends Scene {

    async create() {

        while (true) {

            const richText = this.generateText();

            this.centerText(richText);

            this.addChild(richText);

            await timerPromise(this.app, 500, p => richText.alpha = p);

            await timerPromise(this.app, 2000);

            this.stage.removeChildren();
        }
    }

    private generateText() {

        const parent = new Container();

        const builder = new RichStringBuilder();

        builder
            .position(10, 0)
            .letterSpacing(5)
            .lineSpacing(10)
            .fontSize(30)
            .width(this.app.view.width - 10);

        for (let i = 0; i < 25; i++) {

            if (Math.random() < 0.5) {

                for (let j = 0; j < this.random([1, 2, 3]); j++) {

                    this.generateRandomImage(builder);
                }

            } else {

                builder.fontSize(this.random(SIZE));

                for (let j = 0; j < this.random([1, 2]); j++) {

                    this.generateRandomWord(builder);

                    builder.string(" ");
                }
            }
        }

        builder.build(this.app, parent);

        return parent;
    }

    private centerText(richText: Container) {

        let b = richText.getBounds();

        if (b.height > this.app.view.height) {

            richText.height = this.app.view.height - 5;
            richText.scale.x = richText.scale.y;
        }

        b = richText.getBounds();

        richText.position.y = this.app.view.height / 2 - b.height / 2;
    }

    private generateRandomImage(builder: RichStringBuilder) {

        const key = this.random(SHEET);
        const textures = this.app.loader.resources[key].textures;
        const frame = this.random(Object.keys(textures));

        builder.image(key, frame);
    }

    private generateRandomWord(builder: RichStringBuilder) {

        builder.string(this.random(POEM), {
            fontFamily: this.random(FONT_FAMILY),
            fill: this.random(COLOR)
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
如果你傾向於黑暗 讓我們說
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


/*


*/