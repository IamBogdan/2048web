class Game{

  constructor(){
    this.is_move = false;
    this.score = 0;
  }

// Генерирует число 2 с шансом 90% и 4 с шансом 10%
  generateValue(){
      let rd = Math.floor(Math.random() * 9);
      if(rd <= 8){
        return 2;
      }
      return 4;
  }

//  Удаляет все блоки на поле, обнуляет очки.
  resetGame(){
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[0].length; j++){
        if(board[i][j] != 0){
          board[i][j].destroy();
        }
      }
    }
    this.score = 0;
  }

// Возвращает false - игра не окончена
// Возвращает true если игра не окончена
<<<<<<< HEAD
=======

board = [[]];

>>>>>>> a4ff7b9b0d7ce7ad571360d7948e462b99e83255
  checkGameOver(){
    let leni = board.length;
    let lenj = board[0].length;

    for(let i = 0; i < leni; i++){
      for(let j = 0; j < lenj; j++){
        if(board[i][j] == 0){
          return false;
        }
      }
    }
    // Вся доска в блоках (в классе Block)

    // Сравниваем углы матрицы
    if(board[0][0].value == board[0][1].value || board[0][0].value == board[1][0].value ||
       board[leni-1][0].value == board[leni-1][1].value || board[leni-1][0].value == board[leni-2][0].value ||
       board[0][lenj-1].value == board[0][lenj-2].value || board[0][lenj-1].value == board[1][lenj-1].value ||
       board[leni-1][lenj-1].value == board[leni-1][lenj-2].value || board[leni-1][lenj-1].value == board[leni-2][lenj-1].value){
        return false;
    }
    // специально для 2x2 :D
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
      // Для матриц 2xN и Nx2, N > 2
      if(leni == 2 && lenj > 2 || lenj == 2 && leni > 2){
        return true;
      }


    // Сравниваем блоки в центре
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

// Обязательно должен быть пустой блок (с нулём)
// Возвращает -1 если нет пустых блоков
// Возвращает случайный индексы [i, j] который равен пустому блоку
  generatePosition(/*board*/){
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

// Делает движение всей доски.
// Возвращает 1 если сделано движение блоков, в ином случае 0
  doGameMove(dir){
    let leni = board.length;
    let lenj = board[0].length;
    // init in constructor
    this.is_move = false;

    if(dir == "RIGHT"){
      for(let i = 0; i < leni; i++){ //define string (row)
        let zero_index = -1;
        let numb_index = -1;
        for(let j = lenj - 1; j >= 0; j--){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[i][numb_index].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              this.score += board[i][j].value * 2;
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              this.is_move = true;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index - 1] == 0){
                board[i][j].move([i, numb_index - 1]);
                this.is_move = true;
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
            this.is_move = true;
            j = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "LEFT"){
      for(let i = 0; i < leni; i++){ //define string (row)
        let zero_index = -1;
        let numb_index = -1;
        for(let j = 0; j < lenj; j++){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = j;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[i][numb_index].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              this.score += board[i][j].value * 2;
              board[i][j].move([i, numb_index], board[i][j].value * 2);
              this.is_move = true;
              j = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 < lenj){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[i][numb_index + 1] == 0){
                board[i][j].move([i, numb_index + 1]);
                this.is_move = true;
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
      for(let j = 0; j < lenj; j++){ //define col
        let zero_index = -1;
        let numb_index = -1;
        for(let i = leni - 1; i >= 0; i--){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[numb_index][j].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              this.score += board[i][j].value * 2;
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              this.is_move = true;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index - 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index - 1][j] == 0){
                board[i][j].move([numb_index - 1, j]);
                this.is_move = true;
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
            this.is_move = true;
            i = zero_index;
            numb_index = zero_index;
            zero_index = -1;
          }
        }
      }
    }
    if(dir == "UP"){
      for(let j = 0; j < lenj; j++){ //define col
        let zero_index = -1;
        let numb_index = -1;
        for(let i = 0; i < leni; i++){ // for(let j = 0; j < leni; j++){
          // Условие ниже определяет самое правую ячейку если она равна нулю и помещаяет индекс этого нуля в zero_index
          if(board[i][j] == 0 && numb_index == -1 && zero_index == -1){
            zero_index = i;
          }
          // Условие ниже происходит когда найдено 2 числа, то есть numb_index показывает на крайнее правое число которое еще не было объеденино.
          // Левое найденное число является board[i][j].
          else if(board[i][j] != 0 && numb_index != -1){
            if(board[i][j].value == board[numb_index][j].value){ // Сравниваем 2 этих числа если они равны, тогда объединяем их, в инном случае смотрим значение левее numb_index.
              this.score += board[i][j].value * 2;
              board[i][j].move([numb_index, j], board[i][j].value * 2);
              this.is_move = true;
              i = numb_index;
              numb_index = -1;
            }
            else if(numb_index + 1 >= 0){ // Сравниваем чтоб не выйти из границ массива. Для того чтобы посмотреть значение левее numb_index.
              if(board[numb_index + 1][j] == 0){
                board[i][j].move([numb_index + 1, j]);
                this.is_move = true;
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
