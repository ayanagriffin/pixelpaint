/* Overall concept: An app where the user can either upload their own image or use a pre-drawn image. The image is refactored to 
      create a "blank canvas" of "pixels" (squares). The user can then fill in each pixel of the image 
          and play around with colors to discover their image.


 GOALS/TODO: 
             refactor things in comments
             load multiple images
             allow the user to upload image
             */

/* global createCanvas, colorMode, HSB, background, CENTER, 
  random, width, height, fill, noStroke, textAlign, ellipse, text, mouseX, mouseY, 
  collideCircleCircle, splice, rect, strokeWeight, mouseClicked, RGB, createColorPicker, color, createButton,
  TWO_PI, beginShape, endShape, vertex, sin, cos, CLOSE, textSize, loadImage, Picture, image, windowWidth, windowHeight*/

let squareSize,
  canvasWidth,
  canvasHeight,
  squares,
  picture,
  picArray,
  picture1,
  picture2,
  colorPicker,
  restartButton,
  newPictureButton,
  finishedButton,
  moves,
  picture3,
  picture4,
  undoButton,
  img1,
  testPic1;

let curPictureNum = 0,
  test = 0,
  colorPickerAndButtonsAreVisible = false,
  starIsVisible = false,
  imgLoaded = false;

function preload() {
  // need to preload image for it to function properly
  img1 = new Picture(
    "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909"
  );
  testPic1 = loadImage(img1.imgLink);
}

function setup() {
  // dont need the picture to show, but functionality does not work without first placing the image somewhere

  canvasHeight = 600;
  canvasWidth = 600;
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  image(testPic1, 0, 0, 600, 600);

  squares = [];
  moves = [];

  // only want to call getPicArray() once.. some issues if called more than once.
  if (!imgLoaded) {
    picture4 = img1.getFinalArray();
    console.log(picture4);
    imgLoaded = true;
  }

  picture = choosePicture(curPictureNum, picture4);
  squareSize = (windowHeight * 0.75) / picture.length;
  drawButtonsAndColorPicker();
  initializeSquares();
}

function draw() {
  background(240);

  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      squares[i][j].display();
    }
  }
  drawStar();
}

// a Square is the initially white square with a color number. User can click a particular Square to change its color
class Square {
  constructor(row, col, val) {
    this.row = row;
    this.col = col;
    this.x = row * squareSize;
    this.y = col * squareSize;
    this.val = val;
    this.color = "white";
    this.previousColors = ["white"];

    // if the painting is complete, want to remove the black borders and the numbers so that the user can see their art
    this.numIsVisible = true;
    this.bordersAreVisible = true;
  }

  display() {
    if (this.bordersAreVisible) {
      strokeWeight(2);
    } else {
      strokeWeight(0);
    }
    //strokeWeight(2);
    fill(this.color);
    rect(this.x, this.y, squareSize, squareSize);

    if (this.numIsVisible) {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(
        `${this.val}`,
        this.row * squareSize + squareSize / 2,
        this.col * squareSize + squareSize / 2
      );
    }
  }

  paint() {
    // fill the Square based on the color the user has picked
    this.color = colorPicker.value();
    this.previousColors.push(this.color);
  }
}

function mouseClicked() {
  // detects which Square the user clicked on to fill the appropriate one
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      let curSquare = squares[i][j];
      if (
        curSquare.x + squareSize > mouseX &&
        mouseX > curSquare.x &&
        (curSquare.y + squareSize > mouseY && mouseY > curSquare.y)
      ) {
        curSquare.paint();
        let curSquareInfo = {
          row: curSquare.row,
          col: curSquare.col,
          color: curSquare.color
        };
        moves.push(curSquareInfo);
       // console.log(moves); // paint moves instead of squares?
      }
    }
  }
}

function drawButtonsAndColorPicker() {
  if (!colorPickerAndButtonsAreVisible) {
    colorPicker = createColorPicker();
    colorPickerAndButtonsAreVisible = true;

    restartButton = createButton("Restart");
    restartButton.mousePressed(resetImage);

    newPictureButton = createButton("New Image");
    newPictureButton.mousePressed(getNewPicture);

    undoButton = createButton("Undo");
    undoButton.mousePressed(undo);

    finishedButton = createButton("I'm done!");
    finishedButton.mousePressed(finishPainting);
  }

  undoButton.position((width * 1) / 10, height);
  newPictureButton.position((width * 3) / 10, height);
  restartButton.position((width * 5) / 10, height);
  finishedButton.position((width * 7) / 10, height);
  colorPicker.position((width * 9) / 10, height * 0.995);
}

function resetImage() {
  setup();
}

function finishPainting() {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length[i]; j++) {
      squares[i][j].numIsVisible = false;
      squares[i][j].bordersAreVisible = false;
    }
  }
  starIsVisible = true;
}
function choosePicture(curPictureNum, picture4) {
  // i made these by hand oof

  // heart, length = 9
  picture1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1, 2, 2, 1, 1],
    [1, 2, 3, 3, 2, 2, 3, 3, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
    [1, 1, 1, 2, 3, 3, 2, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  // another heart i think, length = 10
  picture2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1],
    [1, 2, 3, 3, 2, 1, 2, 3, 3, 2, 1],
    [1, 2, 3, 3, 3, 2, 3, 3, 3, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1],
    [1, 1, 2, 3, 3, 3, 3, 3, 2, 1, 1],
    [1, 1, 1, 2, 3, 3, 3, 2, 1, 1, 1],
    [1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  // emoji; length = 18
  picture3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 3, 3, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 3, 2, 2, 1],
    [1, 2, 2, 2, 4, 4, 4, 2, 2, 3, 3, 4, 3, 3, 2, 2, 1],
    [1, 2, 2, 4, 2, 2, 2, 4, 2, 2, 3, 3, 3, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 1],
    [1, 1, 2, 2, 4, 4, 5, 5, 4, 5, 5, 4, 4, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 4, 5, 5, 5, 5, 5, 4, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 2, 5, 5, 5, 5, 5, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 5, 5, 5, 5, 5, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  //picture4 = img1.getFinalArray(); did not work, needed to set picture4 in setup()
  picArray = [picture1, picture2, picture3, picture4];

  return picArray[curPictureNum];
}

function getNewPicture() {
  // increments to change to next picture, will loop back around
  curPictureNum++;
  curPictureNum %= picArray.length;
  setup();
}



function drawStar() {
  // a bunch of math that i did not come up with to draw a star if the user is finished. Yay!
  if (starIsVisible) {
    let starSize = height / 20;
    let angle = TWO_PI / 5;
    let halfAngle = angle / 2;
    let xBuffer = width * 0.85;
    let yBuffer = height * 0.15;
    fill("gold");
    beginShape();
    for (let i = 0; i < TWO_PI; i += angle) {
      let x = xBuffer + cos(i) * starSize;
      let y = yBuffer + sin(i) * starSize;
      vertex(x, y);
      x = xBuffer + cos(i + halfAngle) * ((starSize * 7) / 3);
      y = yBuffer + sin(i + halfAngle) * ((starSize * 7) / 3);
      vertex(x, y);
    }

    endShape(CLOSE);
    fill("black");
    textSize(height / 25);
    textAlign(CENTER, CENTER);
    text("Nice!", xBuffer, yBuffer);
  }
}

function initializeSquares() {
  for (let i = 0; i < picture.length; i++) {
    let row = [];
    for (let j = 0; j < picture[i].length; j++) {
      row.push(new Square(j, i, picture[i][j]));
    }

    squares.push(row);
  }
}

function undo() {
  // allows user to "undo" last move i.e. make the Square the previous color
  // separate array for all previous colors of the specific square -- access array, get previous color and splice the last one

  // if (moves.length > 0) {
  //   let curMove = moves[moves.length - 1];
  //   let curSquare = squares[curMove.col][curMove.row];
  //   if (moves.length > 1) {
  //     let prevMove = moves[moves.length - 2];
  //     let prevSquare = squares[prevMove.col][prevMove.row];
  //     if (prevMove.row == curMove.row && prevMove.col == curMove.col) {
  //       console.log("match: ", prevSquare.color);
  //       prevSquare.color = prevMove.color;
  //       console.log("change: ", prevSquare.color);
  //     }
  //   }else{
  //     curSquare.color = "white";
  //   }
  // }
  
  if(moves.length > 0){
    let mostRecentMove = moves[moves.length - 1];
    let curSquare = squares[mostRecentMove.col][mostRecentMove.row];
    
    if(curSquare.previousColors.length > 1){
      curSquare.color = curSquare.previousColors[curSquare.previousColors.length - 2];
      curSquare.previousColors.splice()
    }
  }
  
  
  undoFinish();
  
  
}

function undoFinish(){
  
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j].numIsVisible && !squares[i][j].bordersAreVisible) {
        squares[i][j].numIsVisible = true;
        squares[i][j].bordersAreVisible = true;
      }
    }
  }
  starIsVisible = false;
  
}