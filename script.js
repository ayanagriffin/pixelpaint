/* global collideRectCircle, fill, rect, ellipse, keyCode, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, textSize, text, createCanvas, colorMode, HSB, random, width, height, background */

let backgroundColor, // color of the background
  frogX, // x position of frog
  frogY, // y position of frog
  score, // # of points
  lives, // number of lives/tries
  gameIsOver, // whether game is over
  car1X, // x position of car 1
  car1Y, // y position of car 1
  car1V, // velocity of car 1
  carWidth,
  carHeight,
  frogDiameter; 

// FUNCTIONS CALLED BY P5

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2;
  frogY = height - 20;
  frogDiameter = 20;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  carWidth = 40;
  carHeight = 30;
}

function draw() {
  background(backgroundColor);
  drawGoalLine();
  drawFrog();
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 10;
  }
  // Add in right, left, and down movement
  if (keyCode === DOWN_ARROW) {
    frogY += 10;
  }
  if (keyCode === RIGHT_ARROW) {
    frogX += 10;
  }
  if (keyCode === LEFT_ARROW) {
    frogX -= 10;
  }
}

// OUR FUNCTIONS

function drawGoalLine() {
  fill(60, 80, 80);
  rect(0, 0, width, 50);
}

function drawFrog() {
  fill(120, 80, 80);
  ellipse(frogX, frogY, frogDiameter);
}

function moveCars() {
  // Move the car
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = 0;
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, carWidth, carHeight);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  // let hasCarCollidedWithFrog = collideRectCircle(car1X, car1Y, carWidth, carHeight, frogX, frogY, frogDiameter);
  // if (hasCarCollidedWithFrog) {
  if (collideRectCircle(car1X, car1Y, carWidth, carHeight, frogX, frogY, frogDiameter)) {
    resetFrog();
    lives--;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < 50) {
    score++;
    resetFrog();
  }
}

function resetFrog() {
  frogX = width / 2;
  frogY = height - 20;
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score

  // Display game over message if the game is over
}
