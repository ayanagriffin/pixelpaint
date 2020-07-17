/* global rect, createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drops, bladesOfGrass;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB);

  drops = [];
  for (let i = 0; i < 10; i++) {
    drops.push(new RainDrop());
  }
  
  bladesOfGrass = [];
  bladesOfGrass.push(new Grass(10));
}

function draw() {
  background(0, 0, 95);
  
  for (let i = 0; i < drops.length; i++) {
    drops[i].drip();
    drops[i].show();
  }
  
  for (let j = 0; j < bladesOfGrass.length; j++) {
    
    bladesOfGrass[j].show();
  }
}

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

class Grass {
  constructor(x) {
    this.x = x;
    this.bladeHeight = 5;
  }
  
  show() {
    noStroke();
    fill(130, 100, 75);
    rect(this.x, height - this.bladeHeight, 5, this.bladeHeight);
  }
}
