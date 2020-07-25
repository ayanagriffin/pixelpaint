/*global createCanvas, colorMode, HSB, background, image, loadImage, get, abs, fill, rect, RGB, noStroke*/
// TODO: combine!
let img, testPic, allFinalArrays = [], done = false;

// function preload(){
//   img = new Picture("https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909");
//   testPic = loadImage(img.imgLink);
// }

// function setup(){

//   createCanvas(400,400);
//   image(testPic, 0, 0, 300, 300);
//   //img.getFinalArray();
//   console.log(img.getFinalArray());
//  // allFinalArrays.push(img.getFinalArray());
  
  
// }

// function draw(){
//   //image(testPic, 0, 0, 300, 300);
  
//   // if(!done){
//   //   image(testPic, 0, 0, 300, 300);
//   //   allFinalArrays.push(img.getFinalArray());
//   // }else{
//   //   done = true;
//   // }
//   //allFinalArrays.push(img.getFinalArray());
  
// }

class Picture {
  constructor(imgLink) {
    this.imgLink = imgLink;
    //this.img = loadImage(this.imgLink);
    this.numRows = 20;
    this.numCols = 20;
    this.imgW = 300;
    this.imgH = 300;
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
            abs(testBlock.finalR - curBlock.finalR) < this.cushion &&
            abs(testBlock.finalG - curBlock.finalG) < this.cushion &&
            abs(testBlock.finalB - curBlock.finalB) < this.cushion
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
    function findAverageColor(matches) {
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;

      for (let i = 0; i < matches.length; i++) {
        let curBlock = matches[i];
        totalR += curBlock.finalR;
        totalG += curBlock.finalG;
        totalB += curBlock.finalB;
      }

      let finalR = totalR / matches.length;
      let finalG = totalG / matches.length;
      let finalB = totalB / matches.length;

      let finalColor = [finalR, finalG, finalB];

      for (let i = 0; i < matches.length; i++) {
        let curBlock = matches[i];
        curBlock.finalColor = finalColor;
      }
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
    this.finalR = 0;
    this.finalG = 0;
    this.finalB = 0;
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

    this.finalR = totalR / this.colors.length;
    this.finalG = totalG / this.colors.length;
    this.finalB = totalB / this.colors.length;

    this.finalColor = [this.finalR, this.finalG, this.finalB];

    
  }
  draw() {
    noStroke();
    fill(this.finalColor);

    rect(this.startingX, this.startingY, this.width, this.height);
  }
}

