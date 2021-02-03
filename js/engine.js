
board = [ [2, 0, 0, 2],
          [2, 0, 0, 2],
          [64, 0, 2, 2],
          [64, 0, 0, 2],
         ];


// [0, 2,  2, 1024, 1024, 0, 0, 0, 0, 0, 4, 4, 8, 16, 8, 4, 4, 2, 0, 0, 0, 0, 4, 2, 2, 4, 0, 0]



class Game{

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
      for(var i = 0; i < leni; i++){ //define string (row)
        var zero_index = -1;
        var numb_index = -1;
        for(var j = lenj - 1; j >= 0; j--){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j] == board[i][numb_index]){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][numb_index] += board[i][j];
              board[i][j] = 0;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index - 1] == 0){
                board[i][numb_index - 1] = board[i][j];
                board[i][j] = 0;
                numb_index = numb_index - 1;
                j = numb_index; // Присваиваем numb_index - 1 вместо numb_index - 2, так как после выполнение условий в цикле выполнится j--
              }
              else{ // Данная ситуация обозначает что индекс j = numb_index - 1
                numb_index = numb_index - 1;
                j = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][zero_index] = board[i][j];
            board[i][j] = 0;
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "LEFT"){
      for(var i = 0; i < leni; i++){ //define string (row)
        var zero_index = -1;
        var numb_index = -1;
        for(var j = 0; j < lenj; j++){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j] == board[i][numb_index]){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][numb_index] += board[i][j];
              board[i][j] = 0;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 < lenj){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index + 1] == 0){
                board[i][numb_index + 1] = board[i][j];
                board[i][j] = 0;
                numb_index = numb_index + 1;
                j = numb_index; // Присваиваем numb_index - 1 вместо numb_index - 2, так как после выполнение условий в цикле выполнится j--
              }
              else{ // Данная ситуация обозначает что индекс j = numb_index + 1
                numb_index = numb_index + 1;
                j = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = j;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[i][zero_index] = board[i][j];
            board[i][j] = 0;
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    /*------------------------------------------------------------------------*/
    if(dir == "DOWN"){
      for(var j = 0; j < lenj; j++){ //define col
        var zero_index = -1;
        var numb_index = -1;
        for(var i = lenj - 1; i >= 0; i--){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j] == board[numb_index][j]){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[numb_index][j] += board[i][j];
              board[i][j] = 0;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index - 1][j] == 0){
                board[numb_index - 1][j] = board[i][j];
                board[i][j] = 0;
                numb_index = numb_index - 1;
                i = numb_index; // Присваиваем numb_index - 1 вместо numb_index - 2, так как после выполнение условий в цикле выполнится j--
              }
              else{ // Данная ситуация обозначает что индекс j = numb_index - 1
                numb_index = numb_index - 1;
                i = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = i;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[zero_index][j] = board[i][j];
            board[i][j] = 0;
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "UP"){
      for(var j = 0; j < lenj; j++){ //define col
        var zero_index = -1;
        var numb_index = -1;
        for(var i = 0; i < leni; i++){ // for(var j = 0; j < lenj; j++){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j] == board[numb_index][j]){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[numb_index][j] += board[i][j];
              board[i][j] = 0;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index + 1][j] == 0){
                board[numb_index + 1][j] = board[i][j];
                board[i][j] = 0;
                numb_index = numb_index + 1;
                i = numb_index; // Присваиваем numb_index - 1 вместо numb_index - 2, так как после выполнение условий в цикле выполнится j--
              }
              else{ // Данная ситуация обозначает что индекс j = numb_index - 1
                numb_index = numb_index + 1;
                i = numb_index;
              }
            }
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index == -1){
            numb_index = i;
          }
          else if(board[i][j] != 0 && zero_index != -1){
            board[zero_index][j] = board[i][j];
            board[i][j] = 0;
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }

/*
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
            board[i][j] = 0;
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
    }*/


    /*
    else if(dir == "LEFT"){
      for(var i = 0; i < leni; i++){
        var zero_index = -1;
        var numb_index = -1;
        for(var j = 0; j < lenj; j++){
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          else if(board[i][j] != 0 && numb_index == -1 && zero_index != -1){
            board[i][zero_index] = board[i][j];
            board[i][j] = 0;
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
            else if(numb_index + 1 < lenj){
              if(board[i][j] == board[i][numb_index + 1] || board[i][numb_index + 1] == 0){
                board[i][numb_index + 1] += board[i][j]
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
*/



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
