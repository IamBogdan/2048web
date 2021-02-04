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
            if(board[i][j].value == board[i][numb_index].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index - 1] == 0){
                board[i][j].move([i, numb_index - 1]);
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
            board[i][j].move([i, zero_index]);
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
            if(board[i][j].value == board[i][numb_index].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 < lenj){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index + 1] == 0){
                board[i][j].move([i, numb_index + 1]);
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
            board[i][j].move([i, zero_index]);
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
            if(board[i][j].value == board[numb_index][j].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index - 1][j] == 0){
                board[i][j].move([numb_index - 1, j]);
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
            board[i][j].move([zero_index, j]);
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
            if(board[i][j].value == board[numb_index][j].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index + 1][j] == 0){
                board[i][j].move([numb_index + 1, j]);
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
            board[i][j].move([zero_index, j]);
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
  }
}
