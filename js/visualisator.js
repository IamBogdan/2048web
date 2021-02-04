ANIMATION_TIME = 500; // ms
id = 0;
class Block{
  /**
  * creates a new block on a board
  * @REQUIRED {[3][3]} board - main game board
  * has:
  * @param {x, y} position - coords of block
  * @param {int} value - value of block
  * @param {string} id - id of block in HTML
  *
  * @usage -  use     new Block([x, y], value)  for create a new Block on a board
  *           use     board[x][y].method        to access a metods of a Block on this position
  *
  */
  constructor(position = [], value = 2){
    /**
    * @param {[x,y]} position !REQUIRED - coords of block
    * @param {int} value !REQUIRED - new value of block
    */
    id++;
    this.id = `block-${id}`;
    this.position = this.#arrayToPos(position);
    this.value = value;
    this.#createBlock();
  }
  #arrayToPos(list){
    /**
    * @param {[x, y]} list - coords in [x, y] format
    * @return a coords as a libray
    */
    return {"x" : list[0],
            "y" : list[1]}
  }
  #destroyOnTop(addressee = []){
    /**
    * destroy a visual blok of destination point
    * @param {Block} addressee - coords of destination point
    */
    if( !(addressee instanceof Block) ){
      return
    }else if(board[addressee.position.x][addressee.position.y]){
      $(`#${addressee.id}`).addClass('remove');
      setTimeout(function () {
        $(`#${addressee.id}`).remove();
      }, ANIMATION_TIME);
    }
  }
  #createBlock(){
    /**
    * add`s a new block to a board, and render it
    */
    this.#destroyOnTop(board[this.position.x][this.position.y]);
    board[this.position.x][this.position.y] = this;

    $("#mainBlocks").append(`<div id="${this.id}" class="cube red absolute p-${this.position.x}-${this.position.y}">${this.value}</div>`);
    $(`#${this.id}`).css({"background": this.#generateColor(this.value)});

  }
  #generateColor(value){
    /**
    * generate a color for Cube using a value
    * @param {int} value of current block
    * @return {string} color in a rgb() format
    */
    function mapping(x, in_min, in_max, out_min, out_max) {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    let mapped_value = mapping(value, 2, 1024, 180, 45);
    return `rgb(${mapped_value/2}, ${mapped_value}, ${mapped_value})`;
  }
  move(cords = [], newValue = this.value){
    /**
    * move block to a new cords
    * @param {[x,y]} cords - coords to move block
    */
    this.value = newValue;
    moveTo = this.#arrayToPos(cords);
    this.#destroyOnTop(board[moveTo.x][moveTo.y]);

    board[this.position.x][this.position.y] = 0;

    $(`#${this.id}`).removeClass(`p-${this.position.x}-${this.position.y}`);
    $(`#${this.id}`).addClass(`p-${moveTo.x}-${moveTo.y}`);
    $(`#${this.id}`).css({"background": this.#generateColor(this.value)});
    $(`#${this.id}`).html(this.value);

    this.position.x = moveTo.x;
    this.position.y = moveTo.y;
    board[this.position.x][this.position.y] = this;
  }
  destroy(){
    board[this.position.x][this.position.y] = 0;
    $(`#${this.id}`).addClass('remove');
    setTimeout(function () {
      $(`#${this.id}`).remove();
    }, ANIMATION_TIME);
  }
}
