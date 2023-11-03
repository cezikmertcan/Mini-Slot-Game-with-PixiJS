import Loader from "./loader.js"
import Slot from "./slot.js"

let assets = await Loader.load();
let app = new PIXI.Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

let slot1 = new Slot(assets);
slot1.setPosition(230, 340);
let slot2 = new Slot(assets);
slot2.setPosition(357, 340);
let slot3 = new Slot(assets);
slot3.setPosition(484, 340);


let bg = PIXI.Sprite.from(assets.bg);
let button = PIXI.Sprite.from(assets.f1);
button.position.set(550, 500);
button.eventMode = 'static';
button.cursor = 'pointer';
button
  .on('pointerdown', () => {
    slot1.startSpin(time, 1);
    slot2.startSpin(time, 2);
    slot3.startSpin(time, 3);
  })
  .on('pointerup', () => {
    // console.log("pointerup")
  })
// .on('pointerupoutside', () => {
//   console.log("pointerdown", this)
// })
// .on('pointerover', () => {
//   console.log("pointerdown", this)
// })
// .on('pointerout', () => {
//   console.log("pointerdown", this)
// });

app.stage.addChild(bg)
app.stage.addChild(button)
app.stage.addChild(slot1.frame);
app.stage.addChild(slot2.frame);
app.stage.addChild(slot3.frame);

let time = 0.0;
app.ticker.add((delta) => {
  time += delta;
  slot1.update(delta, time);
  slot2.update(delta, time);
  slot3.update(delta, time);
});