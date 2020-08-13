/*
-------------------------- COLORSQUARE CLASS ----------------------------

a ColorSquare represents a square drawn on to the canvas, which is initially white but is painted by the user. This class:

1. displays each ColorSquare
2. checks if the ColorSquare is clicked; if it is, the color will be changed to currentColor

*/

class ColorSquare {
  constructor(row, col, val, color) {
    this.row = row;
    this.col = col;
    this.val = val;
    this.size = blockSize;
    if(color <= 255){
      this.originalColor = [color, color, color];
    }else{
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
      textSize(blockSize / 2);
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
      this.x + blockSize > mouseX &&
      mouseX > this.x &&
      this.y + blockSize > mouseY &&
      mouseY > this.y
    ) {
      this.paint();
      let curSquareInfo = { row: this.row, col: this.col, color: this.color };

      moves.push(curSquareInfo);
    }
  }
}

/*
-------------------------- GUIDESQUARE CLASS ----------------------------

a GuideSquare represents the squares shown on the right side of the canvas. These are the color options for the user
to paint with, determined by the average color of each color value (this color is found in the Picture and Block classes)

1. displays each GuideSquare
2. checks if the  GuideSquare is clicked; if it is, the currentColor = the color of the GuideSquare

*/

class GuideSquare {
  constructor(x, color, val) {
    this.x = x;
    this.y = 0;
    this.color = color;
    this.val = val;
  }

  draw(y) {
    this.y = y;
    strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, blockSize * 2, guideSquareHeight);

    if (this.color[0] + this.color[1] + this.color[1] < 150) {
      fill(255);
    } else {
      fill(0);
    }

    textSize(blockSize / 2);
    text(this.val, this.x + blockSize, this.y + guideSquareHeight / 2);
  }

  checkClicked() {
    if (
      this.x + blockSize * 2 > mouseX &&
      mouseX > this.x &&
      this.y + guideSquareHeight > mouseY &&
      mouseY > this.y
    ) {
      currentColor = this.color;
    }
  }
}

/*global loadImage, stroke, guideSquareHeight, mouseX, moves, mouseY, createCanvas, currentColor, paintingIsFinished, textSize, textAlign, CENTER, strokeWeight, blockSize, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
