class Slot {
    constructor(slotMachine) {
        this.random = -1;
        this.slotMachine = slotMachine;
        this.state = "WAITING";
        this.maxBlur = 30;
        this.maxSpeed = 40;
        this.minSlowingSpeed = 10;
        this.pingSoundPool = { at: 0, ob: [] }

        let frame = new PIXI.Graphics();
        frame.drawRect(0, 0, 90, 120);

        let mask = new PIXI.Graphics();
        mask.beginFill(0xff0000);
        mask.drawRect(0, 0, 90, 120);
        mask.endFill();

        let maskContainer = new PIXI.Container();
        maskContainer.position.set(0, -2)
        maskContainer.mask = mask;
        maskContainer.addChild(mask)

        frame.addChild(maskContainer);

        let fruitsContainer = new PIXI.Container();
        let blurFilter = new PIXI.BlurFilter();
        blurFilter.blur = 0
        fruitsContainer.filters = [blurFilter]
        let fake6 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f6)
        fake6.scale.set(0.65)
        fake6.position.set(3, -100)
        let f1 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f1);
        f1.scale.set(0.65)
        f1.position.set(3, 20)

        let f2 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f2);
        f2.scale.set(0.65)
        f2.position.set(3, 140)

        let f3 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f3);
        f3.scale.set(0.65)
        f3.position.set(3, 260)

        let f4 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f4);
        f4.scale.set(0.65)
        f4.position.set(3, 380)

        let f5 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f5);
        f5.scale.set(0.65)
        f5.position.set(3, 500)

        let f6 = PIXI.Sprite.from(this.slotMachine.assets.fruits.f6);
        f6.scale.set(0.65)
        f6.position.set(3, 620)

        maskContainer.addChild(fruitsContainer);
        fruitsContainer.addChild(fake6);
        fruitsContainer.addChild(f1);
        fruitsContainer.addChild(f2);
        fruitsContainer.addChild(f3);
        fruitsContainer.addChild(f4);
        fruitsContainer.addChild(f5);
        fruitsContainer.addChild(f6);
        fruitsContainer.position.y = -240

        this.frame = frame;

        this.mask = mask;
        this.maskContainer = maskContainer;
        this.fruitsContainer = fruitsContainer;
        this.blurFilter = blurFilter;
        this.createPingSoundPool(5);
    }

    createPingSoundPool = (l) => {

        for (let index = 0; index < l; index++) {
            let s = createjs.Sound.createInstance('ping');
            s.volume = 0.1;
            this.pingSoundPool.ob.push(s);
        }


    }
    update = (delta, time) => {
        if (this.state == "SPINNING") {
            if (this.speed >= this.maxSpeed)
                this.speed = this.maxSpeed
            else {
                this.speed += delta;
            }
            this.fruitsContainer.y += delta * this.speed;

            if (time / 60 > this.startTime / 60 + this.totalSpinTime) {
                this.state = "SLOWING";
            }
        }

        if (this.state == "SLOWING") {
            if (this.speed <= this.minSlowingSpeed)
                this.speed = this.minSlowingSpeed
            else {
                this.speed -= delta / 2;
            }
            this.fruitsContainer.y += delta * this.speed;

            if (time / 60 > this.startTime / 60 + this.totalSpinTime + 3) {
                this.state = "STOPPING";
                this.random = Math.floor(Math.random() * 5.9999) - 1;
                // this.random = 4; // CHEAT TO WIN
            }
        }

        if (this.state == "STOPPING") {
            this.fruitsContainer.y += delta * this.speed;
            if (Math.abs(this.fruitsContainer.y - this.random * -120) < 2) {
                this.fruitsContainer.y = this.random * -120
                this.state = "WAITING"
                this.speed = 0;
                this.slotMachine.onSlotStop();
            }
        }

        if (this.state == "SPINNING" || this.state == "SLOWING") {
            let blur = (this.speed - this.minSlowingSpeed < 0 ? 0 : this.speed - this.minSlowingSpeed) / (this.maxSpeed - this.minSlowingSpeed) * this.maxBlur;
            this.blurFilter.blur = blur;
        }
        else {
            this.blurFilter.blur = 0;
        }

        if (this.fruitsContainer.y >= 120)
            this.fruitsContainer.position.y = -600
        this.step += this.speed;
        if (this.step >= 200) {
            this.step = 0;
            this.pingSoundPool.ob[this.pingSoundPool.at].play();
            this.pingSoundPool.at += 1;
            if (this.pingSoundPool.at >= this.pingSoundPool.ob.length) this.pingSoundPool.at = 0;
        }
    }

    startSpin = (startTime, totalSpinTime) => {
        this.step = 0;
        this.random = -1;
        this.state = "SPINNING";
        this.startTime = startTime;
        this.totalSpinTime = totalSpinTime;
        this.speed = 10;
    }

    setPosition = (x, y) => {
        this.frame.position.set(x, y)
    }
}
export default Slot;