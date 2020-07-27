/*global loadImage, createCanvas, resizeCanvas, background, text, windowWidth, windowHeight*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, display;
const TEST_SIZE = 200;
  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fmosaic-758754_960_720.webp?v=1595547170968";
  display = loadImage(imgUrl);
  
}

function setup() {
  createCanvas(TEST_SIZE, TEST_SIZE);
  background(235);
  getDimensions(imgUrl);
}


//updates dimensions and returns a Promise after image finishes loading 
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas();
      resolve();
      
    };
  });
  
 
  
}

function adjustCanvas(){
 // resizeImage();
  resizeCanvas(imgDimensions.w, imgDimensions.h); 
  background(235);
}

function resizeImage(){
  imgDimensions.w = windowWidth * 2 / 3;
  
}


