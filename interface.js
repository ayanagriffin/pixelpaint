/* These functions handle user interaction with the buttons, sliders, and the mouse */

let colorSquares,
  guideSquares,
  moves = [];

/* ------------------- MOUSE FUNCTIONS ---------------------*/

function mouseClicked() {
  if (!paintingIsFinished) {
    for (let r = 0; r < colorSquares.length; r++) {
      for (let c = 0; c < colorSquares[r].length; c++) {
        colorSquares[r][c].checkClicked();
      }
    }

    for (let i = 0; i < guideSquares.length; i++) {
      guideSquares[i].checkClicked();
    }
  }
}

function mouseDragged() {
  if (!paintingIsFinished) {
    for (let r = 0; r < colorSquares.length; r++) {
      for (let c = 0; c < colorSquares[r].length; c++) {
        colorSquares[r][c].checkClicked();
      }
    }
  }
}

/* ------------------- BUTTON FUNCTIONS ---------------------*/

function undo() {
  if (moves.length > 0) {
    let mostRecentMove = moves[moves.length - 1];
    let curSquare = colorSquares[mostRecentMove.row][mostRecentMove.col];

    if (curSquare.previousColors.length > 1) {
      curSquare.color =
        curSquare.previousColors[curSquare.previousColors.length - 2];
      curSquare.previousColors.splice(curSquare.previousColors.length - 1, 1);
      moves.splice(moves.length - 1, 1);
    }
  }

  paintingIsFinished = false;
}

function restart() {
  for (let r = 0; r < colorSquares.length; r++) {
    for (let c = 0; c < colorSquares[r].length; c++) {
      let originalColor = templateColors[colorSquares[r][c].val - 1];
      colorSquares[r][c].color = originalColor;
      colorSquares[r][c].previousColors = [originalColor];
    }
  }
  moves = [];
  paintingIsFinished = false;
}

function finishImage() {
  let prompts = ["Nice!", "Wow!", "Great!", "Cool!", "Yay!", "Neat!"];
  finishPrompt = random(prompts);
  paintingIsFinished = true;
}

// for now, I want to change the imgUrl and basically re-run/reload everything when the "new image" button is pressed
// this works, but i'm guessing there is a better way to do it than setTimeout

function newImage() {
  if (prevPics.length === defaultPics.length) {
    prevPics = [];
  }
  while (prevPics.includes(imgUrl)) {
    imgUrl = random(defaultPics);
  }
  display = loadImage(imgUrl);
  prevPics.push(imgUrl);

  setTimeout(function() {
    drawGrid(INITIAL_BLOCK_SIZE, INITIAL_CUSHION);
  }, 50);
}

/* ------------------- SLIDER FUNCTIONS ---------------------*/

function adjustBlockSize(newBlockSize, cushion) {
  drawGrid(newBlockSize, cushion);
}

function adjustCushion(newCushion, blockSize) {
  /* The "cushion" variable represents how close/far the RGB values of two colors can be to be
   considered the same color. The larger the cushion, the less colors there will be. 
   For UX purposes, it makes more sense for the slider to look as if it is representing the total number
   of colors -- sliding it to the right = more colors, sliding to left = less. This statement helps achieve
   this, while in reality, the cushion is changed directly, not the number of colors*/

  newCushion = INITIAL_CUSHION - newCushion;
  drawGrid(blockSize, newCushion);
}

/*global loadImage, drawGrid, INITIAL_CUSHION, INITIAL_BLOCK_SIZE, templateColors, prevPics, defaultPics, setTimeout, finishPrompt, random, rows, cushion, paintingIsFinished, currentColor, getDimensions, setPrompt, imgUrl, display, colorSquaresAreMade,imgDimensions, GuideSquare createCanvas, mouseX, mouseY, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
