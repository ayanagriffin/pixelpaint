let imgDimensions = { w: 0, h: 0 };
let display,
  maxImgW,
  maxImgH,
  canvas,
  rows,
  templateIsLoading,
  templateColors,
  cols,
  testArray,
  finalColorArray,
  colorSquaresAreMade,
  avgColors,
  avgColorsAreRetrieved,
  currentColor,
  finishPrompt,
  imgUrl,
  prevPics = [],
  brushImg;

const INITIAL_BLOCK_SIZE = 20, INITIAL_CUSHION = 70;

function preload() {
  imgUrl = random(defaultPics);
  display = loadImage(imgUrl);
  brushImg = loadImage(
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2FNew%20Document%204.png?v=1597350123550"
  );
  prevPics.push(imgUrl);
}

function setup() {
  drawGrid(INITIAL_BLOCK_SIZE, INITIAL_CUSHION);
}

function drawGrid(blockSize, cushion) {
  avgColorsAreRetrieved = false;
  colorSquaresAreMade = false;
  maxImgW = (windowWidth * 3) / 4;
  maxImgH = (windowHeight * 3) / 4;
  canvas = createCanvas(maxImgW, maxImgH);
  canvas.parent("canvas");
  getDimensions(blockSize, cushion);
  currentColor = "white";
  paintingIsFinished = false;
  templateIsLoading = true;
  background(255, 245, 235);
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


function drawTestTemplate(){
  
}

//updates dimensions based on the size of the reference image
function getDimensions(blockSize, cushion) {
  console.log("getDimensions started")
  let img = new Image();
  img.src = imgUrl;
  img.onload = function() {
    imgDimensions.w = img.width;
    imgDimensions.h = img.height;
    // after imgDimensions are received, can call necessary functions to create the template
    // called here to ensure that the dimensions are set before execution
    createTemplate(blockSize, cushion);
  };
}


// CALLED BY: getDimensions()
// runs all necessary functions to set up the template
function createTemplate(blockSize, cushion){
    console.log("createTemplate started")

  resizeImage(blockSize);
  getArray(blockSize, cushion);
  initializeSquares(blockSize);
  adjustCanvas(blockSize);
}


// CALLED BY: createTemplate()
// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage(blockSize) {
    console.log("resizeImage started")

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

  getRowsAndCols(ratio, blockSize);

  // some sides might be shaved down a bit to create the blocks, which are perfect squares.
  // these next lines adjust the dimensions so that the squares fit evenly with no excess hanging over the sides.
  imgDimensions.w = cols * blockSize;
  imgDimensions.h = rows * blockSize;
  display.resize(imgDimensions.w, imgDimensions.h);

}

// CALLED BY: resizeImage();
// finds the number of rows and cols based on the blockSize and imgDimensions
function getRowsAndCols(ratio, blockSize) {
  if (ratio > 1) {
    rows = imgDimensions.h / blockSize;
    cols = rows / ratio;
  } else {
    cols = imgDimensions.w / blockSize;
    rows = cols * ratio;
  }

  rows = floor(rows);
  cols = floor(cols);
}

// CALLED BY: createTemplate()
// gets array of numbers (that represent the color values) using the Picture and Block classes
function getArray(blockSize, cushion) {
  console.log("getArray started")

  let colorBlockImg = new Picture(rows, cols, blockSize, cushion);
  console.log("line1 finished")
  finalColorArray = colorBlockImg.getFinalArray();
   console.log("line2 finished") // DOESN'T REACH HERE*****************************************
  avgColors = colorBlockImg.getAvgColors();
   console.log("line3 finished")
  avgColorsAreRetrieved = true;
   console.log("line4 finished")
  
  console.log("getArray finished")


}

// CALLED BY: createTemplate()
// makes colorSquares and guideSquares arrays
function initializeSquares(blockSize) {
  console.log("initSquares started")

  initializeColorSquares(blockSize);
  initializeGuideSquares(blockSize);
  templateIsLoading = false;
}


// CALLED BY: initializeSquares()
// creates array of ColorSquares 
function initializeColorSquares(blockSize) {
  colorSquares = [];
  getTemplateColors();
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
function getTemplateColors() {
  templateColors = [];
  for (let i = 0; i < avgColors.length; i++) {
    let curColor = avgColors[i];
    let templateColor = (curColor[0] + curColor[1] + curColor[2]) / 3 + 75;
    templateColors.push(templateColor);
  }
}


// CALLED BY: initializeSquares()
// creates array of GuideSquares with correct positioning
function initializeGuideSquares(blockSize) {
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
  
  currentColor = guideSquares[0].color;
}

// CALLED BY: createTemplate()
// resizes the canvas to be the size of imgDimensions + some excess to fit the GuideSquares on the right side of the canvas
function adjustCanvas(blockSize) {
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

/*global defaultPics, createVideo, loadImage, random, triangle, auto, ellipse, CLOSE, textAlign, textSize, beginShape, endShape, TWO_PI, CENTER, sin, cos, vertex, paintingIsFinished, 
checkGuideSquareClicked, rectMode, CENTER, CORNER, guideSquares, drawGuideSquares, drawColorSquares, mouseX, mouseY, GuideSquare, ColorSquare, createCanvas, initializeColorSquares, 
initializeGuideSquares, imageMode, noStroke, width, colorSquares, resizeCanvas, background, text, height, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
