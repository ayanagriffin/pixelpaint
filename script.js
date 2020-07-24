/*global createCanvas, colorMode, HSB, background, image, loadImage, get, fill, rect, RGB, noStroke*/

let img, numRows, numCols, imgW, imgH, blockW, blockH, blocks, finalColors, maxColors, numColors, color1, color2, color3;

function preload() {
  img = loadImage(
    "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909"
  );
}
function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 255);
  numRows = 5;
  numCols = 5;
  imgW = 300;
  imgH = 300;
  blockW = imgW / numCols;
  blockH = imgH / numRows;
  blocks = [];
  finalColors = [];
  maxColors = 3;
  numColors = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      blocks.push(new Block(i, j));
    }
  }

}

function draw() {
  background(242, 242, 242);
  image(img, 0, 0, imgW, imgH);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw();
    
  }

  getFinalColors();
  refactorColors(0);
  
}

class Block {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.width = blockW;
    this.height = blockH;
    this.startingX = this.row * this.width;
    this.startingY = this.col * this.height;
    this.totalR = 0;
    this.totalG = 0;
    this.totalB = 0;
    this.finalR = 0;
    this.finalG = 0;
    this.finalB = 0;
    this.finalColor = [];
  }

  getColors() {
  // creates and returns an array consisting of the R,G,B,A color values of each pixel in the block
    let colors = [];
    for (let i = this.startingX; i < this.width + this.startingX; i++) {
      for (let j = this.startingY; j < this.height + this.startingY; j++) {
        colors.push(get(i, j));
      }
    }
    
    return colors;
  }

  findAverageColor(colors) {
  // goes through each color value of each pixel in the block and finds the average color
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    for (let i = 0; i < colors.length; i++) {
      totalR += colors[i][0];
      totalG += colors[i][1];
      totalB += colors[i][2];
    }

    this.finalR = totalR / colors.length;
    this.finalG = totalG / colors.length;
    this.finalB = totalB / colors.length;

    this.finalColor = [this.finalR, this.finalG, this.finalB];
    
   return this.finalColor;
   
  }
  draw() {
    noStroke();
    fill(this.findAverageColor(this.getColors()));
    rect(this.startingX, this.startingY, this.width, this.height);
    
  }
}

function getFinalColors() {
  for (let i = 0; i < blocks.length; i++) {
    finalColors.push(blocks[i].finalColor);
  }
  
}

function refactorColors(i){
  while(numColors < maxColors){
    let color = blocks[i].finalColor;
    findMatches(color);
    numColors++;
    console.log(color);
    
  }
}

function findMatches(color){
 // for(let i = 0)
}