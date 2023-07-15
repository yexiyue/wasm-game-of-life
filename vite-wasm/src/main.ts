/* import init, { Universe } from "wasm-game-of-life";

await init();

const universe = Universe.new(64,48);
const pre = document.getElementById("game-of-life-canvas");

function renderLoop() {
    pre!.innerHTML = universe.render();
    universe.tick()
    requestAnimationFrame(renderLoop);
}

renderLoop() */

import init, { Universe, Cell } from "wasm-game-of-life";

const { memory } = await init();
const CELL_SIZE = 5; //px
const GRID_COLOR = "#cccccc";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#54e674";

const universe = Universe.new(128, 64);
const canvas = document.getElementById(
  "game-of-life-canvas"
) as HTMLCanvasElement;
const width = universe.width();
const height = universe.height();

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  //垂直线
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  //水平线
  for (let i = 0; i <= height; i++) {
    ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);
  }
  ctx.stroke();
}

function getIndex(row: number, col: number) {
  return row * width + col;
}

function drawCells() {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      ctx.fillStyle = cells[idx] === Cell.Alive ? ALIVE_COLOR : DEAD_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
}
//添加fps真率显示
const fps = new (class {
  public fps = document.getElementById("fps")!;
  public frames: number[] = [];
  public lastFrameTimeStamp = performance.now();

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
Frames per Second:
         latest = ${Math.round(fps)}
avg of last 100 = ${Math.round(mean)}
min of last 100 = ${Math.round(min)}
max of last 100 = ${Math.round(max)}
`.trim();
  }
})();

let animatedId: number | null = null;
const btn = document.getElementById("play-pause") as HTMLButtonElement;

function renderLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fps.render();
  universe.tick();
  drawGrid();
  drawCells();
  animatedId = requestAnimationFrame(renderLoop);
}

const isPaused = () => {
  return animatedId === null;
};

const play = () => {
  btn.textContent = "pause";
  renderLoop();
};

const pause = () => {
  btn.textContent = "play";
  cancelAnimationFrame(animatedId!);
  animatedId = null;
};

btn.addEventListener("click", () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

pause()

// 为canvas添加点击事件切换细胞状态

canvas.addEventListener("click", (event) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);
  console.log(row, col);
  universe.toggle_cell(row, col);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawCells();
});


