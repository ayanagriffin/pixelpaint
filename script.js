/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height */

let backgroundColor, spherePosition, rectPosition

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object aka POJsO (Plain Old JavaScript Object)
  spherePosition = {
    "x": 100,
    "y": 100
  };
}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  // rect(rectPosition.x, rectPosition.y, 20, 20);
  // line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}