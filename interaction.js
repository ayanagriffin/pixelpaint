/*global loadImage, currentColor, getDimensions, setPrompt, imgUrl, display, colorSquaresAreMade,imgDimensions, GuideSquare createCanvas, BLOCK_SIZE, mouseX, mouseY, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

let colorSquares, guideSquares, moves = [], paintingIsFinished = false;

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
        let curSquareInfo = {"row": curSquare.row,
                            "col": curSquare.col,
                            "color": curSquare.color}
        
        moves.push(curSquareInfo);
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
  //TODO: add undoFinish
   if(moves.length > 0){
    let mostRecentMove = moves[moves.length - 1];
    let curSquare = colorSquares[mostRecentMove.row][mostRecentMove.col];
    
    if(curSquare.previousColors.length > 1){
      curSquare.color = curSquare.previousColors[curSquare.previousColors.length - 2];
      curSquare.previousColors.splice(curSquare.previousColors.length - 1, 1);
      moves.splice(moves.length - 1, 1);
    }
  }
  
  paintingIsFinished = false;
}

function restart(){
  for(let r = 0; r < colorSquares.length; r++){
    for(let c = 0; c < colorSquares[r].length; c++){
      colorSquares[r][c].color = "white";
      colorSquares[r][c].previousColors = ["white"];
    }
  }
  moves = [];
  paintingIsFinished = false;
}

function finishImage(){
  setPrompt();
  paintingIsFinished = true;
}

function testNewImage(){
  
  
}