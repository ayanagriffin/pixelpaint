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
  time = 100;
  gameIsOver = false;
  hit = false;
  score = 0;
}

function draw() {
  background(backgroundColor);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 20);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);
  if (gameIsOver === true) {
    text('Game over!', 20, 80);
  }
  
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit) {
    handleCollision();
  }
  
  handleTime();
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  if (!gameIsOver) {
  // if (gameIsOver === false) {
    score += 1;
    // score++;
    coinX = random(width);
    coinY = random(height);
  }
}

function handleTime() {
  // We'll write code to handle the time.
  // time -= 1;
  // // time--;
  // if (time < 0) {
  //   time = 0;
  //   gameIsOver = true;
  // }
  
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
  }
}