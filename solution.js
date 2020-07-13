/* global collideCircleCircle, createCanvas, colorMode, HSB, background, random, width, height, ellipse, mouseX, mouseY, text */

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  score = 0;
  time = 1000;
  gameIsOver = false;
}

function draw() {
  background(backgroundColor);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 20);
  text(`Your score is ${score}`, 20, 20);
  text(`Time remaining: ${time}`, 20, 40);
  handleTime();

  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit) {
    handleCollision();
  }
}

function handleCollision() {
  if (!gameIsOver) {
    coinY = random(height);
    coinX = random(width);
    score += 1;
  }
}

function handleTime() {
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
    text(`Game over`, 20, 60);
  }
}