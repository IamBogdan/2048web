let display = {
  /**
  * used for render display of game state and UI
  */
  ANIMATION_TIME: 500,
  DEFAULT_BLOCK_SIZE: 120,
  DEFAULT_BLOCK_GAP: 8,
  block: {
    size: 120,
    gap: 8,
    generateColor: function (value) {
      /**
      * generate a color for Block using a value
      * @param {int} value of current block
      * @return {string} color in a rgb() format
      */
      return `rgb(${value*50%250}, ${value*100%250}, ${value*90%250})`;
    },
    spawn: function (id, position, value) {
      /**
      * render spawn of block
      * @param id - id of HTML DOM of Block
      * @param {[x, y]} position - coords of the block
      * @param value - value of the block
      */
      $("#mainBlocks").append(`<div id="${id}" class="cube red absolute">${value}</div>`);
      $(`#${id}`).css({
        left: (display.block.size + display.block.gap) * position.x,
        top: (display.block.size + display.block.gap) * position.y,
        background: display.block.generateColor(value)});
    },
    move: function (id, to, value) {
      /**
      * render a moving block on a board
      */
      $(`#${id}`).css({
        left: (display.block.size + display.block.gap) * to.x,
        top: (display.block.size + display.block.gap) * to.y,
        background: display.block.generateColor(value)});
      $(`#${id}`).html(value);
    },
    destroy: function (id) {
      /**
      * render a dispawn of block
      * @param {string} id html id param
      */
      $(`#${id}`).prop('id', `${id}rm`);
      $(`#${id}rm`).addClass('remove');
      setTimeout(function () {
          $(`#${id}rm`).remove();
          //console.log(`#${id}rm was deleted`);
      }, display.ANIMATION_TIME);
    },
  },
  grid: {
    x: 4,
    y: 4,
  },

  popup: {
    show: function () {
          $(".ui-overlay").stop(true, true);
          $(".ui-overlay").fadeIn(500);
    },
    hide: function () {
          $(".ui-overlay").stop(true, true);
          $(".ui-overlay").fadeOut(500);
    },
  },

  score: {
    update: function (score) {
      if($("#score").html() != score){
        $("#score").stop(true, true);
        $("#score").fadeOut(150);
        setTimeout(function () {
          $("#score").html(score);
        }, 150);
        $("#score").fadeIn(50);
      }
      $("#score-text").html(`Your score: ${score}`);
    },
    added: function (scoreToAdd) {
      if(scoreToAdd != 0){
        $('.socreval').remove();
        $(".score-scope").append(`<div class="socreval">+${scoreToAdd}</div>`);
      }
    }
  }
}

function rebuildBoard() {
  let _board = g_board.getBoard();
  let rows = g_board.getRows();
  let cols = g_board.getCols();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if(_board[y][x] != 0){
        let it = _board[y][x];
        display.block.move(it.id, it.position, it.value);
      }
    }
  }
}

function onResize() {
  calc = (display.DEFAULT_BLOCK_SIZE * display.grid.x + display.DEFAULT_BLOCK_GAP * display.grid.x);
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;

  if(calc >= winWidth || calc >= winHeight /*- 80*/){
    display.block.size = 67;
  }
  else if(calc < winWidth || calc < winHeight){
    display.block.size = 120;
  }
  rebuildBoard();

  console.log("display block size:", display.block.size);
}

$(window).on('resize', onResize);
$(window).on('load', onResize);
