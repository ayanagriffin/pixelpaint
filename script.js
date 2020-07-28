/*global loadImage, createCanvas, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl,
  display,
  maxImgW,
  maxImgH,
  canvas,
  startingCanvasW,
  startingCanvasH,
  rows,
  cols, testArray;
const BLOCK_SIZE = 30;

function preload() {
  imgUrl =
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2Funnamed.png?v=1595864938729";
  display = loadImage(imgUrl);
}

function setup() {
  maxImgW = (windowWidth * 2) / 3;
  maxImgH = (windowHeight * 1) / 2;
  canvas = createCanvas(windowWidth, windowHeight);
  background(235);
  getDimensions(imgUrl);
  // fill(0);
  // rect(0, 0, 100, 100);
}

//updates dimensions and returns a Promise after image finishes loading
function getDimensions(url) {
  let img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      //console.log(imgDimensions, maxImgH);
      adjustCanvas();
      //resizeImage();
      resolve();
    };
  });
}

function adjustCanvas() {
  resizeImage();
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  background(235);
  //drawRowsAndCols();
  //image(display, 0, 0);
}

// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage() {
  let ratio = imgDimensions.h / imgDimensions.w; // if > 1, we have more rows than cols
  if (imgDimensions.w > imgDimensions.h && imgDimensions.w > maxImgW) {
    imgDimensions.w = maxImgW;
    imgDimensions.h = imgDimensions.w * ratio;
    console.log(imgDimensions);
  } else if (imgDimensions.h > maxImgH) {
    imgDimensions.h = maxImgH;
    imgDimensions.w = imgDimensions.h / ratio;
  }

  getRowsAndCols(ratio);

  // some sides might be shaved down a bit to create the blocks, which are perfect squares.
  // these next lines adjust the dimensions so that the squares fit evenly with no excess hanging over the sides.
  imgDimensions.w = cols * BLOCK_SIZE;
  imgDimensions.h = rows * BLOCK_SIZE;
  display.resize(imgDimensions.w, imgDimensions.h);

  console.log(imgDimensions);

  getArray();
  // let block = new Block(0, 0);
  // console.log(block.getAverageColor());
  //console.log(display.get(imgDimensions.w - 1, imgDimensions.h - 1))
}

function getRowsAndCols(ratio) {
  if (ratio > 1) {
    rows = imgDimensions.h / BLOCK_SIZE;
    cols = rows / ratio;
  } else {
    cols = imgDimensions.w / BLOCK_SIZE;
    rows = cols * ratio;
  }

  rows = floor(rows);
  cols = floor(cols);
  console.log(rows, cols);
}

function getArray(){
  let colorBlockImg = new Picture(rows, cols, BLOCK_SIZE);
  //testArray = colorBlockImg.getBlockArray();
  //console.log(testArray);
  console.log(colorBlockImg.getFinalArray());
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
      rect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}
