/*global loadImage, createCanvas, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

//given the array, implement original functionality 
let colorSquares;

function initializeColorSquares(array){
  //console.log(array);
  colorSquares = [];
  for(let r = 0; r < array.length; r++){
    let currentRow = [];
    for(let c = 0; c < array[r].length; c++){
      //console.log(c, r, array[r][c])
      currentRow.push(new ColorSquare(c, r, array[r][c]));
    }
    
    colorSquares.push(currentRow);
    
  }
  
   //testingArray();
  
  
  //console.log(colorSquares);
}


function testingArray(){
  for(let i = 0; i < colorSquares.length; i++){
    for(let j = 0; j < colorSquares[i].length; j++){
      colorSquares[i][j].test();
    }
  }
}