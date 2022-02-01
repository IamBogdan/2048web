class Board{
  /**
   * @REQUIRED module:block.js
   */
  #rows;
  #cols;
  #board;
  #block_id = 0;
  constructor(rows = 4, cols = 4){
    this.#rows = Math.max(rows, 2);
    this.#cols = Math.max(cols, 2);
    this.#board = Array(this.#rows).fill().map(() => Array(this.#cols).fill(0));
    
    console.log("Created board with size: ", this.#rows, "x", this.#cols);
  }
  getBoard(){
    return this.#board.slice(); // return the copy of the board
  }
  getCols(){
    return this.#cols;
  } 
  getRows(){
    return this.#rows;
  }
  moveBlock(from, to, new_value){
    this.#board[from.y][from.x].value = new_value;
    this.#board[from.y][from.x].position = {x: to.x, y: to.y};

    let block = this.#board[from.y][from.x];
    if(this.#board[to.y][to.x] instanceof Block)
      this.#board[to.y][to.x].animDestroy();
    
    this.#board[to.y][to.x] = block;
    this.#board[from.y][from.x] = 0;
    display.block.move(block.id, to, block.value);
  }
  createBlock(position, value){
    if(this.#board[position.y][position.x] instanceof Block)
      this.#board[position.y][position.x].animDestroy();
    this.#board[position.y][position.x] = new Block(this.#block_id++, position, value);
  }
  createBlockWId(id, position, value){
    if(this.#board[position.y][position.x] instanceof Block)
      this.#board[position.y][position.x].animDestroy();
    this.#board[position.y][position.x] = new Block(id, position, value);
  }
  resetBoard(){
    for(let y = 0; y < this.#rows; y++){
      for(let x = 0; x < this.#cols; x++){
        if(this.#board[y][x] instanceof Block){
          this.#board[y][x].animDestroy();
          this.#board[y][x] = 0;
        }
      }
    }
    this.#block_id = 0;
  }
  getBoardData(){
    return {block_id: this.#block_id, board: this.#board.slice(), rows: this.#rows, cols: this.#cols};
  }
  setBoardData(board_data){
    this.#block_id = board_data.block_id + 10;
    this.#rows = board_data.rows;
    this.#cols = board_data.cols;
    this.#board = Array(this.#rows).fill().map(() => Array(this.#cols).fill(0));

    for(let y = 0; y < this.#rows; y++){
      for(let x = 0; x < this.#cols; x++){
        let tmp = board_data.board[y][x];
        if(tmp != 0){
          let tmp_id = tmp.id.replace(/[^\d]/g, '');
          setTimeout(function () {
            this.createBlockWId(tmp_id, {x: tmp.position.x, y: tmp.position.y}, tmp.value);
          }.bind(this), display.ANIMATION_TIME);
        }
        this.#board[y][x] = 0;
      }
    }
  }
  /*
  printBoard(){
    let output = [];
    for(let i = 0; i < this.#rows; i++){
      let orow = [];
      for(let j = 0; j < this.#cols; j++){
        if(this.#board[i][j] instanceof Block){
          orow.push(this.#board[i][j].value + 'b');
        }
        else{
          orow.push(0);
        }
      }
      output.push(orow);
    }
    console.table(output);
  }*/
}