/* global createCanvas, colorMode, HSB, background, random, width, height, ellipse, mouseX, mouseY, text */

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  // time = 1000;
  time = 50;
  gameIsOver = false;
}

function draw() {
  background(backgroundColor);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 20);
  text(`Time remaining: ${time}`, 20, 40);
  handleTime();
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
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
  }
}