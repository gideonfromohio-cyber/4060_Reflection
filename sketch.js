let imgs = [];
let currentBlock;
let placed = [];

let x, y;
let xspeed = 10;
let yspeed = 0;
let gravity = 0.7;
let falling = false;

let scaleFactor = 0.05;
let bw, bh;

function preload() {
  imgs[0] = loadImage("block1.png");
  imgs[1] = loadImage("block.2.png");
  imgs[2] = loadImage("block3.png");
}

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent("game");
  newBlock();
}

function newBlock() {
  currentBlock = random(imgs);
  bw = currentBlock.width * scaleFactor;
  bh = currentBlock.height * scaleFactor;

  x = random(50, width - 50);
  y = 50;
  xspeed = 10;
  yspeed = 0;
  falling = false;
}

function draw() {
  background(230);

  // draw placed blocks
  for (let b of placed) {
    image(b.img, b.x, b.y, b.bw, b.bh);
  }

  // update current block
  if (!falling) {
    x += xspeed;
    if (x < 0 || x > width - bw) {
      xspeed *= -1;
    }
  } else {
    yspeed += gravity;
    y += yspeed;

    let landed = false;

    // ground collision
    if (y + bh >= height) {
      y = height - bh;
      landed = true;
    }

    // collision with placed blocks
    if (!landed) {
      const bottom = y + bh;
      for (let pb of placed) {
        const pbTop = pb.y;
        const pbBottom = pb.y + pb.bh;

        const horizontallyOverlaps = x + bw > pb.x && x < pb.x + pb.bw;
        const verticallyTouching = bottom >= pbTop && bottom <= pbBottom;

        if (horizontallyOverlaps && verticallyTouching) {
          y = pb.y - bh;
          landed = true;
          break;
        }
      }
    }

    if (landed) {
      yspeed = 0;
      falling = false;
      placed.push({ img: currentBlock, x: x, y: y, bw: bw, bh: bh });
      newBlock();
    }
  }

  // draw current block
  image(currentBlock, x, y, bw, bh);
}

function keyPressed() {
  if (key === " ") {
    falling = true;
  }
  if (key === "r" || key === "R") {
    placed = [];
    newBlock();
  }
}
