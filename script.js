/*global createCanvas, colorMode, HSB, background, image, loadImage, get, fill, rect, RGB*/

let img, numRows, numCols, imgW, imgH, blockW, blockH, blocks;

function preload() {
  img = loadImage(
    "https://cdn.glitch.com/d82135a4-9f9d-4654-a46b-f7f58cdc9d01%2Fimg_lights.jpg?v=1595543508242"
  );
}
function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 255);
  numRows = 25;
  numCols = 25;
  imgW = 300;
  imgH = 300;
  blockW = imgW / numCols;
  blockH = imgH / numRows;
  blocks = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      blocks.push(new Block(i, j));
    }
  }

  // for (let i = 0; i < blocks.length; i++) {
  //   blocks[i].getColors();
  //   blocks[i].findAverageColor();
  // }
  
  
}

function draw() {
  background(242, 242, 242);
  image(img, 0, 0, imgW, imgH);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].getColors();
    blocks[i].findAverageColor();
    blocks[i].draw();
    //console.log(blocks[i].finalB);
    //blocks[i].test();
  }

  // console.log(blocks[3].totalB);
  // console.log(blocks[3].colors.length);
  //console.log(0 / 22500);
  //console.log(get(350, 350));
}

class Block {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.width = blockW;
    this.height = blockH;
    this.startingX = this.row * this.width;
    this.startingY = this.col * this.height;
    this.colors = [];
    this.totalR = 0;
    this.totalG = 0;
    this.totalB = 0;
    this.finalR = 0;
    this.finalG = 0;
    this.finalB = 0;
  }

  getColors() {
    for (let i = this.startingX; i < this.width + this.startingX; i++) {
      for (let j = this.startingY; j < this.height + this.startingY; j++) {
        this.colors.push(get(i, j));
        
      }
    }
    
  }

  findAverageColor() {
    
    let totalR = 0;
    let totalB = 0
    let totalG = 0;
    for (let i = 0; i < this.colors.length; i++) {
      totalR += this.colors[i][0];
      totalG += this.colors[i][1];
      totalB += this.colors[i][2];
    }

    
    this.finalR = totalR / this.colors.length;
    this.finalG = totalG / this.colors.length;
    this.finalB = totalB / this.colors.length;

    //console.log(this.colors.length);
    //console.log(this.finalR, this.finalG, this.finalB);
    //return this.finalB;
  }
  draw() {
    fill(this.finalR, this.finalB, this.finalG);
    rect(this.startingX, this.startingY, this.width, this.height);
    //console.log(this.colors[0]);
  }
  
  test(){
    for(let i = 0; i < this.colors.length; i++){
      console.log(this.colors[i]);
    }
  }
}
