// GOALS/TODO: debug to find out why the incorrect array is given for picture4 (the penguin)
//             refactor things in comments
//             load multiple images
//             allow the user to upload image

/* global createCanvas, colorMode, HSB, background, CENTER, 
  random, width, height, fill, noStroke, textAlign, ellipse, text, mouseX, mouseY, 
  collideCircleCircle, splice, rect, strokeWeight, mouseClicked, RGB, createColorPicker, color, createButton,
  TWO_PI, beginShape, endShape, vertex, sin, cos, CLOSE, textSize, loadImage, Picture, image*/

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
  moves,
  picture3,
  picture4,
  undoButton,
  img1,
  testPic1;

let curPicture = 0,
  test = 0,
  colorPickerAndButtonsAreVisible = false,
  starIsVisible = false;

function preload() {
  // need to preload image for it to function properly 
  img1 = new Picture(
    "https://cdn.glitch.com/c6a55a91-1fc8-414c-9c30-7b343a077157%2Fdownload.png?v=1595548272909"
  );
  testPic1 = loadImage(img1.imgLink);
}

function setup() {
  // dont need the picture to show, but functionality does not work without first placing the image somewhere
  image(testPic1, 0, 0, 300, 300);
  squares = [];
  moves = [];

  // only want to call getPicArray() once.. some issues if called more than once
  if (test === 0) {
    picture4 = getPicArray();
    console.log(picture4);
  }

  test++;

  picture = choosePicture(curPicture, picture4);

  // TODO: change later to refactor size of each square based on the size of the image, then the canvas size based off of the square size
  if (picture === picture3) {
    squareSize = 20;
  } else {
    squareSize = 20;
  }

  // canvasHeight = picture.length * squareSize + squareSize;
  // canvasWidth = picture[0].length * squareSize;
  // createCanvas(canvasWidth, canvasHeight);

  canvasHeight = 400;
  canvasWidth = 400;
  createCanvas(canvasWidth, canvasHeight);

  drawButtonsAndColorPicker();

  // initialize squares
  for (let i = 0; i < picture.length; i++) {
    for (let j = 0; j < picture[i].length; j++) {
      squares.push(new Square(j, i, picture[i][j]));
    }
  }
}

function draw() {
  background(240);
  checkCompletion();
  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
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

    // if the painting is complete, want to remove the black borders and the numbers so that the user can see their beautiful art!
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
  }
}

function mouseClicked() {
  // detects which Square the user clicked on to fill the appropriate one
  for (let i = 0; i < squares.length; i++) {
    let curSquare = squares[i];
    if (
      curSquare.x + squareSize > mouseX &&
      mouseX > curSquare.x &&
      (curSquare.y + squareSize > mouseY && mouseY > curSquare.y)
    ) {
      curSquare.paint();
      moves.push(curSquare);
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
  }

  colorPicker.position(width - 25, height - squareSize / 10);
  restartButton.position((width * 2) / 3, height - squareSize / 20);
  newPictureButton.position((width * 1) / 3, height - squareSize / 20);
  undoButton.position(squareSize, height - squareSize / 20);
}

function resetImage() {
  setup();
}

function choosePicture(curPicture, picture4) {
  //picture1 = [[1, 1], [1, 1]];

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

  return picArray[curPicture];
}

function getNewPicture() {
  // increments to change to next picture, will loop back around
  curPicture++;
  curPicture %= picArray.length;
  setup();
}

function undo() {
  // allows user to "undo" last move i.e. make the Square white again
  
  // TODO: it should not always go back to white. For example, if the user clicked the Square with one color, 
  //       then clicked the same Square with a different color right after, this function should go make the 
  //              Square the first color, not white
  
  if (moves.length > 0) {
    let curSquare = moves[moves.length - 1];
    curSquare.color = "white";
    moves.splice(moves.length - 1, 1);
  }
}

function checkCompletion() {
  // checks if all Squares are filled with a color other than white
  
  // TODO: edit this; the user may be finished even if their painting has white in it. 
  //     Could maybe add a button that the user can click when they are finished instead
  let total = 0;
  let target = picture.length * picture[0].length;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i].color != "white") {
      total++;
    }
  }

  if (total === target) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].numIsVisible = false;
      squares[i].bordersAreVisible = false;
    }
    starIsVisible = true;
  } else {
    for (let i = 0; i < squares.length; i++) {
      squares[i].numIsVisible = true;
      squares[i].bordersAreVisible = true;
    }
    starIsVisible = false;
  }
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

function getPicArray() {
  return img1.getFinalArray();
}
