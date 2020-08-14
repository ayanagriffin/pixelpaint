/*
-------------------------- PICTURE CLASS ----------------------------

a Picture represents the original image. This class:

1. sections out the image into Blocks,
2. finds the average color of each block, 
3. compares those average colors against each other to see if they are similar enough to be considered the same color,
4. assigns each of the final colors a number and puts those numbers into a 2D array that will be used to draw the template
   that is displayed to the user for them to paint

*/

class Picture {
  constructor(rows, cols, blockSize) {
    this.blocks = [];
    this.numColors = 0;
    this.cushion = cushion;
    this.rows = rows;
    this.cols = cols;
    this.size = blockSize;
    this.valsArray = [];
    this.finalColors = [];
  }

  getFinalArray() {
    // basically runs all necessary functions within the class to return the array with the color
    //      values (i.e. what is needed to draw the Squares)

    this.initializeValsArray();
    this.getBlockArray();
    this.refactorBlockColors();
    return this.valsArray;
  }

  // not sure if I need this? probably some way to initialize a 2D array quicker
  initializeValsArray() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        row.push(0);
      }
      this.valsArray.push(row);
    }
  }

  getBlockArray() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        let block = new Block(c, r, this.size);

        row.push(block.getAverageColor());
      }
      this.blocks.push(row);
    }

    this.refactorBlockColors();
  }

  refactorBlockColors() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!this.blocks[r][c].foundMatch) {
          this.numColors++;

          this.findMatches(this.blocks[r][c], this.numColors);
        }
      }
    }
  }

  findMatches(testBlock, colorVal) {
    let matches = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let curBlock = this.blocks[r][c];

        if (!curBlock.foundMatch) {
          if (
            abs(testBlock[0] - curBlock[0]) < this.cushion &&
            abs(testBlock[1] - curBlock[1]) < this.cushion &&
            abs(testBlock[2] - curBlock[2]) < this.cushion
          ) {
            matches.push(curBlock);

            curBlock.foundMatch = true;

            this.valsArray[r][c] = colorVal;
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
      totalR += curBlock[0];
      totalG += curBlock[1];
      totalB += curBlock[2];
    }

    let finalR = totalR / matches.length;
    let finalG = totalG / matches.length;
    let finalB = totalB / matches.length;

    let finalColor = [finalR, finalG, finalB];

    for (let i = 0; i < matches.length; i++) {
      if (i == 0) {
        this.finalColors.push(finalColor);
      }
      let curBlock = matches[i];
      curBlock.finalColor = finalColor;
    }
  }

  getAvgColors() {
    return this.finalColors;
  }
}

/* -------------------------- BLOCK CLASS ----------------------------

a Block represents a section of the original image. Blocks are used by the Picture class 
to determine the number of colors that will be displayed to the user and what those colors are

*/
class Block {
  constructor(row, col, blockSize) {
    this.row = row;
    this.col = col;
    this.size = blockSize;
    this.totalPixels = this.size * this.size;
    this.startingX = this.col * this.size;
    this.startingY = this.row * this.size;
    this.endingX = this.startingX + this.size;
    this.endingY = this.startingY + this.size;
    this.finalColor = [];
    this.colorVals = [0, 0, 0];
    this.foundMatch = false;
  }

  getAverageColor() {
    for (let i = this.startingX; i < this.endingX; i++) {
      for (let j = this.startingY; j < this.endingY; j++) {
        
        // checks for transparent bkg; if transparent, set it to white instead
        if (display.get(j, i)[3] === 255) {
          this.colorVals[0] += display.get(j, i)[0];
          this.colorVals[1] += display.get(j, i)[1];
          this.colorVals[2] += display.get(j, i)[2];
        }else{
          this.colorVals[0] += 255;
          this.colorVals[1] += 255;
          this.colorVals[2] += 255;
        }

      }
    }

    this.colorVals[0] = floor(this.colorVals[0] / this.totalPixels);
    this.colorVals[1] = floor(this.colorVals[1] / this.totalPixels);
    this.colorVals[2] = floor(this.colorVals[2] / this.totalPixels);

    return this.colorVals;
  }
}

/*global blockSize, display, floor, rows, cols, abs, cushion*/
