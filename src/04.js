import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let sum = 0;

    dataRows.forEach((row) => {
      sum += AOC.readScratchcards(row);
    });

    console.log("sum = ", sum);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let cardNumber = 0;
    let cards = [];

    dataRows.forEach((row) => {
      let cardId = row.split(":")[0].replace(/\s+/g, " ").split(" ")[1];
      cards.push({ cardId: parseInt(cardId), winningNumbers: AOC.readScratchcardsUpdated(row), cardCopy: 1 });
    });

    cards.forEach((card) => {
      let cardId = card["cardId"];
      let winningNumbers = card["winningNumbers"];
      let cardCopy = card["cardCopy"];

      while (winningNumbers > 0) {
        for (let index = 0; index < cards.length; index++) {
          let newCard = cards[index];
          if (newCard["cardId"] === cardId + winningNumbers) {
            newCard["cardCopy"] = newCard["cardCopy"] + cardCopy;
          }
        }
        winningNumbers--;
      }
    });

    cards.forEach((card) => {
      cardNumber += card["cardCopy"];
    });

    console.log("cardNumber = ", cardNumber);
  };

  static readScratchcards = (row) => {
    let winningNumbers = row.split(":")[1].split("|")[0];
    let myNumbers = row.split(":")[1].split("|")[1];

    winningNumbers = winningNumbers.split(" ");
    myNumbers = myNumbers.split(" ");

    let points = 0;
    let counter = 0;
    myNumbers.forEach((myNumber) => {
      if (myNumber == " " || myNumber == "") {
        //do nothing
      } else {
        if (winningNumbers.includes(myNumber)) {
          if (counter == 0) {
            counter++;
            points = 1;
          } else {
            points *= 2;
          }
        }
      }
    });

    return points;
  };

  static readScratchcardsUpdated = (row) => {
    let winningNumbers = row.split(":")[1].split("|")[0];
    let myNumbers = row.split(":")[1].split("|")[1];

    winningNumbers = winningNumbers.split(" ");
    myNumbers = myNumbers.split(" ");

    let points = 0;

    myNumbers.forEach((myNumber) => {
      if (myNumber == " " || myNumber == "") {
        //do nothing
      } else {
        if (winningNumbers.includes(myNumber)) {
          points++;
        }
      }
    });

    return points;
  };

  //AOC
}

export default AOC;
