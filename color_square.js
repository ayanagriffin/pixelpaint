/*global loadImage, createCanvas, strokeWeight, BLOCK_SIZE, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

class ColorSquare{
  constructor(row, col, val){
    this.row = row;
    this.col = col;
    this.val = val;
    this.size = BLOCK_SIZE;
    this.color = "white";
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    
  }
  
  test(){
    console.log(this.row, this.col, this.val);
  }
  
  display(){
    
    strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    //console.log(this.x, this.y);
    
  }
}