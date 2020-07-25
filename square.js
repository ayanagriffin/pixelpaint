/*global strokeWeight, fill, rect, text, textAlign, textSize, CENTER,  */

// a Square is the initially white square with a color number. User can click a particular Square to change its color
class Square {
  constructor(row, col, val, squareSize, colorPicker) {
    this.row = row;
    this.col = col;
    this.squareSize = squareSize;
    this.x = row * this.squareSize;
    this.y = col * this.squareSize;
    this.val = val;
    this.color = "white";
    this.previousColors = ["white"];
    this.colorPicker = colorPicker;
    this.isFinished = false;
  }

  display() {
    // if the user is finished, the numbers and borders will not be shown 
    if (!this.isFinished) {
      strokeWeight(2);
      this.drawSquare();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(
        `${this.val}`,
        this.row * this.squareSize + this.squareSize / 2,
        this.col * this.squareSize + this.squareSize / 2
      );
    } else {
      strokeWeight(0);
      this.drawSquare();
    }
  }
  
  drawSquare(){
    fill(this.color);
    rect(this.x, this.y, this.squareSize, this.squareSize);
  }

  paint() {
    // fill the Square based on the color the user has picked
    this.color = this.colorPicker.value();
    this.previousColors.push(this.color);
  }
}
