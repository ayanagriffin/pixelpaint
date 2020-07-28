/*global BLOCK_SIZE, display, floor, rows, cols*/

let blocks = [];

class Block{
  constructor(row, col){
    this.row = row;
    this.col = col;
    this.size = BLOCK_SIZE;
    this.totalPixels = BLOCK_SIZE * BLOCK_SIZE;
    this.startingX = this.col * this.size;
    this.startingY = this.row * this.size;
    this.endingX = this.startingX + this.size;
    this.endingY = this.startingY + this.size;
    
    //this.originalColors = [];
    this.colorVals = {"R": 0, "G": 0, "B": 0}
    
  }
  
  getAverageColor(){
    for(let i = this.startingX; i < this.endingX; i++){
      for(let j = this.startingY; j < this.endingY; j++){
        //console.log(j, i); // row, col
        //this.originalColors.push(display.get(j, i));
        this.colorVals.R += display.get(j,i)[0];
        this.colorVals.G += display.get(j, i)[1];
        this.colorVals.B += display.get(j, i)[2];
      }
    }
    
    this.colorVals.R = floor(this.colorVals.R / this.totalPixels);
    this.colorVals.G = floor(this.colorVals.G / this.totalPixels);
    this.colorVals.B = floor(this.colorVals.B / this.totalPixels);

    return this.colorVals;
  }
  
  
}

class Picture{
  constructor(rows, cols, BLOCK_SIZE){
    this.blocks = [];
    this.numColors = 0;
    this.cushion = 100;
    this.rows = rows;
    this.cols = cols;
    this.size = BLOCK_SIZE;
  }
  
  getBlockArray(){
    for(let r = 0; r < this.rows; r++){
      let row = [];
      for(let c = 0; c < this.cols; c++){
        let block = new Block(c, r);
        
        row.push(block.getAverageColor());
      }
      this.blocks.push(row);
    }
    
    return this.blocks;
  }
  
  refactorBlockColors(){
    
  }
}