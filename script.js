/*global loadImage, createCanvas, resizeCanvas, background, text, windowWidth, windowHeight*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, display, imgDimensions2;
const TEST_SIZE = 200;
  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fmosaic-758754_960_720.webp?v=1595547170968";
  display = loadImage(imgUrl);
  
}

function setup() {
  createCanvas(TEST_SIZE, TEST_SIZE);
  getDimensions(imgUrl);
  //console.log(imgDimensions.w);
  //adjustCanvas();
  
  //console.log(imgDimensions); // logs 0, 0 but if you expand, logs the expected output
  
  background(235);
}


//updates dimensions and returns a Promise after image finishes loading 
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas(imgDimensions.w, imgDimensions.h);
      //console.log(imgDimensions); //logs expected output 
      resolve();
      
    };
  });
  
 
  
}

function adjustCanvas(w, h){
  //console.log(w, h); //logs expected output
  
  // trying to adjust the size of the canvas to be the size of the image. 
  //will later adjust the size of the image first to ensure it fits nicely in the canvas (i.e. it is not too tiny or large)
  
  
  // let newWidth = imgDimensions.w;
  // let newHeight = imgDimensions.h;
  // console.log(newWidth, newHeight);
  // resizeCanvas(newWidth, newHeight);
  
 // console.log(imgDimensions); //logs expected output 
  //console.log(imgDimensions.w, imgDimensions.h); //logs expected output
  //text(imgDimensions.w, 10, 10); //shows expected value
  fitImage();
  resizeCanvas(w, h); // reads it as 0, 0 
}


function fitImage() {
  let minPicDim = Math.min(imgDimensions.w, imgDimensions.h);
  let minWindowDim = Math.min(windowWidth, windowHeight);
  if (minPicDim == imgDimensions.w) {
    imgDimensions.w =
      ((minWindowDim * 2) / 3) * (imgDimensions.w / imgDimensions.h);
    imgDimensions.h = (minWindowDim * 2) / 3;
  } else if (minPicDim == imgDimensions.h) {
    imgDimensions.h =
      (minWindowDim - 100) * (imgDimensions.h / imgDimensions.w);
    imgDimensions.w = minWindowDim - 100;
  }
}
