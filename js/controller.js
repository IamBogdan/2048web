board = [ [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0] ];

$(document).ready(main);
function main() {
  // TODO: move this to a Game.restart part
  game = new Game(); //create new instance of a game;

  setTimeout(function () {
    new Block(game.generatePosition(), game.generateValue());
    new Block(game.generatePosition(), game.generateValue());
  }, 500);

  let reset_rate = 0;
  $("#reset-btn").on('click', function () {
    game.resetGame();

    new Block(game.generatePosition(), game.generateValue());
    new Block(game.generatePosition(), game.generateValue());

    reset_rate++;
    if(reset_rate >= 3){ $("#reset-btn").addClass("wiggle") }
    setTimeout(function () { reset_rate = 0; $("#reset-btn").removeClass("wiggle"); }, 1000);

  });

  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87 || event.keyCode == 38){
      game.doGameMove("UP");
      if(game.is_move){
        new Block(game.generatePosition(), game.generateValue());
      }
    }
    else if(event.keyCode == 83 || event.keyCode == 40){
      game.doGameMove("DOWN");
      if(game.is_move){
        new Block(game.generatePosition(), game.generateValue());
      }
    }
    else if(event.keyCode == 65 || event.keyCode == 37){
      game.doGameMove("LEFT");
      if(game.is_move){
        new Block(game.generatePosition(), game.generateValue());
      }
    }
    else if(event.keyCode == 68 || event.keyCode == 39){
      game.doGameMove("RIGHT");
      if(game.is_move){
        new Block(game.generatePosition(), game.generateValue());
      }
    }
    console.log(game.score);
    console.log(board);
  });

}
