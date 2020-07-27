/*global loadImage, createCanvas, resizeCanvas, background, text, windowWidth, windowHeight, image*/

let imgUrl, display, maxImgW, maxImgH, canvas, startingCanvasW, startingCanvasH;


  
function preload() {
  imgUrl =
    "https://cdn.glitch.com/f91fc56a-e988-47d9-bd82-072447cac29f%2Funnamed.png?v=1595864938729";
  display = loadImage(imgUrl);
  
}

function setup() {
 
  canvas = createCanvas(windowWidth, windowHeight);
  background(235);
  test();
 // image(display, 0, 0);
  //test();
  
}



function test(){
  display.resize(100, 100);
  console.log(display.get(99, 99));
}