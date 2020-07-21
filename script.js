/* global keyCode, text, random, ellipse, collideRectCircle, fill, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, createCanvas, colorMode, HSB, frameRate, background, width, height, noStroke, stroke, noFill, rect*/

let backgroundColor, playerSnake, currentApple, score;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  fill(0);
  text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
    this.tailSegments = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }

    let previousTailSegmentX = this.x;
    let previousTailSegmentY = this.y;
    for (let i = 0; i < this.tailSegments.length; i++){
      let tempX = this.tailSegments.length[i].x;
      let tempY = this.tailSegments.length[i].y;
      this.tailSegments[i].moveSelf(previousTailSegmentX, previousTailSegmentY);
      previousTailSegmentX = tempX;
      previousTailSegmentY = tempY;
    }
    
  }

  showSelf() {
    for (let i = 0; i < this.tailSegments.length; i++) {
      this.tailSegments[i].showSelf();
    }
  }

  checkApples() {
    let snakeCollidedWithApple = collideRectCircle(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple.x,
      currentApple.y,
      currentApple.diameter
    );

    if (snakeCollidedWithApple) {
      score++;
      currentApple = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {}

  extendTail() {
    let lastTailSegment = this.tailSegments[length - 1];
    let newXPos = lastTailSegment.x;
    let newYPos = lastTailSegment.y;

    if (this.direction === "N") {
      newYPos += this.size;
    } else if (this.direction === "S") {
      newYPos -= this.size;
    } else if (this.direction === "E") {
      newXPos -= this.size;
    } else if (this.direction === "W") {
      newXPos += this.size;
    } else {
      console.log("Error: invalid direction");
    }
    
  

    this.tailSegments.push(new TailSegment(this.x, this.y));
  }
}

class TailSegment {
  constructor(x, y) {
    this.size = 10;
    this.x;
    this.y;
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }

  moveSelf(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Apple {
  constructor() {
    this.diameter = 10;
    this.x = random(this.diameter, width - this.diameter);
    this.y = random(this.diameter, height - this.diameter);
  }

  showSelf() {
    fill(0, 80, 80);
    ellipse(this.x, this.y, this.diameter);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {}

function gameOver() {}
