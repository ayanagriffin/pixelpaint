/*global createCanvas, colorMode, HSB, background, image, loadImage*/

let img, numRows, numCols, imgW, imgH, blockW, blockH, blocks;

function preload(){
  img = loadImage("https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fimg_lights.jpg?v=1595543508242");
}
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  numRows = 10; 
  numCols = 10;
  imgW = 300;
  imgH = 300;
  blockW = imgW / numCols;
  blockH = imgH / numRows;
  blocks = [];
}

function draw() {
  background(95);
  image(img, 0, 0, imgW, imgH);
  
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      blocks.push(new Block(i, j));
    }
  }
  
}

class Block{
  constructor(row, col){
    this.row = row;
    this.col = col;
    this.startingX = this.row * blockW;
    this.startingY = this.col * blockH;
    this.colors = [];
  }
  
  getColors(){
    
  }
}




