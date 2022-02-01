class Game{
  #is_move;
  #score;
  constructor(){
    this.#is_move = false;
    this.#score = 0;
  }
  generateValue(){
    /**
    * Generates number 2 with 90% probability or number 4 with 10% probability
    * @return number 2 or 4
    */
      let rd = Math.floor(Math.random() * 9);
      if(rd <= 8){
        return 2;
      }
      return 4;
  }
  resetScore(){
    this.#score = 0;
  }
  getScore(){
    return this.#score;
  }
  setScore(value){
    this.#score = value;
  }
  popIsMove(){
    let tmp = this.#is_move;
    this.#is_move = 0;
    return tmp;
  }
  checkGameOver(board){
    /**
    * Check the game for loss
    * Works with all matrices x > 1 and y > 1
    * @return false - the game is not over,
    *         true - game is over
    */
    let _board = board.getBoard();
    let rows = board.getRows();
    let cols = board.getCols();

    for(let y = 0; y < rows; y++)
      for(let x = 0; x < cols; x++)
        if(_board[y][x] == 0)
          return false;
    
    // whole _board in blocks (Class Block)
    for(let y = 1; y < rows; y++){
      for(let x = 1; x < cols; x++){
        let current  = _board[y][x].value;
        let left     = _board[y][x - 1].value;
        let top      = _board[y - 1][x].value;
        let left_top = _board[y - 1][x - 1].value;

        if(current == top || current == left || left_top == top || left_top == left){
          return false;
        }
      }
    } 
    return true;
  }
  generatePosition(board){
    /**
    * Generates coordinates for a new block
    * @return -1 - if there is no empty space for the block
    * @return a coordinates for the new block
    */

    let _board = board.getBoard();
    let rows = board.getRows();
    let cols = board.getCols();
    let pos = [];

    for(let y = 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        if(_board[y][x] == 0){
          pos.push({x: x, y: y});
        }
      }
    }

    if(pos.length == 0){
      console.log("Can not pick pisition");
      return -1;
    }/*
    if(pos.length == 1){
      return pos[0];
    }*/
    // Рандом в радиусе [0, pos.length)
    let i = Math.floor(Math.random() * pos.length);
    return pos[i];
  }
  doGameMove(dir, board){
    /**
    * Makes the whole _board move
    * @param {dir} string - direction to shift all blocks
    */

    let _board = board.getBoard();
    let rows = board.getRows();
    let cols = board.getCols();
    // init in constructor
    this.#is_move = false;
    
    if(dir == "RIGHT"){
      for(let y = 0; y < rows; y++){ //row
        //let _board = board.getBoard();
        let zero_index = -1;
        let numb_index = -1;
        for(let x = cols - 1; x >= 0; x--){
          if(_board[y][x] == 0 && numb_index == -1 && zero_index == -1){
            // determines the rightmost cell if it is zero and places the index of that zero at zero_index
            zero_index = x;
          }
          else if(_board[y][x] != 0 && numb_index != -1){
            // found 2 numbers, that is, numb_index points to the rightmost number that has not yet been merged.
            // the left number found is board [i] [j].
            if(_board[y][x].value == _board[y][numb_index].value){
              // compare these 2 numbers if they are equal - combine them, else look at the value to the left of numb_index.
              this.#score += _board[y][x].value * 2;
              board.moveBlock({x: x, y: y}, {x: numb_index, y: y}, _board[y][x].value * 2);
              this.#is_move = true;
              x = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){
              // Compare to not get out of the bounds of the array. To view the value to the left of numb_index.
              if(_board[y][numb_index - 1] == 0){
                //board[i][j].move([i, numb_index - 1]);
                board.moveBlock({x: x, y: y}, {x: numb_index - 1, y: y}, _board[y][x].value);
                this.#is_move = true;
                numb_index = numb_index - 1; // Assign numb_index - 1 instead numb_index - 2, since after the execution conditions is executed in a cycle j--
                x = numb_index;
              }
              else{ // This situation means that the index j = numb_index - 1
                numb_index = numb_index - 1;
                x = numb_index;
              }
            }
          }
          else if(_board[y][x] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = x;
          }
          else if(_board[y][x] != 0 && zero_index != -1){
            board.moveBlock({x: x, y: y}, {x: zero_index, y: y}, _board[y][x].value);
            this.#is_move = true;
            x = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "LEFT"){
      for(let y = 0; y < rows; y++){ //row
        let zero_index = -1;
        let numb_index = -1;
        for(let x = 0; x < cols; x++){
          if(_board[y][x] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = x;
          }
          else if(_board[y][x] != 0 && numb_index != -1){
            if(_board[y][x].value == _board[y][numb_index].value){
              this.#score += _board[y][x].value * 2;
              board.moveBlock({x: x, y: y}, {x: numb_index, y: y}, _board[y][x].value * 2);
              this.#is_move = true;
              x = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 < cols){
              if(_board[y][numb_index + 1] == 0){
                board.moveBlock({x: x, y: y}, {x: numb_index + 1, y: y}, _board[y][x].value);
                this.#is_move = true;
                numb_index = numb_index + 1;
                x = numb_index;
              }
              else{
                numb_index = numb_index + 1;
                x = numb_index;
              }
            }
          }
          else if(_board[y][x] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = x;
          }
          else if(_board[y][x] != 0 && zero_index != -1){
            board.moveBlock({x: x, y: y}, {x: zero_index, y: y}, _board[y][x].value);
            this.#is_move = true;
            x = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    /*------------------------------------------------------------------------*/
    if(dir == "DOWN"){
      for(let x = 0; x < cols; x++){ //col
        let zero_index = -1;
        let numb_index = -1;
        for(let y = rows - 1; y >= 0; y--){
          if(_board[y][x] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = y;
          }
          else if(_board[y][x] != 0 && numb_index != -1){
            if(_board[y][x].value == _board[numb_index][x].value){
              this.#score += _board[y][x].value * 2;
              board.moveBlock({x: x, y: y}, {x: x, y: numb_index}, _board[y][x].value * 2);
              this.#is_move = true;
              y = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){
              if(_board[numb_index - 1][x] == 0){
                board.moveBlock({x: x, y: y}, {x: x, y: numb_index - 1}, _board[y][x].value);
                this.#is_move = true;
                numb_index = numb_index - 1;
                y = numb_index;
              }
              else{
                numb_index = numb_index - 1;
                y = numb_index;
              }
            }
          }
          else if(_board[y][x] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = y;
          }
          else if(_board[y][x] != 0 && zero_index != -1){
            board.moveBlock({x: x, y: y}, {x: x, y: zero_index}, _board[y][x].value);
            this.#is_move = true;
            y = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "UP"){
      for(let x = 0; x < cols; x++){
        let zero_index = -1;
        let numb_index = -1;
        for(let y = 0; y < rows; y++){
          if(_board[y][x] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = y;
          }
          else if(_board[y][x] != 0 && numb_index != -1){
            if(_board[y][x].value == _board[numb_index][x].value){
              this.#score += _board[y][x].value * 2;
              board.moveBlock({x: x, y: y}, {x: x, y: numb_index}, _board[y][x].value * 2);
              this.#is_move = true;
              y = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 >= 0){
              if(_board[numb_index + 1][x] == 0){
                board.moveBlock({x: x, y: y}, {x: x, y: numb_index + 1}, _board[y][x].value);
                this.#is_move = true;
                numb_index = numb_index + 1;
                y = numb_index;
              }
              else{
                numb_index = numb_index + 1;
                y = numb_index;
              }
            }
          }
          else if(_board[y][x] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = y;
          }
          else if(_board[y][x] != 0 && zero_index != -1){
            board.moveBlock({x: x, y: y}, {x: x, y: zero_index}, _board[y][x].value);
            this.#is_move = true;
            y = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
  }
}
