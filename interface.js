/* These functions handle user interaction with the buttons and sliders */


let colorSquares, guideSquares, moves = [];

function undo(){
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
  let prompts = ["Nice!", "Wow!", "Great!", "Cool!", "Yay!", "Neat!"];
  finishPrompt = random(prompts);
  paintingIsFinished = true;
}


function adjustBlockSize(newBlockSize){
  // functions as expected if I manually put in the number, as shown below
  blockSize = 30;
  console.log("new size: " + newBlockSize)
  // does not function as expected if I try to do this:
 // blockSize = newBlockSize;
  setup();
}

function adjustCushion(newCushion){
  /* The "cushion" variable represents how close/far the RGB values of two colors can be to be
   considered the same color. The larger the cushion, the less colors there will be. 
   For UX purposes, it makes more sense for the slider to look as if it is representing the total number
   of colors -- sliding it to the right = more colors, sliding to left = less. This statement helps achieve
   this, while in reality, the cushion is changed directly, not the number of colors*/
  
  cushion = 70 - newCushion;
  setup();
}

// for now, I want to change the imgUrl and basically re-run/reload everything when the "new image" button is pressed
// this works, but i'm guessing there is a better way to do it than setTimeout

function newImage(){
  
  if(prevPics.length === defaultPics.length){
    prevPics = [];
  }
  while(prevPics.includes(imgUrl)){
    imgUrl = random(defaultPics);
  }
  display = loadImage(imgUrl);
  prevPics.push(imgUrl);
  setTimeout(setup, 3000);
}


/*global loadImage, prevPics, defaultPics, setTimeout, finishPrompt, random, rows, cushion, paintingIsFinished, currentColor, getDimensions, setPrompt, imgUrl, display, colorSquaresAreMade,imgDimensions, GuideSquare createCanvas,blockSize, mouseX, mouseY, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/
