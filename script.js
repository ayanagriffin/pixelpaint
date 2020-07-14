/* global createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drop1x, drop1y, drop1d, drop1FallSpeed;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  drop1x = 200; // or random(width)
  drop1y = 0; // or random(height)
  drop1d = 10; // or random(5,15)
  drop1FallSpeed = 8; // or random(8, 20)

  // Variables for droplet 2
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
}