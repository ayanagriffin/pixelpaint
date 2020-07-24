/*global createCanvas, colorMode, HSB, background, image, loadImage, get, abs, fill, rect, RGB, noStroke*/
// TODO: combine! possibly eliminate setup and draw

class Image {
  constructor(imgLink) {
    this.img = loadImage(imgLink);
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
    image(this.img, 0, 0, this.imgW, this.imgH);
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

    //this.refactorColors();
  }

  refactorColors() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (!this.blocks[j][i].foundMatch) {
          //let color = blocks[i].finalColor;
          this.numColors++;
          //blocks[i].foundMatch = true;
          this.findMatches(this.blocks[j][i], this.numColors);

          //console.log(numColors);
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
          //console.log(testBlock.finalR, curBlock.finalR);

          if (
            abs(testBlock.finalR - curBlock.finalR) < this.cushion &&
            abs(testBlock.finalG - curBlock.finalG) < this.cushion &&
            abs(testBlock.finalB - curBlock.finalB) < this.cushion
          ) {
            matches.push(curBlock);
            //curBlock.finalColor = testBlock.finalColor;
            // curBlock.finalR = testBlock.finalR;
            // curBlock.finalG = testBlock.finalG;
            // curBlock.finalB = testBlock.finalB;
            curBlock.foundMatch = true;
            this.colorVals[j][i] = colorVal;

            //console.log('match: ', i);
          } else {
            // console.log('no match: ', i);
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
    return this.colorVals;
  }
}

class Block {
  constructor(row, col, blockW, blockH) {
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
    this.foundMatch = false;
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

    //return colors;
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

    //return this.finalColor;
  }
  draw() {
    noStroke();
    // if(!this.foundMatch){
    //   fill(this.findAverageColor(this.getColors()));
    // }else{
    //   fill(this.finalColor);
    // }

    fill(this.finalColor);

    rect(this.startingX, this.startingY, this.width, this.height);
  }
}

// function getFinalColors() {
//   for (let i = 0; i < blocks.length; i++) {
//     finalColors.push(blocks[i].finalColor);
//   }
// }

function refactorColors() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      if (!blocks[j][i].foundMatch) {
        //let color = blocks[i].finalColor;
        numColors++;
        //blocks[i].foundMatch = true;
        findMatches(blocks[j][i], numColors);

        console.log(numColors);
      }
    }
  }
  // while (numColors < maxColors) {
  //   let color = blocks[i].finalColor;
  //   blocks[i].foundMatch = true;
  //   //findMatches(color, 20);
  //   numColors++;
  //   //console.log(color);
  // }
}

function findMatches(testBlock, colorVal) {
  let matches = [];
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      let curBlock = blocks[j][i];
      if (!curBlock.foundMatch) {
        //console.log(testBlock.finalR, curBlock.finalR);

        if (
          abs(testBlock.finalR - curBlock.finalR) < cushion &&
          abs(testBlock.finalG - curBlock.finalG) < cushion &&
          abs(testBlock.finalB - curBlock.finalB) < cushion
        ) {
          matches.push(curBlock);
          //curBlock.finalColor = testBlock.finalColor;
          // curBlock.finalR = testBlock.finalR;
          // curBlock.finalG = testBlock.finalG;
          // curBlock.finalB = testBlock.finalB;
          curBlock.foundMatch = true;
          colorVals[j][i] = colorVal;

          //console.log('match: ', i);
        } else {
          // console.log('no match: ', i);
        }
      }
    }
  }

  findAverageColor(matches);
}

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

// MOST IMPORTANT INFO!! Use this to draw final image for user to color!!!

function getFinalColorArray() {
  return colorVals;
}
