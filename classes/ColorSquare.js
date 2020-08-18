/*
-------------------------- COLORSQUARE CLASS ----------------------------

a ColorSquare represents a square drawn on to the canvas, which is initially white but is painted by the user. This class:

1. displays each ColorSquare
2. checks if the ColorSquare is clicked; if it is, the color will be changed to currentColor

*/

class ColorSquare {
  constructor(row, col, val, color, blockSize) {
    this.row = row;
    this.col = col;
    this.val = val;
    this.size = blockSize;
    if (color <= 255) {
      this.originalColor = [color, color, color];
    } else {
      this.originalColor = "white";
    }

    this.color = this.originalColor;

    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.previousColors = [this.color];
  }

  display() {
    if (!paintingIsFinished) {
      strokeWeight(2);
      fill(this.color);
      rect(this.x, this.y, this.size, this.size);

      fill(0);
      textSize(this.size / 2);
      textAlign(CENTER, CENTER);
      text(
        this.val,
        this.col * this.size + this.size / 2,
        this.row * this.size + this.size / 2
      );
    } else {
      strokeWeight(0);
      fill(this.color);
      rect(this.x, this.y, this.size, this.size);
    }
  }

  paint() {
    this.color = currentColor;
    this.display();
    this.previousColors.push(currentColor);
  }

  checkClicked() {
    if (
      this.color != currentColor &&
      this.x + this.size > mouseX &&
      mouseX > this.x &&
      this.y + this.size > mouseY &&
      mouseY > this.y
    ) {
      this.paint();
      let curSquareInfo = { row: this.row, col: this.col, color: this.color };

      moves.push(curSquareInfo);
    }
  }
}
/*global loadImage, stroke, mouseX, moves, mouseY, createCanvas, currentColor, paintingIsFinished, textSize, textAlign, CENTER, strokeWeight, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
