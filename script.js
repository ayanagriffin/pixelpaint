/* global text, sq, sqrt, rect, line, createCanvas, colorMode, HSB, background, ellipse, random, width, height */

let backgroundColor, spherePosition, rectPosition

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object aka POJsO (Plain Old JavaScript Object)
  spherePosition = {
    "x": 100,
    "y": 100,
  };
  rectPosition = {
    "x": 130,
    "y": 140,
  };
}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  rect(rectPosition.x, rectPosition.y, 20, 20);
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  text(`The circle and the square are ${computeDistance(spherePosition, rectPosition)} apart`, 20, 20);
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}

function computeDistance(point1, point2) {
  // square root of: different in x values squared + difference in y values
  // squared
  let xDiff = point1.x - point2.x;
  let yDiff = point1.y - point2.y;
  return sqrt(sq(xDiff) + sq(yDiff));
}