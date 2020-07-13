/* global collideRectCircle, fill, rect, ellipse, keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, text, createCanvas, colorMode, HSB, random, width, height, background */

let backgroundColor,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = 250;
  frogY = 450;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
}

function draw() {
  background(backgroundColor);
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (gameIsOver) {
    console.log("Game over - user input ignored.");
  } else if (keyCode === UP_ARROW) {
    frogY -= 10;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 10;
  } else if (keyCode === DOWN_ARROW) {
    frogY += 10;
  }
}

function moveCars() {
  car1X += car1V;
  if (car1X >= width) {
    car1X = -30;
    // Move the car to a random vertical location
    car1Y = random(100, 400);
  }
}

function drawCars() {
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
}

function checkCollisions() {
  // Check for Car 1
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    console.log("collided with Car 1");
    frogY = 450;
    lives -= 1;
  }
  if (lives <= 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  if (frogY <= 50) {
    score += 1;
    frogY = 450;
    // Make the car faster each time you score (increasing difficulty per level)
    car1V += 2;
  }
  if (score === 5) {
    gameIsOver = true;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: `, 10, 20);
  fill(120, 80, 80);
  if (lives >= 1) {
    ellipse(50, 16, 10, 10);
  }
  if (lives >= 2) {
    ellipse(65, 16, 10, 10);
  }
  if (lives >= 3) {
    ellipse(80, 16, 10, 10);
  }
  // Display Score
  fill(0);
  text(`Score: ${score}`, 10, 38);
  // Display game over message, win or lose
  if (gameIsOver) {
    textSize(60);
    if (lives >= 1) {
      text("YOU WIN!", 110, height / 2);
    } else {
      text("GAME OVER", 70, height / 2);
    }
  }
}
