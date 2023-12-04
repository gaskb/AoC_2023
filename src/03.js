import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let sum = 0;

    let parts = [];

    dataRows.forEach((row) => {
      AOC.findParts(row, parts);
    });

    console.log("parts - ", parts);

    let numbers = AOC.findPartNumbers(dataRows, parts);

    console.log("numbers - ", numbers);

    numbers.forEach((number) => {
      sum += number["number"];
    });

    console.log("sum = ", sum);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let sum = 0;

    let parts = [];

    dataRows.forEach((row) => {
      AOC.findParts(row, parts);
    });

    console.log("parts - ", parts);

    let numbers = AOC.findPartNumbers(dataRows, parts);

    console.log("numbers - ", numbers);

    numbers.forEach((number) => {
      sum += number["number"];
    });

    console.log("sum = ", sum);
  };

  static findParts = (row, parts) => {
    for (let position = 0; position < row.length; position++) {
      let char = row[position];
      if (!/\d/.test(char) && !/\./.test(char)) {
        if (!parts.includes(char)) {
          parts.push(char);
        }
      }
    }
  };

  static findPartNumbers = (dataRows, parts) => {
    let numbers = [];
    for (let yPosition = 0; yPosition < dataRows.length; yPosition++) {
      for (let xPosition = 0; xPosition < dataRows[yPosition].length; xPosition++) {
        let currentChar = dataRows[yPosition][xPosition];
        if (parts.includes(currentChar)) {
          numbers = numbers.concat(AOC.checkSurroundings_mod(yPosition, xPosition, dataRows, currentChar));
        }
      }
    }

    return numbers;
  };

  static checkSurroundings = (yPosition, xPosition, dataRows, currentChar) => {
    let numbersFound = [];

    let foundUL = false;
    let foundU = false;
    let foundUR = false;
    let foundL = false;
    let foundR = false;
    let foundDL = false;
    let foundD = false;
    let foundDR = false;

    //check UL
    if (/\d/.test(dataRows[yPosition - 1][xPosition - 1])) {
      let numberFound = { part: currentChar };
      foundUL = true;
      numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition - 1);
      numbersFound.push(numberFound);
    }
    //check U
    if (/\d/.test(dataRows[yPosition - 1][xPosition])) {
      let numberFound = { part: currentChar };
      foundU = true;
      if (!foundUL) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition);
        numbersFound.push(numberFound);
      }
    }
    //check UR
    if (/\d/.test(dataRows[yPosition - 1][xPosition + 1])) {
      let numberFound = { part: currentChar };
      foundUR = true;
      if (!foundU) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition + 1);
        numbersFound.push(numberFound);
      }
    }

    //check L
    if (/\d/.test(dataRows[yPosition][xPosition - 1])) {
      let numberFound = { part: currentChar };
      numberFound["number"] = AOC.getNumber(dataRows, yPosition, xPosition - 1);
      numbersFound.push(numberFound);
    }

    //check R
    if (/\d/.test(dataRows[yPosition][xPosition + 1])) {
      let numberFound = { part: currentChar };
      numberFound["number"] = AOC.getNumber(dataRows, yPosition, xPosition + 1);
      numbersFound.push(numberFound);
    }

    //check DL
    if (/\d/.test(dataRows[yPosition + 1][xPosition - 1])) {
      let numberFound = { part: currentChar };
      foundDL = true;
      numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition - 1);
      numbersFound.push(numberFound);
    }

    //check D
    if (/\d/.test(dataRows[yPosition + 1][xPosition])) {
      let numberFound = { part: currentChar };
      foundD = true;
      if (!foundDL) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition);
        numbersFound.push(numberFound);
      }
    }

    //check DR
    if (/\d/.test(dataRows[yPosition + 1][xPosition + 1])) {
      let numberFound = { part: currentChar };
      foundDR = true;
      if (!foundD) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition + 1);
        numbersFound.push(numberFound);
      }
    }

    console.log("numbersFound  ", numbersFound);
    return numbersFound;
  };

  static checkSurroundings_mod = (yPosition, xPosition, dataRows, currentChar) => {
    let numbersFound = [];

    let foundUL = false;
    let foundU = false;
    let foundUR = false;
    let foundL = false;
    let foundR = false;
    let foundDL = false;
    let foundD = false;
    let foundDR = false;

    //check UL
    if (/\d/.test(dataRows[yPosition - 1][xPosition - 1])) {
      let numberFound = { part: currentChar };
      foundUL = true;
      numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition - 1);
      numbersFound.push(numberFound);
    }
    //check U
    if (/\d/.test(dataRows[yPosition - 1][xPosition])) {
      let numberFound = { part: currentChar };
      foundU = true;
      if (!foundUL) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition);
        numbersFound.push(numberFound);
      }
    }
    //check UR
    if (/\d/.test(dataRows[yPosition - 1][xPosition + 1])) {
      let numberFound = { part: currentChar };
      foundUR = true;
      if (!foundU) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition - 1, xPosition + 1);
        numbersFound.push(numberFound);
      }
    }

    //check L
    if (/\d/.test(dataRows[yPosition][xPosition - 1])) {
      let numberFound = { part: currentChar };
      numberFound["number"] = AOC.getNumber(dataRows, yPosition, xPosition - 1);
      numbersFound.push(numberFound);
    }

    //check R
    if (/\d/.test(dataRows[yPosition][xPosition + 1])) {
      let numberFound = { part: currentChar };
      numberFound["number"] = AOC.getNumber(dataRows, yPosition, xPosition + 1);
      numbersFound.push(numberFound);
    }

    //check DL
    if (/\d/.test(dataRows[yPosition + 1][xPosition - 1])) {
      let numberFound = { part: currentChar };
      foundDL = true;
      numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition - 1);
      numbersFound.push(numberFound);
    }

    //check D
    if (/\d/.test(dataRows[yPosition + 1][xPosition])) {
      let numberFound = { part: currentChar };
      foundD = true;
      if (!foundDL) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition);
        numbersFound.push(numberFound);
      }
    }

    //check DR
    if (/\d/.test(dataRows[yPosition + 1][xPosition + 1])) {
      let numberFound = { part: currentChar };
      foundDR = true;
      if (!foundD) {
        numberFound["number"] = AOC.getNumber(dataRows, yPosition + 1, xPosition + 1);
        numbersFound.push(numberFound);
      }
    }

    if (numbersFound.length == 2 && currentChar == "*") {
      let gerRatio = numbersFound[0]["number"] * numbersFound[1]["number"];
      numbersFound = [{ part: currentChar, number: gerRatio }];
    } else {
      numbersFound = [{ part: currentChar, number: 0 }];
    }

    console.log("numbersFound  ", numbersFound);
    return numbersFound;
  };

  static getNumber = (dataRows, yPosition, xPosition) => {
    let lastDigit = xPosition;
    let digits = [];

    //recupero l'ultima cifra a destra
    while (/\d/.test(dataRows[yPosition][xPosition])) {
      console.log("primo while dataRows[yPosition][xPosition]", dataRows[yPosition][xPosition]);
      lastDigit = xPosition;
      xPosition++;
    }

    xPosition--;

    //recupero tutte le cifre e le metteo in digits
    while (/\d/.test(dataRows[yPosition][xPosition])) {
      console.log("secondo while dataRows[yPosition][xPosition]", dataRows[yPosition][xPosition]);
      digits.push(parseInt(dataRows[yPosition][xPosition]));
      xPosition--;
    }

    //trovo il numero completo
    let number = 0;
    console.log("digits = ", digits);
    while (digits.length > 0) {
      console.log("number = ", number);
      number = number * 10 + digits.pop();
    }
    console.log("number = ", number);
    return number;
  };

  //AOC
}

export default AOC;
