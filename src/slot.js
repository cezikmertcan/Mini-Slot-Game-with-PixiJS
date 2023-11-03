class Slot {
    constructor(assets) {
        this.state = "WAITING";
        this.maxBlur = 30;
        this.maxSpeed = 40;
        this.minSlowingSpeed = 10;

        let frame = new PIXI.Graphics();
        frame.drawRect(0, 0, 90, 120);

        let mask = new PIXI.Graphics();
        mask.beginFill(0xff0000);
        mask.drawRect(0, 0, 90, 120);
        mask.endFill();

        let maskContainer = new PIXI.Container();
        maskContainer.position.set(0, -2)
        //////////////////////////////////////////////////////////////////
        maskContainer.mask = mask;
        //////////////////////////////////////////////////////////////////
        maskContainer.addChild(mask)

        frame.addChild(maskContainer);

        let fruitsContainer = new PIXI.Container();
        let blurFilter = new PIXI.BlurFilter();
        blurFilter.blur = 0
        fruitsContainer.filters = [blurFilter]

        let fake6 = PIXI.Sprite.from(assets.f6)
        fake6.scale.set(0.65)
        fake6.position.set(3, -100)
        let f1 = PIXI.Sprite.from(assets.f1);
        f1.scale.set(0.65)
        f1.position.set(3, 20)

        let f2 = PIXI.Sprite.from(assets.f2);
        f2.scale.set(0.65)
        f2.position.set(3, 140)

        let f3 = PIXI.Sprite.from(assets.f3);
        f3.scale.set(0.65)
        f3.position.set(3, 260)

        let f4 = PIXI.Sprite.from(assets.f4);
        f4.scale.set(0.65)
        f4.position.set(3, 380)

        let f5 = PIXI.Sprite.from(assets.f5);
        f5.scale.set(0.65)
        f5.position.set(3, 500)

        let f6 = PIXI.Sprite.from(assets.f6);
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
    }

    update = (delta, time) => {
        if (this.state == "SPINNING") {
            // console.log("SPINNING")
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
            // console.log("SLOWING")
            if (this.speed <= this.minSlowingSpeed)
                this.speed = this.minSlowingSpeed
            else {
                this.speed -= delta / 2;
            }
            this.fruitsContainer.y += delta * this.speed;

            if (time / 60 > this.startTime / 60 + this.totalSpinTime + 3) {
                this.state = "STOPPING";
                this.random = Math.floor(Math.random() * 5.99) - 1;
                console.log(this.state, this.random)
            }
        }

        if (this.state == "STOPPING") {
            this.fruitsContainer.y += delta * this.speed;
            if (Math.abs(this.fruitsContainer.y - this.random * -120) < 2) {
                this.fruitsContainer.y = this.random * -120
                this.state = "WAITING"
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
    }

    startSpin = (time, totalSpinTime) => {
        this.state = "SPINNING";
        this.startTime = time;
        this.totalSpinTime = totalSpinTime;
        this.speed = 10;
    }

    setPosition = (x, y) => {
        this.frame.position.set(x, y)
    }
}
export default Slot;