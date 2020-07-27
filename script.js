/*global loadImage, createCanvas, resizeCanvas, background, text, windowWidth, windowHeight, image, round, floor, rect, fill*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, display, maxImgW, maxImgH, canvas, startingCanvasW, startingCanvasH, rows, cols;
const BLOCK_SIZE = 30;


  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2FMrtallimage.webp?v=1595864859609";
  display = loadImage(imgUrl);
  
}

function setup() {
  maxImgW = windowWidth * 2 /3;
  maxImgH = windowHeight * 1 / 2;
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

function adjustCanvas(){
  resizeImage();
  resizeCanvas(imgDimensions.w, imgDimensions.h); 
  //getColors();
  background(235);
  //image(display, 0, 0);
}

// resizes imgDimensions to fit nicely on the window while maintaining the original ratio between w and h
function resizeImage(){
  let ratio = imgDimensions.h / imgDimensions.w; // if > 1, we have more rows than cols
  if(imgDimensions.w > imgDimensions.h && imgDimensions.w > maxImgW){
    imgDimensions.w = maxImgW;
    imgDimensions.h = imgDimensions.w * ratio;
    console.log(imgDimensions);
  }else if(imgDimensions.h > maxImgH){
    imgDimensions.h = maxImgH;
    imgDimensions.w = imgDimensions.h / ratio;
  }
  
  imgDimensions.w = round(imgDimensions.w);
  imgDimensions.h = round(imgDimensions.h);
  
  display.resize(imgDimensions.w, imgDimensions.h);
  
  console.log(imgDimensions);
  getRowsAndCols(ratio);
  
  
}

function getRowsAndCols(ratio){
  if(ratio > 1){
    rows = imgDimensions.h / BLOCK_SIZE;
    cols = rows / ratio;
  }else{
    cols = imgDimensions.w / BLOCK_SIZE;
    rows = cols * ratio;
  }
  
  rows = floor(rows);
  cols = floor(cols);
  console.log(rows, cols);
  
}

