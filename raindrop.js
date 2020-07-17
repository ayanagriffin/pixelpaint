/* global random, width, height, noStroke, fill, ellipse */

class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.d = random(5, 15);
    this.fallSpeed = random(5, 15);
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
    fill(215, 80, 80);
    ellipse(this.x, this.y, this.d);
  }
}