

/* -------------------------- BLOCK CLASS ----------------------------

a Block represents a section of the original image. Blocks are used by the Picture class 
to determine the number of colors that will be displayed to the user and what those colors are

*/
class Block {
  constructor(row, col, blockSize) {
    this.row = row;
    this.col = col;
    this.size = blockSize;
    this.startingX = this.col * this.size;
    this.startingY = this.row * this.size;
    this.endingX = this.startingX + this.size;
    this.endingY = this.startingY + this.size;
    this.finalColor = [];
    this.colorVals = [0, 0, 0];
    this.foundMatch = false;
  }

  getAverageColor() {
    let totalPixels = 0;
    for (let i = this.startingX; i < this.endingX; i+=4) {
      for (let j = this.startingY; j < this.endingY; j+=3) {
        let curPixel = display.get(i, j);
        // checks for transparent bkg; if transparent, set it to white instead
        if (curPixel[3] === 255) {
          this.colorVals[0] += curPixel[0];
          this.colorVals[1] += curPixel[1];
          this.colorVals[2] += curPixel[2];
        }else{
          this.colorVals[0] += 255;
          this.colorVals[1] += 255;
          this.colorVals[2] += 255;
        }
          console.log("color values added")
          /* PROBLEM: going way too slow and adding too many when slider is adjusted -- if blockSize is 20,
          should only log "color values added" 400x per block, but is doing way more than this when slider is adjusted
          for some reason*/
        
        totalPixels++;
      }
    }

    this.colorVals[0] = floor(this.colorVals[0] / totalPixels);
    this.colorVals[1] = floor(this.colorVals[1] / totalPixels);
    this.colorVals[2] = floor(this.colorVals[2] / totalPixels);

    return this.colorVals;
    
  }
}

/*global display, floor, rows, cols, abs*/
