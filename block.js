/*global BLOCK_SIZE, display, floor, rows, cols, abs*/




class Picture {
  constructor(rows, cols, BLOCK_SIZE) {
    this.blocks = [];
    this.numColors = 0;
    this.cushion = 150;
    this.rows = rows;
    this.cols = cols;
    this.size = BLOCK_SIZE;
    this.valsArray = [];
  }

  initializeValsArray(){
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
        let block = new Block(c, r);

        row.push(block.getAverageColor());
      }
      this.blocks.push(row);
    }

    //return this.blocks;
    this.refactorBlockColors();
    //return this.blocks;
  }

  refactorBlockColors() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        //console.log(this.blocks[r][c][0]);
        if (!this.blocks[r][c].foundMatch) {
          this.numColors++;
          //console.log(this.blocks[r][c].colorVals[0]);
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
        //console.log(testBlock.colorVals);
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
  
  findAverageColor(matches){
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
      //console.log(finalColor);

      for (let i = 0; i < matches.length; i++) {
        let curBlock = matches[i];
        curBlock.finalColor = finalColor;
        //console.log(finalColor, curBlock.finalColor);
      }
    
  }
  
  getFinalArray() {
    // basically runs all necessary functions within the class to return the array with the color 
    //      values (i.e. what is needed to draw the Squares in the main file)
    
    this.initializeValsArray();
    this.getBlockArray();
    this.refactorBlockColors();
    return this.valsArray;
  }
}






class Block {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.size = BLOCK_SIZE;
    this.totalPixels = BLOCK_SIZE * BLOCK_SIZE;
    this.startingX = this.col * this.size;
    this.startingY = this.row * this.size;
    this.endingX = this.startingX + this.size;
    this.endingY = this.startingY + this.size;
    this.finalColor = [];

    //this.originalColors = [];
    this.colorVals = [0, 0, 0];
    this.foundMatch = false;
  }

  getAverageColor() {
    for (let i = this.startingX; i < this.endingX; i++) {
      for (let j = this.startingY; j < this.endingY; j++) {
        //console.log(j, i); // row, col
        //this.originalColors.push(display.get(j, i));
        this.colorVals[0] += display.get(j, i)[0];
        this.colorVals[1] += display.get(j, i)[1];
        this.colorVals[2] += display.get(j, i)[2];
      }
    }

    this.colorVals[0] = floor(this.colorVals[0] / this.totalPixels);
    this.colorVals[1] = floor(this.colorVals[1] / this.totalPixels);
    this.colorVals[2] = floor(this.colorVals[2] / this.totalPixels);

    return this.colorVals;
  }
}



