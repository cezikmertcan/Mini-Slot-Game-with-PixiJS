class UIManager {
    constructor(game) {
        this.game = game;
        this.moneySuffix = "₺";
        this.container = new PIXI.Container();
        this.lever = new PIXI.Graphics();
        this.lever.beginFill(0x00ffaa);
        this.lever.drawRect(0, 0, 90, 220);
        this.lever.endFill();
        this.lever.alpha = 0.0;
        this.lever.position.set(650, 200);
        this.lever.eventMode = 'static';
        this.lever.cursor = 'pointer';
        this.lever.on('pointerdown', () => {
            game.slotMachine.startSpin(game.time);
        })

        this.moneyText = new PIXI.Text(this.game.currentMoney + this.moneySuffix, {
            fill: 0xffffff,
            fontSize: 36,
            fontFamily: "Arial",
            fontWeight: "bold",
        })
        this.extraMoneyText = new PIXI.Text("X", {
            fill: "red",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
        })
        this.moneyText.position.set(10, 10)
        this.extraMoneyText.position.set(20, 50)
        this.extraMoneyText.alpha = 0


        this.container.addChild(this.lever);
        this.container.addChild(this.moneyText);
        this.container.addChild(this.extraMoneyText);
    }

    showExtraMoneyAnimation(amount) {
        this.extraMoneyText.alpha = 1;
        this.extraMoneyText.text = amount + this.moneySuffix;
        this.extraMoneyText.position.set(20, 50)
        if (amount > 0) {
            this.extraMoneyText.style.fill = "green"
            this.extraMoneyText.style.fontSize = 36

        }
        else {
            this.extraMoneyText.style.fill = "red"
            this.extraMoneyText.style.fontSize = 24
        }

        TweenMax
            .to(this.extraMoneyText.position, 0.55, {
                y: 15,
                onComplete: () => {
                    this.moneyText.text = this.game.currentMoney + this.moneySuffix;
                }
            });
        TweenMax
            .to(this.extraMoneyText, 1, {
                alpha: 0,
            })
    }
    onExtraMoneyAnimationComplete = (amount) => {

    }
}

export default UIManager;