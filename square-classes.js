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

/*
-------------------------- GUIDESQUARE CLASS ----------------------------

a GuideSquare represents the squares shown on the right side of the canvas. These are the color options for the user
to paint with, determined by the average color of each color value (this color is found in the Picture and Block classes)

1. displays each GuideSquare
2. checks if the  GuideSquare is clicked; if it is, the currentColor = the color of the GuideSquare

*/

class GuideSquare {
  constructor(x, y, color, val, w, h) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.val = val;
    this.width = w;
    this.height = h;
  }

  draw() {
    
    if(!paintingIsFinished){
      strokeWeight(2);
    }
    
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);

    // if the color of the GuideSquare is light, the text on top of it will be black; if dark, text will be white
    if (this.color[0] + this.color[1] + this.color[1] < 150) {
      fill(255);
    } else {
      fill(0);
    }

    if (!paintingIsFinished) {
      textSize(this.width / 4);
      text(this.val, this.x + this.width / 2, this.y + this.height / 2);
    }
  }

  checkClicked() {
    if (
      this.x + this.width > mouseX &&
      mouseX > this.x &&
      this.y + this.height > mouseY &&
      mouseY > this.y
    ) {
      currentColor = this.color;
    }
  }
}

/*global loadImage, stroke, mouseX, moves, mouseY, createCanvas, currentColor, paintingIsFinished, textSize, textAlign, CENTER, strokeWeight, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
