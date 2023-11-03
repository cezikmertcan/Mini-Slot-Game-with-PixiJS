async function load() {
    let bg = await PIXI.Assets.load("../assets/bg.jpg");
    let f1 = await PIXI.Assets.load("../assets/black_circle.png");
    let f2 = await PIXI.Assets.load("../assets/blue_circle.png");
    let f3 = await PIXI.Assets.load("../assets/green_circle.png");
    let f4 = await PIXI.Assets.load("../assets/red_circle.png");
    let f5 = await PIXI.Assets.load("../assets/white_circle.png");
    let f6 = await PIXI.Assets.load("../assets/yellow_circle.png");
    return {
        bg, f1, f2, f3, f4, f5, f6
    }
}

export default { load }
