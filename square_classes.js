/*global loadImage, stroke, mouseX, moves, mouseY, createCanvas, currentColor, paintingIsFinished, textSize, textAlign, CENTER, strokeWeight, blockSize, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

class ColorSquare {
  constructor(row, col, val) {
    this.row = row;
    this.col = col;
    this.val = val;
    this.size = blockSize;
    this.color = "white";
    this.x = this.col * this.size;
    this.y = this.row * this.size;
    this.previousColors = ["white"];
  }

  display() {
    if (!paintingIsFinished) {
      //stroke();
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
    }else{
      strokeWeight(0);
      fill(this.color);
      rect(this.x, this.y, this.size, this.size);
    }

    //console.log(this.x, this.y);
  }

  paint() {
    this.color = currentColor;
    this.display();
    this.previousColors.push(currentColor);
  }
  
  checkClicked(){
    if (
        this.x + blockSize > mouseX &&
        mouseX > this.x &&
        this.y + blockSize > mouseY &&
        mouseY > this.y
      ) {
        this.paint();
        let curSquareInfo = {"row": this.row,
                            "col": this.col,
                            "color": this.color}
        
        moves.push(curSquareInfo);
      }
  }
}

class GuideSquare {
  constructor(x, y, size, color, val) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.val = val;
  }

  draw() {
    strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);

    if (this.color[0] + this.color[1] + this.color[1] < 150) {
      fill(255);
    } else {
      fill(0);
    }

    textSize(blockSize / 2);
    text(this.val, this.x + this.size / 2, this.y + this.size / 2);
  }
  
  checkClicked(){
    if (
      this.x + this.size > mouseX &&
      mouseX > this.x &&
      this.y + this.size > mouseY &&
      mouseY > this.y
    ) {
      currentColor = this.color;
    }
  }
}
