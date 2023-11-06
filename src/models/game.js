import Loader from "../loader.js"
import UIManager from "./UIManager.js";
import SlotMachine from "./slotMachine.js";
class Game {
    constructor() {
        this.slotMachine;
        this.UIManager;
        this.bg;
        this.app;
        this.assets
        this.time = 0.0;
        this.currentMoney = 1000;
        this.costToSpin = 10;
        this.winMoneyRatio = 35;
    }

    initalize = async () => {

        this.assets = await Loader.load();
        this.app = new PIXI.Application({ width: 800, height: 800 });
        document.body.appendChild(this.app.view);
        this.slotMachine = new SlotMachine(this);
        this.UIManager = new UIManager(this);
        this.slotMachine.sprite.position.set(77, 108);

        this.bg = PIXI.Sprite.from(this.assets.bg);


        this.app.stage.addChild(this.bg)
        this.app.stage.addChild(this.slotMachine.container);
        this.app.stage.addChild(this.UIManager.container);


        this.app.ticker.add((delta) => {
            this.time += delta;
            this.slotMachine.update(delta, this.time)
        });
        let bgAudio = createjs.Sound.createInstance('bg');
        bgAudio.loop = -1;
        bgAudio.volume = 0.1;
        bgAudio.play();
    }
}

export default Game;