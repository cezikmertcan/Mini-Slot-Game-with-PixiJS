import Loader from "./loader.js"
import Slot from "./models/slot.js"
import SlotMachine from "./models/slotMachine.js";

let assets = await Loader.load();
let app = new PIXI.Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

let slotMachine = new SlotMachine(assets);
slotMachine.sprite.position.set(77, 108);
let bg = PIXI.Sprite.from(assets.bg);
let button = new PIXI.Graphics();
button.beginFill(0x00ffaa);
button.drawRect(0, 0, 90, 220);
button.endFill();
button.alpha = 0.0;
button.position.set(650, 200);
button.eventMode = 'static';
button.cursor = 'pointer';
button
  .on('pointerdown', () => {
    slotMachine.startSpin(time);
  })

app.stage.addChild(bg)
app.stage.addChild(slotMachine.container);
app.stage.addChild(button)

let time = 0.0;
app.ticker.add((delta) => {
  time += delta;
  slotMachine.update(delta, time)
});