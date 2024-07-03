
//RESET AND START THE GAME WHEN CLICKING NEW GAME BUTTON

function resetGame() {
  
  round = 0;
  gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  /*bar.style.display = 'none';
  nameBoard.style.marginTop = '50px'*/

  for (const gameField of gameFields) {
    gameField.classList.remove("finish");
  }

  textGame.style.display = "block";
  articleElement.style.display = "none";
  gameArea.style.display = "block";
  activePlayer = wonPlayer;
  activePlayerName.textContent =
    players[activePlayer].name + " (" + players[activePlayer].symbol + ")";

  for (const gameField of gameFields) {
    gameField.textContent = "";
    gameField.classList.remove("disabled");
  }
}


function startGame() {
  if (!isValid(players[0].name) || !isValid(players[1].name)) {
    alert("Please enter names for both players");
    return;
  }
  resetGame();
}


//PLAYER TURN

function switchPlayer() {
  if (activePlayer == 1) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
  activePlayerName.textContent =
    players[activePlayer].name + " (" + players[activePlayer].symbol + ")";
}


//WON CONDITION

function arrayOfSpecialSeries(array) {

  let newArray = [];
  let j = 0;

  while (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      j = i;
      if (array[i] != array[i + 1]) {
        break;
      }
    }
    newArray.push(array.slice(0, j + 1));
    array = array.slice(j + 1);
  }

  return newArray;
}


function convertArray(array) {

  let newArray = [];

  for (let i = 0; i < array[0].length; i++) {
    newSmallArray = [];
    for (let element of array) {
      newSmallArray.push(element[i]);
    }
    newArray.push(newSmallArray);
  }

  return newArray;
}


function isValidArray(array) {
  for (element of array) {
    if (element != 0) {
      return true;
    }
  }
  return false;
}


function winByRow(array) {
  for (let element of array) {
    for (let smallElement of arrayOfSpecialSeries(element)) {
      if (smallElement.length >= 5 && isValidArray(smallElement)) {
        return true;
      }
    }
  }
  return false;
}


function winByCol(array) {
  return winByRow(convertArray(array));
}


function convertToDiagonal(array) {
  
  newArray = [];

  for (let i = 0; i < array.length - 4; i++) {
    let j = 0;
    let k = i;
    let smallArray = [];
    while (i < array.length && j < array.length) {
      smallArray.push(array[j][i]);
      i++;
      j++;
    }
    i = k;
    newArray.push(smallArray);
  }

  for (let i = 1; i < array.length - 4; i++) {
    let j = 0;
    let k = i;
    let smallArray = [];
    while (i < array.length && j < array.length) {
      smallArray.push(array[i][j]);
      i++;
      j++;
    }
    i = k;
    newArray.push(smallArray);
  }

  return newArray;
}


function winByDiagonal(array) {
  
  reversedArray = [];

  for (let element of array) {
    reversedArray.push(element.slice().reverse());
  }

  let newArray1 = convertToDiagonal(array);
  let newArray2 = convertToDiagonal(reversedArray);
  return winByRow(newArray1) || winByRow(newArray2);
}


function gameOver() {

  if (winByRow(gameBoard) || winByCol(gameBoard) || winByDiagonal(gameBoard)) {
    return 1;

  } else if (round == 81) {
    return -1;
  }

  return 0;
}


//GAME OVER DISPLAY

function gameOverDisplay() {

  textGame.style.display = "none";
  /*bar.style.display = 'flex'
  nameBoard.style.marginTop = '150px'*/

  if (gameOver() == -1) {
    articleElement.style.display = "inline-block";
    winner.textContent = "It's a draw";

  } else if (gameOver() == 1) {
    articleElement.style.display = "inline-block";
    winner.innerHTML =
      "<span id='win-display'>" +
      players[activePlayer].name +
      "</span>" +
      " won!";
  }
}


function indexOfSpecialSeries(array) {
  let newArray = arrayOfSpecialSeries(array);
  for (let element of newArray) {
    if (element.length >= 5 && isValidArray(element)) {
      j = newArray.indexOf(element);
      return j;
    }
  }

  return -1;
}


function highlightedRow(array) {
  
  let i = -1;
  let j = -1;

  for (let element of array) {
    if (indexOfSpecialSeries(element) != -1) {
      i = array.indexOf(element);
      j = indexOfSpecialSeries(element);
      break;
    }
  }

  if (i == -1 || j == -1) {
    return [];
  }

  const newArray1 = arrayOfSpecialSeries(array[i]).slice(0, j);
  const string = newArray1.flat().join("");
  const number = i * 9 + string.length;

  let finalArray = [];
  for (let i = number; i < number + 5; i++) {
    finalArray.push(i);
  }
  return finalArray;
}


function highlightedCol(array) {
  
  let i = -1;
  let j = -1;

  array = convertArray(array);

  for (let element of array) {
    if (indexOfSpecialSeries(element) != -1) {
      i = array.indexOf(element);
      j = indexOfSpecialSeries(element);
      break;
    }
  }

  if (i == -1 || j == -1) {
    return [];
  }

  const newArray1 = arrayOfSpecialSeries(array[i]).slice(0, j);
  const string = newArray1.flat().join("");
  const number = string.length * 9 + i;

  let finalArray = [];
  for (let i = number; i < number + 45; i += 9) {
    finalArray.push(i);
  }
  return finalArray;
}


function highlightedDiagonalLeft(array) {
  
  let i = -1;
  let j = -1;

  array = convertToDiagonal(array);

  for (let element of array) {
    if (indexOfSpecialSeries(element) != -1) {
      i = array.indexOf(element);
      j = indexOfSpecialSeries(element);
      break;
    }
  }

  if (i == -1 || j == -1) {
    return [];
  }

  const newArray1 = arrayOfSpecialSeries(array[i]).slice(0, j);
  const string = newArray1.flat().join("");
  const helperNumber = string.length;
  if (i >= array.length - 4) {
    i = (i - 4) * 9;
  }
  const number = i + 10 * helperNumber;

  let finalArray = [];
  for (let i = number; i < number + 50; i += 10) {
    finalArray.push(i);
  }

  return finalArray;
}


function highlightedDiagonalRight(array) {
  
  let i = -1;
  let j = -1;

  let reversedArray = [];

  for (let element of array) {
    reversedArray.push(element.slice().reverse());
  }

  reversedArray = convertToDiagonal(reversedArray);

  for (let element of reversedArray) {
    if (indexOfSpecialSeries(element) != -1) {
      i = reversedArray.indexOf(element);
      j = indexOfSpecialSeries(element);
      break;
    }
  }

  if (i == -1 || j == -1) {
    return [];
  }

  const newArray1 = arrayOfSpecialSeries(reversedArray[i]).slice(0, j);
  const string = newArray1.flat().join("");
  const helperNumber = string.length;
  if (i >= array.length - 4) {
    i = (i - 4) * 9;
  }
  const number1 = i + 10 * helperNumber;
  const number = number1 + 8 - 2 * (number1 % 9);

  let finalArray = [];
  for (let i = number; i < number + 40; i += 8) {
    finalArray.push(i);
  }

  return finalArray;
}


function highlight() {
  
  //console.log(highlightedCol(gameBoard));

  if (highlightedRow(gameBoard).length > 0) {
    for (let element of highlightedRow(gameBoard)) {
      board.children[element].classList.add("finish");
    }

  } else if (highlightedCol(gameBoard).length > 0) {
    for (let element of highlightedCol(gameBoard)) {
      board.children[element].classList.add("finish");
    }

  } else if (highlightedDiagonalLeft(gameBoard).length > 0) {
    for (let element of highlightedDiagonalLeft(gameBoard)) {
      board.children[element].classList.add("finish");
    }

  } else if (highlightedDiagonalRight(gameBoard).length > 0) {
    for (let element of highlightedDiagonalRight(gameBoard)) {
      board.children[element].classList.add("finish");
    }
  }
}


//HOW THE GAME WORKS

function play(event) {

  const colSelected = event.target.dataset.col - 1;
  const rowSelected = event.target.dataset.row - 1;

  if (gameOver() == 0) {

    if (gameBoard[rowSelected][colSelected] == 0) {
      event.target.textContent = players[activePlayer].symbol;
      event.target.classList.add("disabled");

      gameBoard[rowSelected][colSelected] = activePlayer + 1;
      round++;

      if (gameOver() != 0) {
        wonPlayer = activePlayer;
        //console.log(convertToDiagonal(gameBoard));

        let reversedArray = [];

        for (let element of gameBoard) {
          reversedArray.push(element.slice().reverse());
        }

        /*console.log(convertToDiagonal(reversedArray));
        console.log(highlightedDiagonalLeft(gameBoard));
        console.log(highlightedDiagonalRight(gameBoard));*/

        highlight();
        gameOverDisplay();

      } else {
        switchPlayer();
      }
    }
  }
}
