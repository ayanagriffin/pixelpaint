/*global mouseIsPressed, text, canvasPressed, loadSound, soundFormats, createCanvas, colorMode, background, fill, HSB*/

let mySound;

function preload(){
  soundFormats('mp3');
  mySound = loadSound('https://cdn.glitch.com/923ded2e-470f-4401-a948-0e2b20cf279c%2FsongExample.mp3?v=1595447316715');
  
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



