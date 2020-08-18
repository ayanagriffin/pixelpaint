// need to be assigned values in preload(), but cannot pass this value from preload into another function
let display, imgUrl;

// used in draw() and cannot pass anything into draw
let templateIsLoading,
  colorSquaresAreMade,
  avgColorsAreRetrieved,
  currentColor,
  finishPrompt,
  brushImg;

/* used in functions that are called with user interaction (buttons, mouse clicks, etc), 
 not functions that I call so I can't give parameters */
let colorSquares,
  guideSquares,
  moves,
  prevPics = [];

const INITIAL_BLOCK_SIZE = 20,
  INITIAL_CUSHION = 70;

function preload() {
  imgUrl = random(defaultPics);
  display = loadImage(imgUrl);
  brushImg = loadImage(
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2FNew%20Document%204.png?v=1597350123550"
  );
  prevPics.push(imgUrl);
}

function setup() {
  /* would prefer to initialize MAX_IMG_W and MAX_IMG_H with the other constants, but cant because they 
   utilize windowWidth and I believe glitch does not initialize those until setup or preload */
  const MAX_IMG_W = (windowWidth * 3) / 4;
  const MAX_IMG_H = (windowHeight * 3) / 4;

  drawGrid(INITIAL_BLOCK_SIZE, INITIAL_CUSHION, MAX_IMG_W, MAX_IMG_H);
}

function drawGrid(blockSize, cushion, maxImgW, maxImgH) {
  moves = [];
  avgColorsAreRetrieved = false;
  colorSquaresAreMade = false;
  let imgDimensions = { w: maxImgW, h: maxImgH };
  let canvas = createCanvas(maxImgW, maxImgH);
  canvas.parent("canvas");
  getDimensions(blockSize, cushion, maxImgW, maxImgH, imgDimensions);
  currentColor = "white";
  paintingIsFinished = false;
  templateIsLoading = true;
  background(255, 245, 235);
  viewOriginalImage();
}

function draw() {
  if (templateIsLoading) {
    imageMode(CENTER);
    image(brushImg, width / 2 + 10, height * 0.4, width / 2, width / 2);
  }

  if (colorSquaresAreMade) {
    drawColorSquares();
  }

  if (avgColorsAreRetrieved) {
    drawGuideSquares();
  }

  if (paintingIsFinished) {
    drawStar();
  }

  drawCursor();
}

// CALLED BY: drawGrid()
//updates dimensions based on the size of the reference image
// maxImgW and maxImgH only needed in this function to pass to createTemplate
function getDimensions(blockSize, cushion, maxImgW, maxImgH, imgDimensions) {
  let img = new Image();
  img.src = imgUrl;
  img.onload = function() {
    imgDimensions.w = img.width;
    imgDimensions.h = img.height;
    // after imgDimensions are received, can call necessary functions to create the template
    // called here to ensure that the dimensions are set before execution
    createTemplate(blockSize, cushion, maxImgW, maxImgH, imgDimensions);
  };
}

// CALLED BY: getDimensions()
// runs all necessary functions to set up the template
function createTemplate(blockSize, cushion, maxImgW, maxImgH, imgDimensions) {
  let rowsAndCols = resizeImage(blockSize, maxImgW, maxImgH, imgDimensions);
  let rows = rowsAndCols[0];
  let cols = rowsAndCols[1];
  let colorArrays = getArray(blockSize, cushion, rows, cols);
  let finalColorArray = colorArrays[0];
  let avgColors = colorArrays[1];
  initializeSquares(blockSize, imgDimensions, finalColorArray, avgColors, rows);
  adjustCanvas(blockSize, imgDimensions);
}

// CALLED BY: createTemplate()
// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage(blockSize, maxImgW, maxImgH, imgDimensions) {
  let ratio = imgDimensions.h / imgDimensions.w; // if > 1, we have more rows than cols
  if (imgDimensions.w > imgDimensions.h && imgDimensions.w > maxImgW) {
    imgDimensions.w = maxImgW;
    imgDimensions.h = imgDimensions.w * ratio;

    while (imgDimensions.w * ratio > maxImgH) {
      imgDimensions.w *= 0.9;
    }

    imgDimensions.h = imgDimensions.w * ratio;
  } else {
    imgDimensions.h = maxImgH;

    while (imgDimensions.h / ratio > maxImgW) {
      imgDimensions.h *= 0.9;
    }

    imgDimensions.w = imgDimensions.h / ratio;
  }

  let rowsAndCols = getRowsAndCols(ratio, blockSize, imgDimensions);
  let rows = rowsAndCols[0];
  let cols = rowsAndCols[1];

  // some sides might be shaved down a bit to create the blocks, which are perfect squares.
  // these next lines adjust the dimensions so that the squares fit evenly with no excess hanging over the sides.
  imgDimensions.w = cols * blockSize;
  imgDimensions.h = rows * blockSize;
  display.resize(imgDimensions.w, imgDimensions.h);

  return [rows, cols];
}

// CALLED BY: resizeImage();
// finds the number of rows and cols based on the blockSize and imgDimensions
function getRowsAndCols(ratio, blockSize, imgDimensions) {
  let rows, cols;
  if (ratio > 1) {
    rows = imgDimensions.h / blockSize;
    cols = rows / ratio;
  } else {
    cols = imgDimensions.w / blockSize;
    rows = cols * ratio;
  }

  rows = floor(rows);
  cols = floor(cols);

  return [rows, cols];
}

// CALLED BY: createTemplate()
// gets array of numbers (that represent the color values) using the Picture and Block classes
function getArray(blockSize, cushion, rows, cols) {
  let colorBlockImg = new Picture(rows, cols, blockSize, cushion);
  let finalColorArray = colorBlockImg.getFinalArray();
  let avgColors = colorBlockImg.getAvgColors();
  avgColorsAreRetrieved = true;
  return [finalColorArray, avgColors];
}

// CALLED BY: createTemplate()
// makes colorSquares and guideSquares arrays
function initializeSquares(
  blockSize,
  imgDimensions,
  finalColorArray,
  avgColors,
  rows
) {
  initializeColorSquares(blockSize, finalColorArray, avgColors);
  initializeGuideSquares(blockSize, imgDimensions, avgColors, rows);
  templateIsLoading = false;
}

// CALLED BY: initializeSquares()
// creates array of ColorSquares
function initializeColorSquares(blockSize, finalColorArray, avgColors) {
  colorSquares = [];
  let templateColors = getTemplateColors(avgColors);
  for (let r = 0; r < finalColorArray.length; r++) {
    let currentRow = [];
    for (let c = 0; c < finalColorArray[r].length; c++) {
      let val = finalColorArray[r][c];

      let templateColor = templateColors[val - 1];
      currentRow.push(new ColorSquare(r, c, val, templateColor, blockSize));
    }
    colorSquares.push(currentRow);
  }
  colorSquaresAreMade = true;
}

// CALLED BY: initializeColorSquares()
// creates grayscale for template to make it easier to paint
function getTemplateColors(avgColors) {
  let templateColors = [];
  for (let i = 0; i < avgColors.length; i++) {
    let curColor = avgColors[i];
    let templateColor = (curColor[0] + curColor[1] + curColor[2]) / 3 + 75;
    templateColors.push(templateColor);
  }

  return templateColors;
}

// CALLED BY: initializeSquares()
// creates array of GuideSquares with correct positioning
function initializeGuideSquares(blockSize, imgDimensions, avgColors, rows) {
  guideSquares = [];
  let guideSquareHeight = blockSize * (rows / avgColors.length);
  for (let i = 0; i < avgColors.length; i++) {
    let x = imgDimensions.w;
    let y = i * guideSquareHeight;
    let guideSquareWidth = 2 * blockSize;
    let val = i + 1;
    let color = avgColors[i];
    guideSquares.push(
      new GuideSquare(x, y, color, val, guideSquareWidth, guideSquareHeight)
    );
  }
}

// CALLED BY: createTemplate()
// resizes the canvas to be the size of imgDimensions + some excess to fit the GuideSquares on the right side of the canvas
function adjustCanvas(blockSize, imgDimensions) {
  resizeCanvas(imgDimensions.w + 2 * blockSize, imgDimensions.h);
  background(235);
}

/* ----------------------------- DRAW FUNCTIONS (all called by draw()) -------------------------------- */

function drawColorSquares() {
  for (let i = 0; i < colorSquares.length; i++) {
    for (let j = 0; j < colorSquares[i].length; j++) {
      colorSquares[i][j].display();
    }
  }
}

function drawGuideSquares() {
  for (let i = 0; i < guideSquares.length; i++) {
    guideSquares[i].draw();
  }
}

function drawCursor() {
  // FIX 20 TO BE BLOCK SIZE
  if (mouseX > -10 + width - 2 * 20 && mouseX < width) {
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

function drawStar() {
  let starSize = height / 20;
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2;
  let xBuffer = width * 0.8;
  let yBuffer = height * 0.15;
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
  textSize(height / 25);
  textAlign(CENTER, CENTER);
  text(finishPrompt, xBuffer, yBuffer);
}

/*global defaultPics, viewOriginalImage, createVideo, loadImage, random, triangle, auto, ellipse, CLOSE, textAlign, textSize, beginShape, endShape, TWO_PI, CENTER, sin, cos, vertex, paintingIsFinished, 
checkGuideSquareClicked, rectMode, CENTER, CORNER, guideSquares, drawGuideSquares, drawColorSquares, mouseX, mouseY, GuideSquare, ColorSquare, createCanvas, initializeColorSquares, 
initializeGuideSquares, imageMode, noStroke, width, colorSquares, resizeCanvas, background, text, height, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
