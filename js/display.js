let display = {
  /**
  * used for render display of game state and UI
  */
  "ANIMATION_TIME" : 500,
  "block" : {
    "generateColor" : function (value) {
      /**
      * generate a color for Block using a value
      * @param {int} value of current block
      * @return {string} color in a rgb() format
      */
      function mapping(x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
      if (value > 512) {
        let mapped_value = mapping(value, 512, 2048, 200, 100);
        return `rgb(${mapped_value/2}, ${mapped_value/2}, ${mapped_value/2})`;
      }else if (value > 128) {
        let mapped_value = mapping(value, 128, 512, 200, 100);
        return `rgb(${mapped_value/2}, ${mapped_value/2}, ${mapped_value})`;
      }else if (value > 64) {
        let mapped_value = mapping(value, 64, 512, 200, 100);
        return `rgb(${mapped_value}, ${mapped_value/2}, ${mapped_value/2})`;
      }else if (value >= 32) {
        let mapped_value = mapping(value, 32, 64, 200, 100);
        return `rgb(${mapped_value}, ${mapped_value/2}, ${mapped_value})`;
      }else {
        let mapped_value = mapping(value, 0, 32, 200, 100);
        return `rgb(${mapped_value/2}, ${mapped_value}, ${mapped_value})`;
      }
    },
    "spawn" : function (id, position, value) {
      /**
      * render spawn of block
      * @param id - id of HTML DOM of Block
      * @param {[x, y]} position - coords of the block
      * @param value - value of the block
      */
      $("#mainBlocks").append(`<div id="${id}" class="cube red absolute p-${position.x}-${position.y}">${value}</div>`);
      $(`#${id}`).css({"background": display.block.generateColor(value)});
    },
    "move" : function (id, from, to, value) {
      /**
      *
      */
      $(`#${id}`).removeClass(`p-${from.x}-${from.y}`);
      $(`#${id}`).addClass(`p-${to.x}-${to.y}`);
      $(`#${id}`).css({"background": display.block.generateColor(value)});
      $(`#${id}`).html(value);
    },
    "destroy" : function (id) {
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

  "popup" : {
    "show" : function () {
          $(".ui-overlay").stop(true, true);
          $(".ui-overlay").fadeIn(500);
    },
    "hide" : function () {
          $(".ui-overlay").stop(true, true);
          $(".ui-overlay").fadeOut(500);
    },
  },

  "score" : {
    "update" : function (score) {
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
    "added" : function (scoreToAdd) {
      if(scoreToAdd != 0){
        $('.socreval').remove();
        $(".score-scope").append(`<div class="socreval">+${scoreToAdd}</div>`);
      }
    }
  }

}
