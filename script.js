/* global createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drop1, drop2;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  
  drop1 = new RainDrop(200, 0, 10, 8);
  drop2 = new RainDrop(random(width), 0, 10, 8);
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  drop1.y += drop1.fallSpeed;
  // If it goes off the screen...
  if (drop1.y > height) {
    // ...reset it...
    drop1.y = 0;
    // ...and move it somewhere random.
    drop1.x = random(width);
  }
  drop1.show();

  //// Code for droplet 2
  // Code your next droplet here
  drop2.y += drop2.fallSpeed;
  // If it goes off the screen...
  if (drop2.y > height) {
    // ...reset it...
    drop2.y = 0;
    // ...and move it somewhere random.
    drop2.x = random(width);
  }
  drop2.show();
}

class RainDrop {
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