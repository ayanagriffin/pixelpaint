/* global fill, rect, ellipse, keyCode, UP_ARROW, textSize, text, createCanvas, colorMode, HSB, random, width, height, background */

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = random(width);
  frogY = random(height);
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
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
}

function moveCars() {
  // Move the car

  // Reset if it moves off screen

}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.

}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score

  // Display game over message if the game is over

}