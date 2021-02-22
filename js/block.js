id = 0; //counter, used for create unique id`s for HTML DOM of Blocks
class Block{
  /**
  * creates a new block on a board
  * @REQUIRED {[3][3]} board - main game board
  * has:
  * @variable {x, y} position - coords of block
  * @variable {int} value - value of block
  * @variable {string} id - id of block in HTML
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
  #destroyBlock(addressee = []){
    /**
    * destroy a visual blok of destination point
    * @param {Block} addressee - coords of destination point
    */
    if( addressee instanceof Block && addressee != 0){
      display.block.destroy(addressee.id);
    }
  }
  #createBlock(){
    /**
    * add`s a new block to a board, and render it
    */
    this.#destroyBlock(board[this.position.x][this.position.y]);
    board[this.position.x][this.position.y] = this;
    display.block.spawn(this.id, this.position, this.value);
  }

  move(cords = [], newValue = this.value){
    /**
    * move block to a new cords
    * @param {[x,y]} cords - coords to move block
    */
    this.value = newValue;
    moveTo = this.#arrayToPos(cords);
    this.#destroyBlock(board[moveTo.x][moveTo.y]);

    board[this.position.x][this.position.y] = 0;

    display.block.move(this.id, moveTo, this.value);

    this.position.x = moveTo.x;
    this.position.y = moveTo.y;
    board[this.position.x][this.position.y] = this;
  }
  destroy(id, position){
      board[this.position.x][this.position.y] = 0;
      display.block.destroy(this.id);
  }
}
