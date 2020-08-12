/*global loadImage, random, triangle, auto, ellipse, checkColorSquareClicked, CLOSE, textAlign, textSize, beginShape, endShape, TWO_PI, CENTER, sin, cos, vertex, paintingIsFinished, 
checkGuideSquareClicked, rectMode, CENTER, CORNER, guideSquares, drawGuideSquares, drawColorSquares, mouseX, mouseY, GuideSquare, ColorSquare, createCanvas, initializeColorSquares, 
initializeGuideSquares, noStroke, width, colorSquares, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, 
  display,
  maxImgW,
  maxImgH,
  canvas,
  startingCanvasW,
  startingCanvasH,
  rows,
  cols,
  testArray,
  finalColorArray,
  colorSquaresAreMade,
  avgColors,
  avgColorsAreRetrieved,
  currentColor,
  finishPrompt,
  blockSize = 20, cushion = 75;


function preload() {
  imgUrl =
    "https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fimg_lights.jpg?v=1595543508242";
  display = loadImage(imgUrl);
}

function setup() {
  avgColorsAreRetrieved = false;
  colorSquaresAreMade = false;
  maxImgW = (windowWidth * 2) / 3;
  maxImgH = (windowHeight * 2) / 3;
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-div");
  background(235);
  getDimensions(imgUrl);
  currentColor = "white";
  paintingIsFinished = false;
}

function draw() {
  if (colorSquaresAreMade) {
    drawColorSquares();
  }

  if (avgColorsAreRetrieved) {
    drawGuideSquares();
  }

  if (paintingIsFinished) {
    drawStar();
  }

  if (mouseX > -10 + width - 2 * blockSize && mouseX < width) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
    strokeWeight(0);
    fill(currentColor);
    triangle(
      mouseX - 3,
      mouseY - 10,
      mouseX - 4,
      mouseY + 5,
      mouseX + 7,
      mouseY + 3
    );
  }
}

//updates dimensions and returns a Promise after image finishes loading
function getDimensions(srcUrl) {
  let img = new Image();
  img.src = srcUrl;
  return new Promise((resolve, reject) => {
    img.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;

      adjustCanvas();

      resolve();
    };
  });
}

function mouseClicked() {
  if (!paintingIsFinished) {
    for (let r = 0; r < colorSquares.length; r++) {
      for (let c = 0; c < colorSquares[r].length; c++) {
        colorSquares[r][c].checkClicked();
      }
    }

    for (let i = 0; i < guideSquares.length; i++) {
      guideSquares[i].checkClicked();
    }
  }
}

function adjustCanvas() {
  resizeImage();
  resizeCanvas(imgDimensions.w + 2 * blockSize, imgDimensions.h);
  background(235);
}

// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage() {
  let ratio = imgDimensions.h / imgDimensions.w; // if > 1, we have more rows than cols
  if (imgDimensions.w > imgDimensions.h && imgDimensions.w > maxImgW) {
    imgDimensions.w = maxImgW;
    imgDimensions.h = imgDimensions.w * ratio;
    console.log(imgDimensions);
  } else {
    imgDimensions.h = maxImgH;
    imgDimensions.w = imgDimensions.h / ratio;
  }

  getRowsAndCols(ratio);

  // some sides might be shaved down a bit to create the blocks, which are perfect squares.
  // these next lines adjust the dimensions so that the squares fit evenly with no excess hanging over the sides.
  imgDimensions.w = cols * blockSize;
  imgDimensions.h = rows * blockSize;
  display.resize(imgDimensions.w, imgDimensions.h);

  getArray();
}

function getRowsAndCols(ratio) {
  if (ratio > 1) {
    rows = imgDimensions.h / blockSize;
    cols = rows / ratio;
  } else {
    cols = imgDimensions.w / blockSize;
    rows = cols * ratio;
  }

  rows = floor(rows);
  cols = floor(cols);
  //console.log(rows, cols);
}

function getArray() {
  let colorBlockImg = new Picture(rows, cols);
  finalColorArray = colorBlockImg.getFinalArray();
  avgColors = colorBlockImg.getAvgColors();
  avgColorsAreRetrieved = true;
  console.log(avgColors);
  drawTemplate();
}

//helper function for visualisation of the rows and cols
function drawRowsAndCols() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //strokeWeight(3);
      let red = testArray[r][c].R;
      let green = testArray[r][c].G;
      let blue = testArray[r][c].B;
      fill(red, green, blue);
      rect(c * blockSize, r * blockSize, blockSize, blockSize);
    }
  }
}

function drawTemplate() {
  initializeColorSquares(finalColorArray);
  initializeGuideSquares(avgColors);
}

function drawStar() {
  let starSize = imgDimensions.h / 20;
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2;
  let xBuffer = imgDimensions.w * 0.85;
  let yBuffer = imgDimensions.h * 0.15;
  fill("gold");
  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    let x = xBuffer + cos(i) * starSize;
    let y = yBuffer + sin(i) * starSize;
    vertex(x, y);
    x = xBuffer + cos(i + halfAngle) * ((starSize * 7) / 3);
    y = yBuffer + sin(i + halfAngle) * ((starSize * 7) / 3);
    vertex(x, y);
  }

  endShape(CLOSE);
  fill("black");
  textSize(imgDimensions.h / 25);
  textAlign(CENTER, CENTER);
  text(finishPrompt, xBuffer, yBuffer);
}

function setPrompt() {
  let prompts = ["Nice!", "Wow!", "Great!", "Cool!", "Yay!"];
  finishPrompt = random(prompts);
}
