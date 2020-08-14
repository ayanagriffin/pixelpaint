/*
-------------------------- PICTURE CLASS ----------------------------

a Picture represents the original image. This class:

1. sections out the image into Blocks,
2. finds the average color of each block, 
3. compares those average colors against each other to see if they are similar enough to be considered the same color,
4. assigns each of the final colors a number, then puts those numbers into a 2D array. this array will be used to draw 
  the template that is displayed to the user for them to paint

*/

class Picture {
  constructor(rows, cols, blockSize, cushion) {
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
    // values (i.e. what is needed to draw the Squares)

    this.initializeValsArray();
    //console.log("Picture class: getFinArr line 1 finished");
    this.getBlockArray();
     console.log("Picture class: getFinArr line 2 finished"); // DOESN'T REACH HERE*****************************************
    this.refactorBlockColors();
    // console.log("getFinArr line 3 finished");
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
    console.log("vals array:")
    console.log(this.valsArray)
  }

  getBlockArray() {
    console.log("Picture class: getBlockArr started")
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        let block = new Block(r, c, this.size);

        row.push(block.getAverageColor());
      }
      this.blocks.push(row);
      console.log(row);
      
    }
    console.log("blocks:")
    console.log(this.blocks)
     console.log("Picture class: getBlockArr finished")
    
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


/*global abs, Block*/