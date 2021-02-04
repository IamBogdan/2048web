

document.addEventListener('keydown', function(event) {
  let dir = 0;

  if(event.keyCode == 87 || event.keyCode == 38){
    console.log("UP!");
  }
  else if(event.keyCode == 83 || event.keyCode == 40){
    console.log("DOWN!");
  }
  else if(event.keyCode == 65 || event.keyCode == 37){
    console.log("LEFT!");
  }
  else if(event.keyCode == 68 || event.keyCode == 39){
    console.log("RIGHT!");
  }

});
