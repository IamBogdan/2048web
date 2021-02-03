<<<<<<< HEAD
board = [ [8, 4, 2, 4, 8, 8, 4, 4, 4, 4, 2, 0]
        ];

class Game {

  // constructor() {
  // }
=======
class Game {

>>>>>>> 4efff8c22e988b2fb16239a597663a572d2bccfe
  generateValue(){
      let rd = Math.floor(Math.random() * 9);
      if( rd <= 8){
        return 2;
      }
      return 4;
  }

  generatePosition(){
    // generate 4 x 4
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    return [x, y];
  }

  doGameMove(dir){
    var leni = board.length;
    var lenj = board[0].length;

    if(dir == "RIGHT"){
      for(var i = 0; i < leni; i++){
        var zero_index = -1;
        var numb_index = -1;
        for(var j = lenj - 1; j >= 0; j--){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index != -1){
            board[i][zero_index] = board[i][j];
            board[i][j] = 0
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
          else if(board[i][j] != 0 && numb_index != -1){ // merge tiles
            if(board[i][j] == board[i][numb_index]){
              board[i][numb_index] += board[i][j];
              board[i][j] = 0;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){
              if(board[i][j] == board[i][numb_index - 1] || board[i][numb_index - 1] == 0){
                board[i][numb_index - 1] += board[i][j]
                board[i][j] = 0;
                j = numb_index;
                numb_index = -1;
              }
            }
          }
          else if (board[i][j] != 0 && numb_index == -1) {
            numb_index = j;
          }
        }
      }
    }




  }


/**
 @param: {sting}: dir (LEFT/RIGHT/UP/DOWN) - direction shift of numb
    This function shifts all numbers to one side of the whole board.
    // TODO: UP/ DOWN
*/
  clearZeroShiftBoard(dir){
    var leni = board.length;
    var lenj = board[0].length;


    if(dir == "RIGHT"){
      for (var i = leni - 1 ; i >= 0; i--) {
        var zero_index = -1;
        for (var j = lenj - 1; j >= 0; j--) {
          if(board[i][j] == 0 && zero_index == -1){
            zero_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1) {
             board[i][zero_index] = board[i][j]; // swap 0 with numb,
             board[i][j] = 0;
             j = zero_index;
             zero_index = -1;
          }
        }
      }
    }




    else if(dir == "LEFT"){
      for (var i = 0; i < leni; i++) {
        var zero_index = -1;
        for (var j = 0; j < lenj; j++) {
          if(board[i][j] == 0 && zero_index == -1){
            zero_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1) {
             board[i][zero_index] = board[i][j]; // swap 0 with numb,
             board[i][j] = 0;
             j = zero_index;
             zero_index = -1;
          }
        }
      }
    }
    //else if()
  }



}


a = new Game();
