/*global loadImage*/

let imgUrl, display;

let imgDimensions = { w: 0, h: 0 };

function preload() {
  // need to preload image for it to function properly
  imgUrl = "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909";
  display = loadImage(imgUrl);
}

function setup(){
  getDimensions(imgUrl);
}

function getDimensions(imgUrl){
  let image = new Image();
  image.src = imgUrl;
}