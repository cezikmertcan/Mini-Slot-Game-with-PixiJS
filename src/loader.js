async function load() {
    let bg = await PIXI.Assets.load("../assets/bg.jpg");
    let slotmachine = await PIXI.Assets.load("../assets/slotmachine.png");
    let f1 = await PIXI.Assets.load("../assets/black_circle.png");
    let f2 = await PIXI.Assets.load("../assets/blue_circle.png");
    let f3 = await PIXI.Assets.load("../assets/green_circle.png");
    let f4 = await PIXI.Assets.load("../assets/red_circle.png");
    let f5 = await PIXI.Assets.load("../assets/white_circle.png");
    let f6 = await PIXI.Assets.load("../assets/yellow_circle.png");
    let arm1 = await PIXI.Assets.load("../assets/arm1.png");
    let arm2 = await PIXI.Assets.load("../assets/arm2.png");
    let arm3 = await PIXI.Assets.load("../assets/arm3.png");
    let arm4 = await PIXI.Assets.load("../assets/arm4.png");
    let bigwin = await PIXI.Assets.load("../assets/bigwin.jpg");
    await loadAudioAsync();
    return {
        bg, slotmachine, fruits: { f1, f2, f3, f4, f5, f6 }, arms: { arm1, arm2, arm3, arm4 }, bigwin
    }
}

const loadAudioAsync = () => new Promise((resolve, reject) => {
    let audioManifest = [
        { id: "lever", src: "../assets/lever.mp3" },
        { id: "ping", src: "../assets/ping.mp3" },
        { id: "bg", src: "../assets/bbc-fruit-machine-atmosphere.mp3" },
    ]
    const audioLoader = new createjs.LoadQueue();
    audioLoader.installPlugin(createjs.Sound);
    audioLoader.on('complete', () => {
        resolve(audioManifest.map(a => a.id));
    }, this);
    audioLoader.loadManifest(audioManifest);
});

export default { load }
