/* global createCanvas, colorMode, HSB, background, CENTER, 
  random, width, height, fill, noStroke, textAlign, ellipse, text, mouseX, mouseY, 
  collideCircleCircle, splice, rect, strokeWeight, mouseClicked, RGB, createColorPicker, color, createButton,
  TWO_PI, beginShape, endShape, vertex, sin, cos, CLOSE, textSize*/

let squareSize,
  canvasWidth,
  canvasHeight,
  squares,
  picture,
  curPicture = 0,
  picArray,
  picture1,
  picture2,
  colorPicker,
  restartButton,
  colorPickerAndButtonsAreVisible = false,
  newPictureButton,
  moves,
  picture3,
  picture4,
  undoButton,
  starIsVisible = false;

function setup() {
  squares = [];
  moves = [];
  picture = choosePicture(curPicture);
  if (picture === picture3) {
    squareSize = 40;
  } else {
    squareSize = 60;
  }

  canvasHeight = picture.length * squareSize + squareSize;
  canvasWidth = picture[0].length * squareSize;
  createCanvas(canvasWidth, canvasHeight);

  drawButtonsAndColorPicker();

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

class Square {
  constructor(row, col, val) {
    this.row = row;
    this.col = col;
    this.x = row * squareSize;
    this.y = col * squareSize;
    this.val = val;
    this.color = "white";
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
    this.color = colorPicker.value();
  }
}

function mouseClicked() {
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

function choosePicture(curPicture) {
  // loop that increments to change to next picture

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
  

  picArray = [picture1, picture2, picture3, picture4];

  return picArray[curPicture];
}

function getNewPicture() {
  curPicture++;
  curPicture %= picArray.length;
  setup();
}

function undo() {
  if (moves.length > 0) {
    let curSquare = moves[moves.length - 1];
    curSquare.color = "white";
    moves.splice(moves.length - 1, 1);
  }
}

function checkCompletion() {
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
