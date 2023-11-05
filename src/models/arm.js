class Arm {
    constructor(slotMachine) {
        this.slotMachine = slotMachine;
        this.textures = [PIXI.Sprite.from(this.slotMachine.assets.arms.arm1), PIXI.Sprite.from(this.slotMachine.assets.arms.arm2), PIXI.Sprite.from(this.slotMachine.assets.arms.arm3), PIXI.Sprite.from(this.slotMachine.assets.arms.arm4)].map(s => s.texture);
        this.forwardAnimationTextures = [this.textures[0], this.textures[1], this.textures[2], this.textures[3]]
        this.backwardAnimationTextures = [this.textures[3], this.textures[2], this.textures[1], this.textures[0]]
        this.sprite = new PIXI.AnimatedSprite(this.forwardAnimationTextures);
        this.sprite.animationSpeed = 0.3;
        this.sprite.loop = false;
    }

    playForwardAnimation = () => {
        this.sprite.textures = this.forwardAnimationTextures;
        this.sprite.gotoAndPlay(0);
    }

    playBackwardAnimation = () => {
        this.sprite.textures = this.backwardAnimationTextures;
        this.sprite.gotoAndPlay(0);
    }
}

export default Arm;