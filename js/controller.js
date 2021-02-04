
// TODO: make board a public variable of a Game class
// TODO: make all int instances into a Block class
board = [ [32,2,4,8],
          [0,32,2,16],
          [0,0,4,0],
          [16,0,0,8] ]; //reference for test

// TODO: move this to a Game.restart part
game = new Game(); //create new instance of a game;

document.addEventListener('keydown', function(event) {
  if(event.keyCode == 87 || event.keyCode == 38){
    game.doGameMove("UP");
  }
  else if(event.keyCode == 83 || event.keyCode == 40){
    game.doGameMove("DOWN");
  }
  else if(event.keyCode == 65 || event.keyCode == 37){
    game.doGameMove("LEFT");
  }
  else if(event.keyCode == 68 || event.keyCode == 39){
    game.doGameMove("RIGHT");
  }
  console.log(board);
});
