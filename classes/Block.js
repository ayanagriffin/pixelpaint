

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
    this.startingX = this.row * this.size;
    this.startingY = this.col * this.size;
    this.endingX = this.startingX + this.size;
    this.endingY = this.startingY + this.size;
    this.finalColor = [];
    this.colorVals = [0, 0, 0];
    this.foundMatch = false;
  }

  getAverageColor() {
    for (let i = this.startingY; i < this.endingY; i++) {
      for (let j = this.startingX; j < this.endingX; j++) {
        
        // checks for transparent bkg; if transparent, set it to white instead
        if (display.get(i, j)[3] === 255) {
          this.colorVals[0] += display.get(i, j)[0];
          this.colorVals[1] += display.get(i, j)[1];
          this.colorVals[2] += display.get(i, j)[2];
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

/*global display, floor, rows, cols, abs*/
