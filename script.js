/* global createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drop1, drop2;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);

  drop1 = new RainDrop(10, 8);
  drop2 = new RainDrop(10, 8);
}

function draw() {
  background(0, 0, 95);
  
  drop1.drip();
  drop1.show();

  drop2.drip();
  drop2.show();
}

class RainDrop {
  constructor(d, fallSpeed) {
    this.x = random(width);
    this.y = random(height);
    this.d = d;
    this.fallSpeed = fallSpeed;
  }

  drip() {
    this.y += this.fallSpeed;
    // If it goes off the screen...
    if (this.y > height) {
      // ...reset it...
      this.y = 0;
      // ...and move it somewhere random.
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.d);
  }
}
