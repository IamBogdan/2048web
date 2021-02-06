class Display{
  /**
  * used for display some stuff
  */
  static showPopUp(){
    $(".ui-overlay").stop(true, true);
    $(".ui-overlay").fadeIn(500);
  }
  static hidePopUp(){
    $(".ui-overlay").stop(true, true);
    $(".ui-overlay").fadeOut(500);
  }
  static score(score){
    if($("#score").html() != score){
      $("#score").stop(true, true);
      $("#score").fadeOut(150);
      setTimeout(function () {
        $("#score").html(score);
      }, 150);
      $("#score").fadeIn(50);
    }
    $("#score-text").html(`Your score: ${score}`);
  }
  static scoreAdd(scoreToAdd){
    if(scoreToAdd != 0){

      $('.socreval').remove();
      $(".score-scope").append(`<div class="socreval">+${scoreToAdd}</div>`);

    }

  }


}
