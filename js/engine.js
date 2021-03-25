class Game{

  constructor(){
    this.is_move = false;
    this.score = 0;
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

  resetGame(){
    /**
    * Removes all blocks on the board, resets points
    */
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        if(board[i][j] != 0){
          board[i][j].destroy();
        }
      }
    }
    this.score = 0;
  }

  checkGameOver(){
    /**
    * Check the game for loss
    * Works with all matrices x > 1 and y > 1
    * @return false - the game is not over,
    *         true - game is over
    */
    let leni = board.length;
    let lenj = board[0].length;

    for(let i = 0; i < leni; i++){
      for(let j = 0; j < lenj; j++){
        if(board[i][j] == 0){
          return false;
        }
      }
    }
    // whole board in blocks (Class Block)

    // Compares the corners of the matrix
    if(board[0][0].value == board[0][1].value || board[0][0].value == board[1][0].value ||
       board[leni-1][0].value == board[leni-1][1].value || board[leni-1][0].value == board[leni-2][0].value ||
       board[0][lenj-1].value == board[0][lenj-2].value || board[0][lenj-1].value == board[1][lenj-1].value ||
       board[leni-1][lenj-1].value == board[leni-1][lenj-2].value || board[leni-1][lenj-1].value == board[leni-2][lenj-1].value){
        return false;
    }
    // for 2x2 :D
    else if(leni == 2 && lenj == 2){
      return true;
    }


    for(let i = 1; i < leni - 1; i++){
      let current = board[i][0].value;
      let top     = board[i-1][0].value;
      let down    = board[i+1][0].value;
      let right   = board[i][1].value;
      if(current ==  top || current == down || current == right){
        return false;
      }
    }

      for(let i = 1; i < leni - 1; i++){
        let current = board[i][lenj-1].value;
        let top     = board[i-1][lenj-1].value;
        let left    = board[i][lenj-2].value;
        let down    = board[i+1][lenj-1].value;
        if(current ==  top || current == left || current == down){
          return false;
        }
      }

      for(let j = 1; j < lenj - 1; j++){
        let current = board[0][j].value;
        let left    = board[0][j-1].value;
        let down    = board[1][j].value;
        let right   = board[0][j+1].value;
        if(current ==  left || current == down || current == right){
          return false;
        }
      }

      for(let j = 1; j < lenj - 1; j++){
        let current = board[leni-1][j].value;
        let top     = board[leni-2][j].value;
        let left    = board[leni-1][j-1].value;
        let right   = board[leni-1][j+1].value;
        if(current ==  top || current == left || current == right){
          return false;
        }
      }
      // for matrix 2xN и Nx2, N > 2
      if(leni == 2 && lenj > 2 || lenj == 2 && leni > 2){
        return true;
      }


    // Compare blocks in the center
    for(let i = 1; i < leni - 2; i++){
      for(let j = 1; j < lenj - 2; j++){
        let current = board[i][j].value;
        let top     = board[i-1][j].value;
        let left    = board[i][j-1].value;
        let down    = board[i+1][j].value;
        let right   = board[i][j+1].value;
        if(current == top || current == left || current == down || current == right){
          return false;
        }
      }
    }
    return true;
  }


  generatePosition(/*board*/){
    /**
    * Generates coordinates for a new block
    * @return -1 - if there is no empty space for the block
    * @return a coordinates for the new block
    */
    let pos = [];

    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        if(board[i][j] == 0){
          pos.push([i, j]);
        }
      }
    }

    if(pos.length == 0){
      return -1;
    }
    if(pos.length == 1){
      return pos[0];
    }
    // Рандом в радиусе [0, pos.length)
    let i = Math.floor(Math.random() * pos.length);
    return pos[i];
  }

  doGameMove(dir){
    /**
    * Makes the whole board move
    * @param {dir} string - direction to shift all blocks
    */
    let leni = board.length;
    let lenj = board[0].length;
    // init in constructor
    this.is_move = false;

    if(dir == "RIGHT"){
      for(let i = 0; i < leni; i++){ //row
        let zero_index = -1;
        let numb_index = -1;
        for(let j = lenj - 1; j >= 0; j--){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            // determines the rightmost cell if it is zero and places the index of that zero at zero_index
            zero_index = j;
          }
          else if(board[i][j] != 0 && numb_index != -1){
            // found 2 numbers, that is, numb_index points to the rightmost number that has not yet been merged.
            // the left number found is board [i] [j].
            if(board[i][j].value == board[i][numb_index].value){
              // compare these 2 numbers if they are equal - combine them, else look at the value to the left of numb_index.
              this.score += board[i][j].value * 2;
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              this.is_move = true;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){
              // Compare to not get out of the bounds of the array. To view the value to the left of numb_index.
              if(board[i][numb_index - 1] == 0){
                board[i][j].move([i, numb_index - 1]);
                this.is_move = true;
                numb_index = numb_index - 1; // Assign numb_index - 1 instead numb_index - 2, since after the execution conditions is executed in a cycle j--
                j = numb_index;
              }
              else{ // This situation means that the index j = numb_index - 1
                numb_index = numb_index - 1;
                j = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][j].move([i, zero_index]);
            this.is_move = true;
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "LEFT"){
      for(let i = 0; i < leni; i++){ //row
        let zero_index = -1;
        let numb_index = -1;
        for(let j = 0; j < lenj; j++){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[i][numb_index].value){
              this.score += board[i][j].value * 2;
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              this.is_move = true;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 < lenj){
              if(board[i][numb_index + 1] == 0){
                board[i][j].move([i, numb_index + 1]);
                this.is_move = true;
                numb_index = numb_index + 1;
                j = numb_index;
              }
              else{
                numb_index = numb_index + 1;
                j = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][j].move([i, zero_index]);
            this.is_move = true;
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    /*------------------------------------------------------------------------*/
    if(dir == "DOWN"){
      for(let j = 0; j < lenj; j++){ //col
        let zero_index = -1;
        let numb_index = -1;
        for(let i = leni - 1; i >= 0; i--){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[numb_index][j].value){
              this.score += board[i][j].value * 2;
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              this.is_move = true;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){
              if(board[numb_index - 1][j] == 0){
                board[i][j].move([numb_index - 1, j]);
                this.is_move = true;
                numb_index = numb_index - 1;
                i = numb_index;
              }
              else{
                numb_index = numb_index - 1;
                i = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = i;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][j].move([zero_index, j]);
            this.is_move = true;
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "UP"){
      for(let j = 0; j < lenj; j++){
        let zero_index = -1;
        let numb_index = -1;
        for(let i = 0; i < leni; i++){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[numb_index][j].value){
              this.score += board[i][j].value * 2;
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              this.is_move = true;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 >= 0){
              if(board[numb_index + 1][j] == 0){
                board[i][j].move([numb_index + 1, j]);
                this.is_move = true;
                numb_index = numb_index + 1;
                i = numb_index;
              }
              else{
                numb_index = numb_index + 1;
                i = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = i;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][j].move([zero_index, j]);
            this.is_move = true;
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
  }
}
