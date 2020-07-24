/*global createCanvas, colorMode, HSB, background, image, loadImage, get, abs, fill, rect, RGB, noStroke*/
// TODO: combine! possibly eliminate setup and draw

let img,
  numRows,
  numCols,
  imgW,
  imgH,
  blockW,
  blockH,
  blocks,
  finalColors,
  maxColors,
  numColors,
  color1,
  color2,
  color3,
  cushion,
  colorVals;

 function preload() {
  img = loadImage(
    "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909"
  );
 }
function setup() {
  
  createCanvas(400, 400);
  colorMode(RGB, 255);
  numRows = 20;
  numCols = 20;
  imgW = 300;
  imgH = 300;
  blockW = imgW / numCols;
  blockH = imgH / numRows;
  blocks = [];
  finalColors = [];
  //maxColors = 3;
  numColors = 0;
  cushion = 100; // the lower the cushion, the more the number of colors will be
  colorVals = [];

  image(img, 0, 0, imgW, imgH); 
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(new Block(j, i));
    }
    blocks.push(row);
  }

  for (let i = 0; i < blocks.length; i++) {
    let row = [];
    for (let j = 0; j < blocks[i].length; j++) {
      row.push(0);
    }
    colorVals.push(row);
  }
  
  
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      if (!blocks[j][i].foundMatch) {
        blocks[j][i].getColors();
        blocks[j][i].findAverageColor();
      }

     // blocks[j][i].draw();
    }
    //blocks[i].draw();

    // console.log(blocks[i].finalColor);
  }

  //getFinalColors();
  refactorColors();

  console.log(colorVals);
}

function draw() {
  background(242, 242, 242);
  

  
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
