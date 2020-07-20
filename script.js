/* global color, mouseX, mouseY, round, text, sq, sqrt, rect, line, createCanvas, colorMode, HSB, background, ellipse, random, width, height */

let backgroundColor, spherePosition, rectPosition, mousePosition; 

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object aka POJsO (Plain Old JavaScript Object)
  spherePosition = {
    "y": 100,
  };
  rectPosition = {
    "x": 130,
    "y": 140,
  };
  mousePosition = {
    "x": 0,
    "y": 0,
  };
}

function draw() {
  background(backgroundColor);
  // ellipse(spherePosition.x, spherePosition.y, 20, 20);
  // rect(rectPosition.x, rectPosition.y, 20, 20);
  // line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  // let circleSquareDistance = computeDistance(spherePosition, rectPosition);
  // text(`The circle and the square are ${circleSquareDistance} apart`, 20, 20);
  
  mousePosition.x = mouseX;
  mousePosition.y = mouseY;
  // mousePosition = {
  //   "x": mouseX,
  //   "y": mouseY,
  // }
  let mouseCircleDistance = computeDistance(mousePosition, spherePosition);
  let category = computeCategoryOfDistance(mouseCircleDistance);
  text(`The circle and your mouse are ${mouseCircleDistance} apart; you're ${category}!`, 20, 40);
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
  let distance = sqrt(sq(xDiff) + sq(yDiff));
  return round(distance);
}

function computeCategoryOfDistance(distance) {
  if (distance > 200) {
    backgroundColor = color(240, 10, 100);
    return "cold";
  } else if (distance > 50) {
    backgroundColor = color(120, 10, 100);
    return "warmer";
  } else {
    backgroundColor = color(0, 10, 100);
    return "red hot";
  }
}