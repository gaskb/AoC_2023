import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let sum = 0;

    dataRows.forEach((row) => {
      let numberFound = 0;
      for (let position = 0; position < row.length; position++) {
        let char = row[position];
        if (/\d/.test(char)) {
          numberFound += parseInt(char) * 10;
          break;
        }
      }

      for (let position = row.length - 1; position >= 0; position--) {
        let char = row[position];
        if (/\d/.test(char)) {
          numberFound += parseInt(char);
          break;
        }
      }

      console.log("numberFound = ", numberFound);
      sum += numberFound;
    });

    console.log("sum = ", sum);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let sum = 0;

    dataRows.forEach((row) => {
      let spelled = AOC.findSpelledNumbersPositions(row);
      let digits = AOC.findDigitPositions(row);

      let numberFound = 0;

      // console.log("spelled ", spelled)
      // console.log("digits ", digits)
      //finding first number
      if (
        digits.length == 0 ||
        (spelled.length > 0 && spelled[0]["position"] < digits[0]["position"])
      ) {
        numberFound += spelled[0]["number"] * 10;
      } else {
        numberFound += digits[0]["number"] * 10;
      }

      let lastSpelledIndex = spelled.length - 1;
      let lastDigitIndex = digits.length - 1;

      //finding last number
      if (
        digits.length == 0 ||
        (spelled.length > 0 &&
          spelled[lastSpelledIndex]["position"] >
            digits[lastDigitIndex]["position"])
      ) {
        numberFound += spelled[lastSpelledIndex]["number"];
      } else {
        numberFound += digits[lastDigitIndex]["number"];
      }

      console.log("numberFound = ", numberFound);
      console.log(" ");
      console.log(" ");
      sum += numberFound;
    });

    console.log("sum = ", sum);
  };

  static findSpelledNumbersPositions = (row) => {
    let positions = [];
    let numbers = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];

    console.log("checking row = ", row);

    for (let number = 0; number < numbers.length; number++) {
      let spelledNumber = numbers[number];
      let position = row.indexOf(spelledNumber);
      //will find all occurrencies of "spelledNumber"
      while (position !== -1) {
        positions.push({ position, number });
        position = row.indexOf(spelledNumber, position + 1);
      }
    }

    positions.sort((a, b) => a.position - b.position);

    return positions;
  };

  static findDigitPositions = (row) => {
    let positions = [];
    for (let position = 0; position < row.length; position++) {
      if (/\d/.test(row[position])) {
        positions.push({ position, number: parseInt(row[position]) });
      }
    }
    return positions;
  };

  //AOC
}

export default AOC;
