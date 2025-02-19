"use strict";

let formRef = document.querySelector("#theForm");
let gameAreaRef = document.querySelector("#gameArea");
let jumbotronRef = document.querySelector(".jumbotron>h1");

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};
initGlobalObject();

// window.addEventListener('load', () => {
//   initGlobalObject();
//   if (checkForGameOver() === 1) {
//     console.log('Spelare 1 vann');
//   } else if (checkForGameOver() === 2) {
//     console.log('Spelare 2 vann');
//   } else if (checkForGameOver() === 3) {
//     console.log('Oavgjort');
//   } else {
//     console.log('Spelet fortsätter');
//   }
// });

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */

function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

  oGameData.winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

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
prepGame();

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
  for (let combination of oGameData.winningCombinations) {
    oGameData.winningCombinations.some(function (winningCombo) {
      oGameData.gameField;
    });

    if (
      oGameData.gameField[combination[0]] === playerIn &&
      oGameData.gameField[combination[1]] === playerIn &&
      oGameData.gameField[combination[2]] === playerIn
    ) {
      return true;
    }
  }
  return false;
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  return !oGameData.gameField.includes("");
}

// FIltrera genom alla element i listan och om den hittar en tom sträng vilket är vad vi filtrerar efter så returnerar den false(?)

// Nedanstående funktioner väntar vi med!
function prepGame() {
  gameAreaRef.classList.add("d-none");
  let buttonRef = document.querySelector("#newGame");
  buttonRef.addEventListener("click", () => {
    //initGlobalObject();
    validateForm();
  });
}

function validateForm() {
  const nicknameOneRef = document.querySelector("#nick1");
  const nicknameTwoRef = document.querySelector("#nick2");
  const colorOneRef = document.querySelector("#color1");
  const colorTwoRef = document.querySelector("#color2");

  try {
    if (nicknameOneRef.value.length < 3 || nicknameTwoRef.value.length < 3) {
      throw new Error("Nickname too short");
    } else if (
      nicknameOneRef.value.length > 10 ||
      nicknameTwoRef.value.length > 10
    ) {
      throw new Error("Nickname too long");
    } else if (
      colorOneRef.value === "#000000" ||
      colorTwoRef.value === "#000000"
    ) {
      throw new Error("Color can't be black");
    } else if (
      colorOneRef.value === "#ffffff" ||
      colorTwoRef.value === "#ffffff"
    ) {
      throw new Error("Color can't be white");
    }
    document.querySelector("#errorMsg").textContent = "";
    initiateGame();
    return true;
  } catch (error) {
    console.log(error.message);
    document.querySelector("#errorMsg").textContent = error.message;
    return false;
  }
}

//Problemet med värdena i denna funktion är att
//oGameData finns, men vi har inte kört initGlobalObject() än.
//Så oGameData.playerOne
let gameAreaFunc = (event) => {
  executeMove(event);
};
function initiateGame() {
  let playerChar;
  let playerName;

  formRef.classList.add("d-none");

  gameAreaRef.classList.remove("d-none");
  let errorMsgRef = document.querySelector("#errorMsg");
  errorMsgRef.textContent = "";

  oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
  oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;
  oGameData.colorPlayerOne = document.querySelector("#color1").value;
  oGameData.colorPlayerTwo = document.querySelector("#color2").value;

  let tdRefs = document.querySelectorAll("td");
  tdRefs.forEach(function (tdRef) {
    tdRef.style.backgroundColor = "#ffffff";
    tdRef.innerText = "";
  });

  let randomValue = Math.random();
  if (randomValue < 0.5) {
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
  } else {
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
  }

  jumbotronRef.textContent = `Aktuell spelare är ${playerName}`;

  gameAreaRef.addEventListener("click", gameAreaFunc);
}

function executeMove(event) {
  if (event.target.tagName === "TD") {
    if (event.target.textContent.trim() === "") {
      oGameData.gameField[event.target.dataset.id] = oGameData.currentPlayer;
      if (oGameData.currentPlayer === oGameData.playerOne) {
        event.target.style.backgroundColor = oGameData.colorPlayerOne;
        event.target.textContent = oGameData.playerOne;

        let status = checkForGameOver();
        if (status === 1 || status === 2 || status === 3) {
          return gameOver(status);
        }
        oGameData.currentPlayer = oGameData.playerTwo;
        jumbotronRef.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
      } else if (oGameData.currentPlayer === oGameData.playerTwo) {
        event.target.style.backgroundColor = oGameData.colorPlayerTwo;
        event.target.textContent = oGameData.playerTwo;

        let status = checkForGameOver();
        if (status === 1 || status === 2 || status === 3) {
          return gameOver(status);
        }
        oGameData.currentPlayer = oGameData.playerOne;
        jumbotronRef.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
      }
    }
  }
}

function gameOver(result) {
  gameAreaRef.removeEventListener("click", gameAreaFunc);

  formRef.classList.remove("d-none");
  gameAreaRef.classList.add("d-none");
  let winner;

  if (result === 1) {
    winner = oGameData.nickNamePlayerOne;
  } else if (result === 2) {
    winner = oGameData.nickNamePlayerTwo;
  } else if (result === 3) {
    winner = "Ingen";
  }

  if (
    oGameData.nickNamePlayerOne === "" &&
    oGameData.nickNamePlayerTwo === ""
  ) {
    winner = oGameData.currentPlayer;
  }

  jumbotronRef.textContent = `${winner} vann! Spela igen?`;

  document.querySelector("#nick1").value = "";
  document.querySelector("#nick2").value = "";

  document.querySelector("#color1").value = "#ffffff";
  document.querySelector("#color2").value = "#ffffff";

  initGlobalObject();
}

function changePlayer() {}

function timer() {}
