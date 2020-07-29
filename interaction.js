/*global loadImage, currentColor, colorSquaresAreMade,imgDimensions, GuideSquare createCanvas, BLOCK_SIZE, mouseX, mouseY, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

//given the array, implement original functionality
let colorSquares, guideSquares;

function initializeColorSquares(array) {
  //console.log(array);
  colorSquares = [];
  for (let r = 0; r < array.length; r++) {
    let currentRow = [];
    for (let c = 0; c < array[r].length; c++) {
      //console.log(c, r, array[r][c])
      currentRow.push(new ColorSquare(r, c, array[r][c]));
    }

    colorSquares.push(currentRow);
  }

  colorSquaresAreMade = true;


}

function initializeGuideSquares(avgColors) {
  guideSquares = [];
  for (let i = 0; i < avgColors.length; i++) {
    let x = imgDimensions.w;
    let y = i * 2 * BLOCK_SIZE;
    let size = 2 * BLOCK_SIZE;
    let val = i + 1;
    let color = avgColors[i];
    guideSquares.push(new GuideSquare(x, y, size, color, val));
  }
}

function drawColorSquares() {
  for (let i = 0; i < colorSquares.length; i++) {
    for (let j = 0; j < colorSquares[i].length; j++) {
      colorSquares[i][j].display();

      //console.log(colorSquares[i][j].val)
    }
  }
}

function drawGuideSquares() {
  for (let i = 0; i < guideSquares.length; i++) {
    guideSquares[i].draw();
  }
}

function checkColorSquareClicked() {
  for (let r = 0; r < colorSquares.length; r++) {
    for (let c = 0; c < colorSquares[r].length; c++) {
      let curSquare = colorSquares[r][c];
      if (
        curSquare.x + BLOCK_SIZE > mouseX &&
        mouseX > curSquare.x &&
        curSquare.y + BLOCK_SIZE > mouseY &&
        mouseY > curSquare.y
      ) {
        curSquare.paint();
      }
    }
  }
}

function checkGuideSquareClicked() {
  for (let i = 0; i < guideSquares.length; i++) {
    let curSquare = guideSquares[i];
    if (
      curSquare.x + curSquare.size > mouseX &&
      mouseX > curSquare.x &&
      curSquare.y + curSquare.size > mouseY &&
      mouseY > curSquare.y
    ) {
      currentColor = curSquare.color;
    }
  }
}


function undo(){
  
}

function restart(){
  for(let r = 0; r < colorSquares.length; r++){
    for(let c = 0; c < colorSquares[r].length; c++){
      colorSquares[r][c].color = "white";
      colorSquares[r][c].previousColors = ["white"];
    }
  }
  
}

function finishImage(){
  
}