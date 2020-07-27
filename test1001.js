/*global loadImage, createCanvas, background*/

let imgDimensions = { w: 0, h: 0 };
let imgUrl, display, imgDimensions2;
  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909";
  display = loadImage(imgUrl);
  
}

function setup() {
  getDimensions(imgUrl);
  
  background(235);
  

}


//updates dimensions and returns a Promise after image finishes loading -- RESEARCH PROMISES
function getDimensions(url) {
  let image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    image.onload = function() {
      imgDimensions2 = { w: this.width, h: this.width };
      console.log(imgDimensions2);
      createCanvas(imgDimensions2.w, imgDimensions2.h);
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      
      
    };
  });
  
  display.get(0,0);
  
}


