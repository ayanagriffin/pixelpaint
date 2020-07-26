/*global createCanvas, colorMode, HSB, background, image, loadImage, get, abs, fill, rect, RGB, noStroke*/

// ideas: don't have a picture class; instead make it an image so I can use image.src, then just have necessary functions to refactor
// maybe pass the image object into the picture class? then determine dimensions and everything from there

let img, testPic, url;

function preload(){
  url = "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909";
  testPic = loadImage(url);
}

function setup(){

  createCanvas(400,400);
  image(testPic, 0, 0, 400, 400);
  //img.getFinalArray();
  console.log(img.getFinalArray());
  
  
}

function draw(){
  
  background(200);
  
  
  for(let i = 0; i < img.blocks.length; i++){
    for(let j = 0; j < img.blocks[i].length; j++){
      img.blocks[j][i].draw();
    }
  }

  
}

function justTesting(){
  
}


////////////////////////////////////////////////////////////////////////////////
// only difference between picture.js and picture_tester.js is above this line; this file visualises the problem for debugging purposes!
// see picture.js for more notes on functionality 



class Picture {
  constructor(imgLink) {
    this.imgLink = imgLink;
    //this.img = loadImage(this.imgLink);
    this.numRows = 20;
    this.numCols = 20;
    this.imgW = 400;
    this.imgH = 400;
    this.blockW = this.imgW / this.numRows;
    this.blockH = this.imgH / this.numCols;
    this.blocks = [];
    this.colorVals = [];
    this.finalColors = [];
    this.numColors = 0;
    this.cushion = 100;

  }
  

  getBlocks() {
    for (let i = 0; i < this.numRows; i++) {
      let row = [];
      for (let j = 0; j < this.numCols; j++) {
        row.push(new Block(j, i, this.blockW, this.blockH));
      }
      this.blocks.push(row);
    }
  }

  initializeColorVals() {
    for (let i = 0; i < this.blocks.length; i++) {
      let row = [];
      for (let j = 0; j < this.blocks[i].length; j++) {
        row.push(0);
      }
      this.colorVals.push(row);
    }
  }

  findBlockColors() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        
        if (!this.blocks[j][i].foundMatch) {
          this.blocks[j][i].getColors();
          this.blocks[j][i].findAverageColor();
          
        }
      }
    }

    this.refactorColors();
  }

  refactorColors() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        
        if (!this.blocks[j][i].foundMatch) {
         
          this.numColors++;
          
          this.findMatches(this.blocks[j][i], this.numColors);

          
        }
      }
    }
  }

  findMatches(testBlock, colorVal) {
    let matches = [];
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        let curBlock = this.blocks[j][i];
        
        if (!curBlock.foundMatch) {
          

          if (
            abs(testBlock.averageR - curBlock.averageR) < this.cushion &&
            abs(testBlock.averageG - curBlock.averageG) < this.cushion &&
            abs(testBlock.averageB - curBlock.averageB) < this.cushion
          ) {
            matches.push(curBlock);
        
            curBlock.foundMatch = true;
            
            this.colorVals[j][i] = colorVal;

            
          } else {
            
          }
        }
      }
    }

    this.findAverageColor(matches);
  }

  findAverageColor(matches) {
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;

      for (let i = 0; i < matches.length; i++) {
        let curBlock = matches[i];
        totalR += curBlock.averageR;
        totalG += curBlock.averageG;
        totalB += curBlock.averageB;
      }

      let finalR = totalR / matches.length;
      let finalG = totalG / matches.length;
      let finalB = totalB / matches.length;

      let finalColor = [finalR, finalG, finalB];
      //console.log(finalColor);

      for (let i = 0; i < matches.length; i++) {
        let curBlock = matches[i];
        curBlock.finalColor = finalColor;
        //console.log(finalColor, curBlock.finalColor);
      }
    
  }

  getFinalArray() {
    
    this.getBlocks();
    this.initializeColorVals();
    this.findBlockColors();
    //console.log(this.colorVals);
    return this.colorVals;
  }
}

class Block {
  constructor(row, col, blockW, blockH) {
    this.foundMatch = false;
    this.row = row;
    this.col = col;
    this.width = blockW;
    this.height = blockH;
    this.startingX = this.row * this.width;
    this.startingY = this.col * this.height;
    this.totalR = 0;
    this.totalG = 0;
    this.totalB = 0;
    this.averageR = 0;
    this.averageG = 0;
    this.averageB = 0;
    this.averageColor = [];
    this.finalColor = [];
    this.colors = [];
  }

  getColors() {
    // creates and returns an array consisting of the R,G,B,A color values of each pixel in the block
    //let colors = [];
    for (let i = this.startingX; i < this.width + this.startingX; i++) {
      for (let j = this.startingY; j < this.height + this.startingY; j++) {
        this.colors.push(get(i, j));
      }
    }

  
  }

  findAverageColor() {
    // goes through each color value of each pixel in the block and finds the average color
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    for (let i = 0; i < this.colors.length; i++) {
      totalR += this.colors[i][0];
      totalG += this.colors[i][1];
      totalB += this.colors[i][2];
    }

    this.averageR = totalR / this.colors.length;
    this.averageG = totalG / this.colors.length;
    this.averageB = totalB / this.colors.length;

    this.averageColor = [this.averageR, this.averageG, this.averageB];

    
  }
  draw() {
    noStroke();
    //console.log(this.finalColor);
    fill(this.finalColor);

    rect(this.startingX, this.startingY, this.width, this.height);
  }
}

