/* global createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drop1, drop2;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  drop1 = new RainDrop(200, 0, 10, 8);

  // Variables for droplet 2
  drop2x = random(width);
  drop2y = 0; // or random(height)
  drop2d = 10; // or random(5,15)
  drop2FallSpeed = 8; // or random(8, 20)
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  drop1y += drop1FallSpeed;
  // If it goes off the screen...
  if (drop1y > height) {
    // ...reset it...
    drop1y = 0;
    // ...and move it somewhere random.
    drop1x = random(width);
  }
  // Display droplet 1
  noStroke();
  fill(60, 80, 80);
  ellipse(drop1x, drop1y, drop1d);

  //// Code for droplet 2
  // Code your next droplet here
  drop2y += drop2FallSpeed;
  // If it goes off the screen...
  if (drop2y > height) {
    // ...reset it...
    drop2y = 0;
    // ...and move it somewhere random.
    drop2x = random(width);
  }
  
  noStroke();
  fill(60, 80, 80);
  ellipse(drop2x, drop2y, drop2d);
}

class RainDrop {
  constructor(x, y, d, fallSpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fallSpeed = fallSpeed;
  }
}