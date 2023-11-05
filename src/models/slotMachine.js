import Arm from "./arm.js";
import Slot from "./slot.js";

class SlotMachine {
    constructor(game) {
        this.game = game;
        this.assets = game.assets;
        this.state = "WAITING";
        this.container = new PIXI.Container();

        this.arm = new Arm(this);
        this.arm.sprite.position.set(660, 200)
        this.container.addChild(this.arm.sprite);

        this.sprite = PIXI.Sprite.from(this.assets.slotmachine);
        this.container.addChild(this.sprite);

        this.slots = [new Slot(this), new Slot(this), new Slot(this)]
        this.slots[0].setPosition(230, 340);
        this.slots[1].setPosition(357, 340);
        this.slots[2].setPosition(484, 340);
        this.container.addChild(this.slots[0].frame, this.slots[1].frame, this.slots[2].frame);

        this.winningLable = PIXI.Sprite.from(this.assets.bigwin)
        this.winningLable.alpha = 0;
        this.winningLable.position.set(245, 140);
        this.setWinningLableAnimation();
        this.container.addChild(this.winningLable);
    }

    update = (delta, time) => {
        this.slots.forEach(slot => {
            slot.update(delta, time)
        });
    }

    startSpin = (startTime) => {
        if (this.state !== "WAITING") return;
        if (this.game.currentMoney < this.game.costToSpin) return;
        this.game.currentMoney -= this.game.costToSpin;
        this.game.UIManager.showExtraMoneyAnimation(-1 * this.game.costToSpin);
        this.state = "SPINNING"
        this.arm.playForwardAnimation();
        this.slots[0].startSpin(startTime, 3);
        this.slots[1].startSpin(startTime, 5);
        this.slots[2].startSpin(startTime, 7);
    }

    onSlotStop = () => {
        if (this.isAllWaiting()) {
            if (this.isWinningHand()) {
                this.state = "WINANIMATON"
                this.game.currentMoney += this.game.costToSpin * this.game.winMoneyRatio;
                this.game.UIManager.showExtraMoneyAnimation(this.game.costToSpin * this.game.winMoneyRatio)
                this.winningLable.timeline.play(0);
            }
            else {
                this.arm.playBackwardAnimation();
                this.state = "WAITING"
            }
        }
    }

    isAllWaiting = () => {
        for (let i = 1; i < this.slots.length; i++) {
            if (this.slots[i].state !== "WAITING") {
                return false;
            }
        }
        return true;
    }

    isWinningHand = () => {
        const firstSlot = this.slots[0].random;
        for (let i = 1; i < this.slots.length; i++) {
            if (this.slots[i].random !== firstSlot) {
                return false;
            }
        }
        return true;
    }

    setWinningLableAnimation = () => {
        this.winningLable.timeline = new TimelineMax({ paused: true });
        this.winningLable.timeline
            .to(this.winningLable, 0.5, {
                alpha: 0
            })
            .to(this.winningLable, 0.5, {
                alpha: 1,
            })
            .to(this.winningLable, 0.5, {
                alpha: 0,
            })
            .to(this.winningLable, 0.5, {
                alpha: 1,
            })
            .to(this.winningLable, 0.5, {
                alpha: 0,
            })
            .to(this.winningLable, 0.5, {
                alpha: 1,
            })
            .to(this.winningLable, 0.5, {
                alpha: 0,
                onComplete: () => {
                    this.arm.playBackwardAnimation();
                    this.state = "WAITING"
                },
            })
    }
}

export default SlotMachine;