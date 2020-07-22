/*global mouseIsPressed, text, canvasPressed, loadSound, soundFormats, createCanvas, colorMode, background, fill, HSB*/

let mySound;

function preload(){
  soundFormats('mp3');
  mySound = loadSound('assets/songExample.mp3');
  
}
function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(95);
  if(mouseIsPressed){
    mySound.play();
  }
}



