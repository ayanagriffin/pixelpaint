/*global createCanvas, colorMode, HSB, background, image, loadImage, get, fill, rect, RGB*/

let img, numRows, numCols, imgW, imgH, blockW, blockH, blocks;

function preload(){
  img = loadImage("https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fimg_lights.jpg?v=1595543508242");
}
function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 255, 255, 255);
  numRows = 2; 
  numCols = 2;
  imgW = 300;
  imgH = 300;
  blockW = imgW / numCols;
  blockH = imgH / numRows;
  blocks = [];
  
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      blocks.push(new Block(i, j));
    }
  }
}

function draw() {
  background(95);
  image(img, 0, 0, imgW, imgH);
  
  for(let i = 0; i < blocks.length; i++){
    blocks[i].getColors();
    blocks[i].draw();
  }
  
}

class Block{
  constructor(row, col){
    this.row = row;
    this.col = col;
    this.width = blockW;
    this.height = blockH;
    this.startingX = this.row * this.width;
    this.startingY = this.col * this.height;
    this.colors = [];
  }
  
  getColors(){
    for(let i = this.startingX; i < this.width + this.startingX; i++){
      for(let j = this.startingY; j < this.height + this.startingY; j++){
        this.colors.push(get(i, j));
      }
    }
  }
  
  findAverageColor(){
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    
    for(let i = 0; i < this.colors.length; i++){
      totalR += this.colors[0];
      totalG += this.colors[1];
      totalB += this.colors[2];
    }
  }
  draw(){
    fill(this.colors[0]);
    rect(this.startingX, this.startingY, this.width, this.height);
    console.log(this.colors[0]);
    
  }
  
  
}




