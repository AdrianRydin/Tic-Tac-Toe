"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};
let value = Math.random() * (1 - 0) + 0;
const gameAreaRef = document.getElementById("gameArea");

window.addEventListener("load", () => {
  initGlobalObject();
  prepGame();
  if (checkForGameOver() === 1) {
    console.log("Spelare 1 vann");
  } else if (checkForGameOver() === 2) {
    console.log("Spelare 2 vann");
  } else if (checkForGameOver() === 3) {
    console.log("Oavgjort");
  } else {
    console.log("Spelet fortsätter");
  }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner

  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  console.log(oGameData.gameField);

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

  //Indikerar tecknet som skall användas för spelare ett.
  oGameData.playerOne = "X";

  //Indikerar tecknet som skall användas för spelare två.
  oGameData.playerTwo = "O";

  //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  //Nickname för spelare ett som tilldelas från ett formulärelement,
  oGameData.nickNamePlayerOne = "";

  //Nickname för spelare två som tilldelas från ett formulärelement.
  oGameData.nickNamePlayerTwo = "";

  //Färg för spelare ett som tilldelas från ett formulärelement.
  oGameData.colorPlayerOne = "";

  //Färg för spelare två som tilldelas från ett formulärelement.
  oGameData.colorPlayerTwo = "";

  //Antalet sekunder för timerfunktionen
  oGameData.seconds = 5;

  //Timerns ID
  oGameData.timerId = null;

  //Från start är timern inaktiverad
  oGameData.timerEnabled = false;

  //Referens till element för felmeddelanden
  oGameData.timeRef = document.querySelector("#errorMsg");
}

const winningCombinations = [
  [0, 1, 2], // horisontella rader
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertikala rader
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonaler
  [2, 4, 6],
];

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */

function checkForGameOver() {
  if (checkWinner(oGameData.playerOne)) {
    return 1;
  } else if (checkWinner(oGameData.playerTwo)) {
    return 2;
  } else if (checkForDraw()) {
    return 3;
  }
  return 0;
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej

function checkWinner(playerIn) {
  for (const combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      oGameData.gameField[a] === playerIn &&
      oGameData.gameField[b] === playerIn &&
      oGameData.gameField[c] === playerIn
    ) {
      return true; // Spelare 1 har vunnit!
    }
  }
  return false; // Ingen vinst ännu.
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  for (let i = 0; i < oGameData.gameField.length; i++) {
    if (oGameData.gameField[i] === "") return false;
  }
  return true;

  // Fråga om varför det är mindre än och inte <=
}

/*

 const isBoardFull = oGameData.GameField.every(cell >= cell !== '');
 const hasNoWinner = !checkWinner(oGameData.colorPlayerOne) && !checkWinner(oGameData.colorPlayerTwo);
 return isBoardFull && hasNoWinner;

*/

// Nedanstående funktioner väntar vi med!
function prepGame() {
  gameAreaRef.classList.add("d-none");
  let buttonRef = document.getElementById("newGame");

  buttonRef.addEventListener("click", () => {
    initiateGame();
  });
}

function validateForm() {
  /* 
    const nick1 = document.getElementById('nick1').value;
    const nick2 = document.getElementById('nick2').value;
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;

    if (!nick1 || !nick2 || nick1 === nick2){
    
    oGameData.timeRef.textContent = "Nicknames är antingen tomma eller likadana!";
    return false;
    }
    if (color1 === color2){
    oGameData.timeRef.textContent = "Spelarna måste ha olika färger!";
    return false;
    }
    
    oGameData.nickNamePlayerOne = nick1;
    oGameData.nickNamePlayerTwo = nick2;
    oGameData.colorPlayerOne = color1;
    oGameData.colorPlayerTwo = color2;
    return true;
    */
}

// starta spelet efter att formuläret fyllts in korrekt

function initiateGame(value) {
  const formRef = document.getElementById("theForm");
  let errorMsgRef = document.getElementById("errorMsg");
  oGameData.nickNamePlayerOne = document.getElementById("nick1").value;
  oGameData.nickNamePlayerTwo = document.getElementById("nick2").value;
  oGameData.colorPlayerOne = document.getElementById("color1").value;
  oGameData.colorPlayerTwo = document.getElementById("color2").value;
  let tdRefs = document.querySelectorAll("td");

  gameAreaRef.classList.remove("d-none");

  console.log(oGameData.nickNamePlayerOne);

  errorMsgRef.textContent = "";

  for (let tdRef of tdRefs) {
    tdRef.textContent = "";
    tdRef.style.backgroundColor = "#ffffff";
  }

  for (let i = 0; i < oGameData.gameField.length; i++) {
    oGameData.gameField[i] = "";
  }

  let playerChar;
  let playerName;
  let playerColor;

  console.log(value);
  if (value < 0.5) {
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    playerColor = oGameData.colorPlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
  } else if (value >= 0.5) {
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    playerColor = oGameData.colorPlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
  }

  document.querySelector(
    ".jumbotron>h1"
  ).textContent = `Aktuell spelare är ${playerName}`;

  gameAreaRef.addEventListener("click", () => {
    executeMove();
  });
}

/*
if (validateForm()) {
prepGame();
document.getElementById("gameArea").style.display = "block";
document.getElementById("divInForm").tyle.display = "none";
oGameData.timeRef.textContent = `${oGameData.nickNamePlayerOne} (X) börjar spelet!`;
}
*/

// hantera en spelares drag när de klickar på en ruta
function executeMove(value) {
  if (event.target.tagName === "TD") {
    let clickedCell = event.target.style;
    let clickedCellID = event.target.dataset.id;
    let clickedCellText = event.target;
    if (oGameData.gameField[clickedCellID] === "") {
      if (oGameData.currentPlayer === oGameData.playerOne) {
        clickedCell.backgroundColor = oGameData.colorPlayerOne;
        oGameData.gameField.splice(clickedCellID, 1, oGameData.playerOne);
        clickedCellText.textContent = oGameData.playerOne;
        oGameData.currentPlayer = oGameData.playerTwo;
      } else {
        clickedCell.backgroundColor = oGameData.colorPlayerTwo;
        oGameData.gameField.splice(clickedCellID, 1, oGameData.playerTwo);
        clickedCellText.textContent = oGameData.playerTwo;
        oGameData.currentPlayer = oGameData.playerOne;
        console.log(checkForGameOver());
      }

      if (checkForGameOver() === 1) {
        gameOver(1);
      } else if (checkForGameOver() === 2) {
        gameOver(2);
      } else if (checkForGameOver() === 3) {
        gameOver(3);
      }
    } else {
      console.log("Redan upptagen");
    }
  }
}

/*
const index = event.
*/

function changePlayer() {}

function timer() {}

function gameOver(result) {}

/*

För att kunna se om det är Draw, så måste vi kolla om alla platser är fyllda och det är inte tre i rad.

För att kunna se om det är tre i rad, så måste vi kolla om det är tre i rad i någon av raderna, kolumnerna eller diagonalerna.

För att kunna se om det är tre i rad i någon av raderna, så måste vi kolla om det är tre i rad i rad 1, rad 2 eller rad 3.

för att se om spelet fortsätter, så måste vi först se om det är en tom ruta, om det är tre i rad eller om det är oavgjort.

Game over är om alla rutor är uppfyllda utan att det är tre i rad.

*/
