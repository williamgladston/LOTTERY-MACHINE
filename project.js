const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOL_VALUE = {
  A: 5,
  B: 3,
  C: 4,
  D: 2,
};

const deposite = () => {
  while (true) {
    const depositeAmount = prompt(" Enter the amount here : ");
    const numberdepositeAmount = parseFloat(depositeAmount);
    // console.log(numberdepositeAmount);

    if (isNaN(numberdepositeAmount) || numberdepositeAmount < 0) {
      console.log("Invalid !!! try again");
    } else {
      return numberdepositeAmount;
    }
  }
};

const lines = () => {
  while (true) {
    const lines = prompt(" Enter the no. of lines here [0-3] : ");
    const numberLines = parseFloat(lines);
    // console.log(numberdepositeAmount);

    if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3) {
      console.log("Invalid !!! try again");
    } else {
      return numberLines;
    }
  }
};

const getBet = (balance, numberOfLines) => {
  while (true) {
    const getBet = prompt(" Enter the Bet : ");
    const numberGetBet = parseFloat(getBet);
    // console.log(numberdepositeAmount);

    if (
      isNaN(numberGetBet) ||
      numberGetBet <= 0 ||
      numberGetBet > balance / numberOfLines
    ) {
      console.log("Invalid !!! try again");
    } else {
      return numberGetBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (j = 0; j < ROWS; j++) {
      const randonIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbols = reelSymbols[randonIndex];
      reels[i].push(selectedSymbols);
      reelSymbols.splice(randonIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinning = (rows, bet, lines) => {
  let winning = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winning += bet * SYMBOL_VALUE[symbols[0]];
    }
  }
  return winning;
};

const game = () => {
  let balance = deposite();
  while (true) {
    console.log("You have Balance $" + balance);
    const numberOfLines = lines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winning = getWinning(rows, bet, numberOfLines);
    balance += winning;
    console.log("You Won $" + winning.toString());

    if (balance <= 0) {
      console.log("You run of MONEY !!!");
      break;
    }
    const playAgain = prompt("Do you want to continue (y/n)?");
    if (playAgain != "y") break;
  }
};
game();
