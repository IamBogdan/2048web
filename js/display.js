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
        top: (display.block.size + display.block.gap) * position.x,
        left: (display.block.size + display.block.gap) * position.y,
        background: display.block.generateColor(value)});
    },
    move: function (id, to, value) {
      /**
      * render a moving block on a board
      */
      $(`#${id}`).css({
        top: (display.block.size + display.block.gap) * to.x,
        left: (display.block.size + display.block.gap) * to.y,
        background: display.block.generateColor(value)});
      $(`#${id}`).html(value);
    },
    destroy: function (id) {
      /**
      * render a dispawn of block
      * @param {string} id html id param
      */
      $(`#${id}`).addClass('remove');
      setTimeout(function () {
          $(`#${id}`).remove();
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
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      if(board[y][x] != 0){
        it = board[y][x];
        display.block.move(it.id, it.position, it.value);
      }
    }
  }
}

function onResize() {
  const p = new Promise(function (resolve, reject) {
    calc = (display.DEFAULT_BLOCK_SIZE * display.grid.x + display.DEFAULT_BLOCK_GAP * display.grid.x + 40);
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    resolve();
  });
  p.then(() => {
    if(calc >= winWidth || calc >= winHeight-80){
      display.block.size = 67
      rebuildBoard()
    }else if(calc < winWidth || calc < winHeight){
      display.block.size = 120
      rebuildBoard()
    }
  });
  console.log(display.block.size);
}

$(window).on('resize', onResize);
$(window).on('load', onResize);
