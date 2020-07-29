/*global loadImage, colorSquaresAreMade, createCanvas, BLOCK_SIZE, mouseX, mouseY, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

//given the array, implement original functionality 
let colorSquares;

function initializeColorSquares(array){
  //console.log(array);
  colorSquares = [];
  for(let r = 0; r < array.length; r++){
    let currentRow = [];
    for(let c = 0; c < array[r].length; c++){
      //console.log(c, r, array[r][c])
      currentRow.push(new ColorSquare(r, c, array[r][c]));
    }
    
    colorSquares.push(currentRow);
    
  }
  
  colorSquaresAreMade = true;
  
   //testingArray();
  
  
 // console.log(colorSquares);
}


function drawColorSquares(){
  
  for(let i = 0; i < colorSquares.length; i++){
    
    for(let j = 0; j < colorSquares[i].length; j++){
      colorSquares[i][j].display();
      
      //console.log(colorSquares[i][j].val)
    }
    
  }
  
 
}

function checkColorSquareClicked(){
  for(let r = 0; r < colorSquares.length; r ++){
    for(let c = 0; c < colorSquares[r].length; c++){
      let curSquare = colorSquares[r][c];
      if(curSquare.x + BLOCK_SIZE > mouseX && mouseX > curSquare.x && curSquare.y + BLOCK_SIZE > mouseY && mouseY > curSquare.y){
        curSquare.paint();
      }
    }
  }
}