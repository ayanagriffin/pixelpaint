/* global addUserImage */

async function userUpload(event){
  let uploadURL = URL.createObjectURL(event.target.files[0]);
  console.log(uploadURL);
  addUserImage(uploadURL);
}

async function newImage(event){
  console.log("pressed");
}

async function restart(event){
  
}

async function finishImage(event){
  
}

async function undo(event){
  
}
