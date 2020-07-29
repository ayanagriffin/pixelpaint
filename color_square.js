/*global loadImage, createCanvas, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

class ColorSquare{
  constructor(row, col, val){
    this.row = row;
    this.col = col;
    this.val = val;
    
  }
  
  test(){
    console.log(this.row, this.col, this.val);
  }
}