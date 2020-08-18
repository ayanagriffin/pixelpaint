/* These functions handle user interaction with the buttons, sliders, and the mouse */


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
  drawGrid(INITIAL_BLOCK_SIZE, INITIAL_CUSHION, windowWidth * 3 / 4, windowHeight * 3 / 4);
}

function finishImage() {
  let prompts = ["Nice!", "Wow!", "Great!", "Cool!", "Yay!", "Neat!"];
  finishPrompt = random(prompts);
  paintingIsFinished = true;
}

function newImage(blockSize, cushion) {
  // for now, I want to change the imgUrl and basically re-run/reload everything when the "new image" button is pressed
  // this works, but i'm guessing there is a better way to do it than setTimeout

  // if (prevPics.length === defaultPics.length) {
  //   prevPics = [];
  // }
  // while (prevPics.includes(imgUrl)) {
  //   imgUrl = random(defaultPics);
  // }
  
  
  setNewImage(random(defaultPics));
}

function userUpload(event){
  let uploadUrl = URL.createObjectURL(event.target.files[0]);
  setNewImage(uploadUrl);
}

function setNewImage(url){
  imgUrl = url;
  display = loadImage(imgUrl);
  prevPics.push(imgUrl);
  document.getElementById("blockSizeSlider").value = INITIAL_BLOCK_SIZE;
  document.getElementById("cushionSlider").value = 0;
  setTimeout(function() {
    drawGrid(INITIAL_BLOCK_SIZE, INITIAL_CUSHION, windowWidth * 3 / 4, windowHeight * 3 / 4);
  }, 50);
}
/* ------------------- SLIDER FUNCTIONS ---------------------*/


function adjust(blockSize, cushion){
   /* The "cushion" variable represents how close/far the RGB values of two colors can be to be
   considered the same color. The larger the cushion, the less colors there will be. 
   For UX purposes, it makes more sense for the slider to look as if it is representing the total number
   of colors -- sliding it to the right = more colors, sliding to left = less. This statement helps achieve
   this, while in reality, the cushion is changed directly, not the number of colors*/

  cushion = INITIAL_CUSHION - cushion;
  drawGrid(blockSize, cushion, windowWidth * 3 / 4, windowHeight * 3 / 4);
  
}


/*global loadImage, drawGrid, INITIAL_CUSHION, INITIAL_BLOCK_SIZE, templateColors, prevPics, defaultPics, setTimeout, finishPrompt, random, rows, cushion, paintingIsFinished, 
currentColor, getDimensions, setPrompt, imgUrl, display, colorSquaresAreMade,imgDimensions, GuideSquare createCanvas, mouseX, mouseY, ColorSquare, resize,
background, text, Picture, getTemplateColors, colorSquares, guideSquares, moves, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
