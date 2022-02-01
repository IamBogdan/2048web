
var g_game = new Game(); //create new instance of a Game;
var g_board = new Board(4, 4);
var g_prev_score = 0;


document.addEventListener("DOMContentLoaded", main);


function main(){

  let data = getData("board_data");
  let score = getData("game_score");
  if(data !== null && score !== null){
    g_board.setBoardData(data);
    g_game.setScore(score);
  }
  else{
    setTimeout(function () {
      generateBlocks(2);
    }, display.ANIMATION_TIME);
  }
  
  let reset_rate = 0;
  $("#reset-btn").on("click", function(){
    resetGame();
    if(reset_rate++ >= 3){
      $("#reset-btn").addClass("wiggle") 
    } 
    setTimeout(function(){ 
      reset_rate = 0;
      $("#reset-btn").removeClass("wiggle"); 
    }, 1000);
  });

  $("#reset-btn-overlay").on("click", function(){
    resetGame();
    display.popup.hide();
  });

  //KeyEvents
  document.addEventListener("keydown", function(event){
    if(event.code == "KeyW" || event.code == "ArrowUp")
      g_game.doGameMove("UP", g_board);
    else if(event.code == "KeyS" || event.code == "ArrowDown")
      g_game.doGameMove("DOWN", g_board);
    else if(event.code == "KeyA" || event.code == "ArrowLeft")
      g_game.doGameMove("LEFT", g_board);
    else if(event.code == "KeyD" || event.code == "ArrowRight")
      g_game.doGameMove("RIGHT", g_board);

    if(g_game.popIsMove()){
      gameAction();
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
    if(!xDown || !yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    
    if(Math.abs(xDiff) > Math.abs(yDiff)){
      if(xDiff > 0)
        g_game.doGameMove("LEFT", g_board);
      else
        g_game.doGameMove("RIGHT", g_board);
    }
    else{
      if(yDiff > 0){
        g_game.doGameMove("UP", g_board);
      } 
      else{
        g_game.doGameMove("DOWN", g_board);
      }
    }
    
    if(g_game.popIsMove()){
      gameAction();
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
  for(let i = 0; i < number; i++){
    g_board.createBlock(g_game.generatePosition(g_board), g_game.generateValue());
    console.log("created the block");
  }
  
  saveData("board_data", g_board.getBoardData());
  saveData("game_score", g_game.getScore());
}

function gameAction(){
    /**
    * actions after every move goes here
    */
    generateBlocks(1);

    display.score.added(g_game.getScore() - g_prev_score);
    display.score.update(g_game.getScore());

    g_prev_score = g_game.getScore();
    if(g_game.checkGameOver(g_board)){
      display.popup.show();
    }
}

function resetGame(){
  g_board.resetBoard();
  g_game.resetScore();
  g_prev_score = 0;
  display.score.update(g_game.getScore());
  generateBlocks(2); //generate 2 blocks on restart
}


function setItem(key, value) {
  try {
    return window.localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

function getItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}

function saveData(key, value){
  try {
    setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

function getData(key){
  try {
    return JSON.parse(getItem(key));
  } catch (e) {
    console.error(e);
  }
}
