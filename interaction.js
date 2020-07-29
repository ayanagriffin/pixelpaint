/*global loadImage, createCanvas, ColorSquare, resizeCanvas, background, text, Picture, windowWidth, windowHeight, image, round, floor, rect, fill, strokeWeight, Block*/

//given the array, implement original functionality 
let colorSquares;

function initializeColorSquares(array){
  colorSquares = [];
  for(let r = 0; r < array.length; r++){
    let row = [];
    for(let c = 0; c < array[r].length; c++){
      row.push(new ColorSquare(c, r, array[r][c]));
    }
    
    colorSquares.push(row);
  }
  
  for(let i = 0; i < colorSquares.length; i++){
    for(let j = 0; j < colorSquares[i].length; j++){
      console.log(colorSquares[i][j].ra)
    }
  }
  //console.log(colorSquares);
}