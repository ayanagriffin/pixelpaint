/*global loadImage, createCanvas, background*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, display, imgDimensions2;
  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fmosaic-758754_960_720.webp?v=1595547170968";
  display = loadImage(imgUrl);
  
}

function setup() {
  getDimensions(imgUrl);
  createCanvas(getDimensions(imgUrl), 200);
  console.log(getDimensions(imgUrl));
  background(235);

  

}


//updates dimensions and returns a Promise after image finishes loading -- RESEARCH PROMISES
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  //return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      //console.log(imgDimensions);
      return imgDimensions.w;
      
    };
 // });
  
 //console.log(imgDimensions);
  
}


