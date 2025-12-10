let imgs = [];
let block;
let x, y;
let xspeed = 8;
let yspeed = 0;
let gravity = 0.7;
let falling = false;

let scaleFactor = 0.15;
let bw, bh;

function preload() {
  imgs[0] = loadImage("block1.png");
  imgs[1] = loadImage("block.2.png");
  imgs[2] = loadImage("block3.png");
}

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent("game");
  resetBlock();
}

function resetBlock() {
  block = random(imgs);
  scaleFactor = 0.15;

  bw = block.width * scaleFactor;
  bh = block.height * scaleFactor;

  x = width / 2;
  y = 80;
  xspeed = 8;
  yspeed = 0;
  falling = false;
}

function draw() {
  background(230);

  if (!falling) {
    x += xspeed;
    if (x < 0 || x > width - bw) {
      xspeed *= -1;
    }
  } else {
    yspeed += gravity;
    y += yspeed;

    if (y + bh >= height) {
      y = height - bh;
      yspeed = 0;
      falling = false; // IMPORTANT FIX
      resetBlock();    // Spawn new block automatically
    }
  }

  image(block, x, y, bw, bh);
}

function keyPressed() {
  if (key === " ") {
    falling = true;
  }
  if (key === "r" || key === "R") {
    resetBlock();
  }
}
