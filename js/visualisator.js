board = [ [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0] ];

class Block{
  constructor(position = [], cords = [], value){
    /**
    * @param {[x,y]} position - coords of block to move
    * @param {int} value - new value of
    */
    this.position = this.#arrayToPos(position);
    this.cords = this.#arrayToPos(cords);
    this.value = value;
  }
  #arrayToPos(list){
    /**
    * @param {[x, y]} list - coords in [x, y] format
    * @return a coords as a libray
    */
    return {"x" : list[0],
            "y" : list[1]}
  }
  createBlock(){
    /**
    * add a new block to a board
    */
    board[this.position.x][this.position.y] = this;
    $("#mainBlocks").append("<div class=\"cube red absolute p-"+this.position.x+"-"+this.position.y+"\">"+this.value+"</div>");
    // $("#mainBlocks").append("<div></div>");
  }
  move(cords = []){
    /**
    * move block to a new cords
    * @param {[x,y]} cords - coords to move block
    */
    
  }
}
