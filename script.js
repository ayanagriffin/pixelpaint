/* global RainDrop, collideLineCircle, rect, createCanvas, colorMode, HSB, background, height, width, noStroke, fill, random, ellipse */

let drops, bladesOfGrass, spaceBetweenGrass;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB);

  drops = [];
  for (let i = 0; i < 10; i++) {
    drops.push(new RainDrop());
  }

  spaceBetweenGrass = 10;
  bladesOfGrass = [];
  for (let i = 1; i < width / spaceBetweenGrass; i++)
    bladesOfGrass.push(new Grass(i * spaceBetweenGrass));
}

function draw() {
  background(0, 0, 95);

  for (let i = 0; i < drops.length; i++) {
    drops[i].drip();
    drops[i].show();
  }

  for (let j = 0; j < bladesOfGrass.length; j++) {
    if (bladesOfGrass[j].isHitByWater(drops)) {
      bladesOfGrass[j].grow();
    }
    bladesOfGrass[j].show();
  }
}

class Grass {
  constructor(x) {
    this.x = x;
    this.bladeHeight = 5;
    this.bladeWidth = 5;
  }

  isHitByWater(drops) {
    for (let i = 0; i < drops.length; i++) {
      if (
        // Only count as hit if the water hits the ground
        collideLineCircle(
          this.x,
          height,
          this.x + this.bladeWidth,
          height,
          drops[i].x,
          drops[i].y,
          drops[i].d
        )
      ) {
        return true;
      }
    }
    return false;
  }

  grow() {
    this.bladeHeight += 5;
  }

  show() {
    noStroke();
    fill(130, 100, 75);
    rect(this.x, height - this.bladeHeight, this.bladeWidth, this.bladeHeight);
  }
}
