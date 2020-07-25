/*global createCanvas, colorMode, HSB, background, image, loadImage, get, abs, fill, rect, RGB, noStroke*/

class Picture {
  constructor(imgLink) {
    this.imgLink = imgLink;
    //this.img = loadImage(this.imgLink); (add in future when dealing with multiple images)
    this.numRows = 20; // will need to come up with formula to refactor
    this.numCols = 20;
    this.imgW = 400;
    this.imgH = 400;
    this.blockW = this.imgW / this.numRows;
    this.blockH = this.imgH / this.numCols;
    this.blocks = [];
    this.colorVals = [];
    this.finalColors = [];
    this.numColors = 0;
    this.cushion = 100; //maybe the user can determine the cushion, numRows, and numCols later

  }
  

  getBlocks() {
    // creates 2D array of each block of the image -- diving the image into rows and cols
    for (let i = 0; i < this.numRows; i++) {
      let row = [];
      for (let j = 0; j < this.numCols; j++) {
        row.push(new Block(j, i, this.blockW, this.blockH));
      }
      this.blocks.push(row);
    }
  }

  initializeColorVals() {
    // initializes 2D array that will hold the final color values later
    for (let i = 0; i < this.blocks.length; i++) {
      let row = [];
      for (let j = 0; j < this.blocks[i].length; j++) {
        row.push(0);
      }
      this.colorVals.push(row);
    }
  }

  findBlockColors() {
    // this, refactorColors(), and findMatches() find similar colors within the image blocks that will be grouped together to simplify the image
    // they also fill the colorVals array with the number associated with each color group
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
    // basically runs all necessary functions within the class to return the array with the color values (AKA what is needed to draw the Squares in the main file)
    
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
    // only here for testing/debugging purposes.. will not actually draw colored blocks in final product
    noStroke();
    //console.log(this.finalColor);
    fill(this.finalColor);

    rect(this.startingX, this.startingY, this.width, this.height);
  }
}
