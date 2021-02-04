
board = [ [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
         ];

// TODO: move this to a Game.restart part
function main() {
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
  setTimeout(function () {
    new Block([0,0],2);
    new Block([0,1],2);
    new Block([0,2],2);
    new Block([0,3],2);
    new Block([1,1],2);
    new Block([2,2],4);
    new Block([2,1],4);
    new Block([3,3],8);
  }, 500);

}
$(document).ready(main);
