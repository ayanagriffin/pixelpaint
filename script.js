/*global loadImage, createCanvas, resizeCanvas, background*/

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
  //console.log(getDimensions(imgUrl));
  
  background(235);

  

}


//updates dimensions and returns a Promise after image finishes loading -- RESEARCH PROMISES
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      adjustCanvas();
      //console.log(imgDimensions);
      resolve();
      
    };
  });
  
 //console.log(imgDimensions);
  
}

function adjustCanvas(){
  // let newWidth = imgDimensions.w;
  // let newHeight = imgDimensions.h;
  // console.log(newWidth, newHeight);
  // resizeCanvas(newWidth, newHeight);
  
  console.log(imgDimensions);
  resizeCanvas(imgDimensions.w, imgDimensions.h);
}


