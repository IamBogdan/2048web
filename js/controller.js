board = [ [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0] ];


document.addEventListener("DOMContentLoaded", main);

let prevScore = 0;
function main() {
  // TODO: move this to a Game.restart part
  game = new Game(); //create new instance of a Game;
  setTimeout(function () {
    generateBlocks(2);
  }, 500);

  let reset_rate = 0;

  $("#reset-btn").on('click', function () {
    resetGame(game);
    reset_rate++; if(reset_rate >= 3){ $("#reset-btn").addClass("wiggle") } setTimeout(function () { reset_rate = 0; $("#reset-btn").removeClass("wiggle"); }, 1000);
  });

  $("#reset-btn-overlay").on('click', function () {
    resetGame(game);
    Display.hidePopUp();
  });

  //KeyEvents
  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87 || event.keyCode == 38){
      game.doGameMove("UP");
      if(game.is_move)
        gameAction(game);
    }
    else if(event.keyCode == 83 || event.keyCode == 40){
      game.doGameMove("DOWN");
      if(game.is_move)
        gameAction(game);
    }
    else if(event.keyCode == 65 || event.keyCode == 37){
      game.doGameMove("LEFT");
      if(game.is_move)
        gameAction(game);
    }
    else if(event.keyCode == 68 || event.keyCode == 39){
      game.doGameMove("RIGHT");
      if(game.is_move)
        gameAction(game);
    }

  });

  //Swipe events
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  let xDown = null;
  let yDown = null;
  function getTouches(evt) {
    return evt.touches ||
           evt.originalEvent.touches;
  }
  function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
  };
  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
              game.doGameMove("LEFT");
              if(game.is_move)
                gameAction(game);
          }else{
            game.doGameMove("RIGHT");
            if(game.is_move)
              gameAction(game);
          }
      } else {
          if ( yDiff > 0 ) {
              game.doGameMove("UP");
              if(game.is_move)
                gameAction(game);
          } else {
              game.doGameMove("DOWN");
              if(game.is_move)
                gameAction(game);
          }
      }
      /* reset values */
      xDown = null;
      yDown = null;
  };

}

function generateBlocks(number = 2){
  /**
  * generate a number of blocks on a random positions
  * @param {int} number - number of blocks
  */
  for (var i = 0; i < number; i++) {
    new Block(game.generatePosition(), game.generateValue());
  }
}

function gameAction(game){
    /**
    * actions after every move goes here
    */
    generateBlocks(1);

    Display.scoreAdd(game.score - prevScore);

    Display.score(game.score);
    prevScore = game.score;
    if(game.checkGameOver()){
      Display.showPopUp();
    }
}

function resetGame(game) {
    game.resetGame();
    generateBlocks(2); //generate 2 blocks on restart
    prevScore = 0;
    Display.score(game.score);
}
