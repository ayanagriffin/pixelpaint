let imgDimensions = { w: 0, h: 0 };
let display,
  maxImgW,
  maxImgH,
  canvas,
  startingCanvasW,
  startingCanvasH,
  rows,
  templateIsLoading,
  templateColors,
  cols,
  testArray,
  guideSquareHeight,
  finalColorArray,
  colorSquaresAreMade,
  avgColors,
  avgColorsAreRetrieved,
  currentColor,
  finishPrompt,
  cushion = 70,
  imgUrl,
  prevPics = [],
  brushImg;

function preload() {
  imgUrl = random(defaultPics);
  //imgUrl = "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2Fpbn%20icon.png?v=1597195637438";
  //imgUrl = "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2FScreen%20Shot%202020-08-13%20at%2010.44.17%20AM.png?v=1597340676948"
  display = loadImage(imgUrl);
  brushImg = loadImage(
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2FNew%20Document%204.png?v=1597350123550"
  );
  prevPics.push(imgUrl);
}

function setup() {
  drawGrid(20);
}

function drawGrid(blockSize){
  avgColorsAreRetrieved = false;
  colorSquaresAreMade = false;
  maxImgW = (windowWidth * 3) / 4;
  maxImgH = (windowHeight * 3) / 4;
  canvas = createCanvas(maxImgW, maxImgH);
  canvas.parent("canvas");
  getDimensions(imgUrl, blockSize);
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

function mouseDragged() {
  if (!paintingIsFinished) {
    for (let r = 0; r < colorSquares.length; r++) {
      for (let c = 0; c < colorSquares[r].length; c++) {
        colorSquares[r][c].checkClicked();
      }
    }
  }
}
//updates dimensions and returns a Promise after image finishes loading
function getDimensions(srcUrl, blockSize) {
  let img = new Image();
  img.src = srcUrl;
  // return new Promise((resolve, reject) => {
  img.onload = function() {
    imgDimensions.w = img.width;
    imgDimensions.h = img.height;

    adjustCanvas(blockSize);

    //     resolve();
    //   };
    // });
  };
}

function adjustCanvas(blockSize) {
  resizeImage(blockSize);
  resizeCanvas(imgDimensions.w + 2 * blockSize, imgDimensions.h);
  background(235);
}

// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage(blockSize) {
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

  getArray(blockSize);
}

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

//gets array of numbers (that represent the color values)
function getArray(blockSize) {
  let colorBlockImg = new Picture(rows, cols, blockSize);
  finalColorArray = colorBlockImg.getFinalArray();
  avgColors = colorBlockImg.getAvgColors();
  avgColorsAreRetrieved = true;

  drawTemplate(blockSize);
}

// makes colorSquares and guideSquares arrays
function drawTemplate(blockSize) {
  initializeColorSquares(blockSize);
  initializeGuideSquares(blockSize);
  templateIsLoading = false;
}

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

// creates grayscale for template to make it easier to paint
function getTemplateColors() {
  templateColors = [];
  for (let i = 0; i < avgColors.length; i++) {
    let curColor = avgColors[i];
    let templateColor = (curColor[0] + curColor[1] + curColor[2]) / 3 + 75;
    templateColors.push(templateColor);
  }
}

function initializeGuideSquares(blockSize) {
  guideSquares = [];
  guideSquareHeight = blockSize * (rows / avgColors.length);
  for (let i = 0; i < avgColors.length; i++) {
    let x = imgDimensions.w;
    let y = i * guideSquareHeight;
    let size = 2 * blockSize;
    let val = i + 1;
    let color = avgColors[i];
    guideSquares.push(new GuideSquare(x, y, color, val));
  }
}

/* -------------------- DRAW FUNCTIONS --------------------- */

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
