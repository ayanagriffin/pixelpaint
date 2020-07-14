/* global createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drop1, drop2

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Remember, the argument/parameter order is: x, y, d, fallSpeed
  drop1 = new RainDrop(200, 0, 14, 8);
  // If we don't want to specify x and y, we could make those random.
  drop2 = new RainDrop(random(width), random(height), 8, 7);
}

function draw() {
  background(0, 0, 95);
  // Make each droplet of rain fall, reset if necessary, and then show each droplet.
  drop1.y += drop1.fallSpeed;
  if (drop1.y > height) {
    drop1.y = 0;
    drop1.x = random(width);
  }
  drop1.show();
  // Droplet 2
  drop2.y += drop2.fallSpeed;
  if (drop2.y > height) {
    drop2.y = 0;
    drop2.x = random(width);
  }
  drop2.show();
}

class RainDrop {
  // The constructor will be called whenever you run `new RainDrop()`
  constructor(x, y, d, fallSpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fallSpeed = fallSpeed;
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.d);
  }
}