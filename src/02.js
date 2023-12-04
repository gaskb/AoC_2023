import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    const limits = {
      data: [
        { color: "red", limit: 12 },
        { color: "green", limit: 13 },
        { color: "blue", limit: 14 },
      ],
    };

    let sum = 0;

    let gameData = [];
    dataRows.forEach((row) => {
      gameData.push(AOC.readRow(row));
    });

    gameData.forEach((game) => {
      console.log("game ", game["id"]);
      if (AOC.checkPossible(limits["data"], game["data"])) {
        console.log("game[data] ", game["data"]);
        sum += parseInt(game["id"]);
        console.log("sum = ", sum);
      }

      console.log(" ");
      console.log(" ");
      console.log(" ");
    });

    // console.log(JSON.stringify(gameData));
    // console.dir(gameData, { depth: null });

    console.log("sum = ", sum);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    const limits = {
      data: [
        { color: "red", limit: 12 },
        { color: "green", limit: 13 },
        { color: "blue", limit: 14 },
      ],
    };

    let sum = 0;

    let gameData = [];
    dataRows.forEach((row) => {
      gameData.push(AOC.readRow(row));
    });

    gameData.forEach((game) => {
      console.log("game ", game["id"]);
      let power = AOC.getSetPower(game["data"]);

      sum += power;
    });

    // console.log(JSON.stringify(gameData));
    // console.dir(gameData, { depth: null });

    console.log("sum = ", sum);
  };

  static readRow = (row) => {
    let gameId = row.split(":")[0].split(" ")[1];
    let rawData = row.split(":")[1].split(";");

    let gameData = { id: gameId, data: [] };

    console.log("rawData - ", rawData);
    let matchCounter = 0;

    rawData.forEach((matchData) => {
      matchCounter++;
      console.log("matchData - ", matchData);
      matchData = matchData.split(",");
      console.log("matchData - ", matchData);

      matchData.forEach((match) => {
        let data = {};
        console.log("match - ", match);
        match = match.split(" ");
        console.log("match - ", match);
        let color = match[2];
        let number = match[1];
        data["color"] = color;
        data["number"] = parseInt(number);
        data["match"] = matchCounter;

        console.log("data - ", data);
        gameData["data"].push(data);
      });

      console.log(" ");
    });

    // gameData["data"].sort((a, b) => a.color - b.color);

    return gameData;
  };

  static getSetPower = (dataToCheck) => {
    let maxRed = 0;
    let maxBlue = 0;
    let maxGreen = 0;

    for (let match = 0; match < dataToCheck.length; match++) {
      let matchRow = dataToCheck[match];
      if (matchRow["color"] == "red") {
        if (matchRow["number"] > maxRed) {
          maxRed = matchRow["number"];
        }
      }
      if (matchRow["color"] == "green") {
        if (matchRow["number"] > maxGreen) {
          maxGreen = matchRow["number"];
        }
      }
      if (matchRow["color"] == "blue") {
        if (matchRow["number"] > maxBlue) {
          maxBlue = matchRow["number"];
        }
      }
    }

    return maxBlue * maxRed * maxGreen;
  };

  static checkPossible = (limits, dataToCheck) => {
    for (let i = 0; i < limits.length; i++) {
      let colorRow = limits[i];

      for (let j = 0; j < dataToCheck.length; j++) {
        let dataRow = dataToCheck[j];

        console.log("colorRow[color]", colorRow["color"]);
        console.log("dataRow[color]", dataRow["color"]);

        if (colorRow["color"] == dataRow["color"]) {
          console.log("colorRow[limit]", colorRow["limit"]);
          console.log("dataRow[number]", dataRow["number"]);

          if (colorRow["limit"] < dataRow["number"]) {
            console.log(
              "Found not possible! ",
              dataRow,
              " - with limits ",
              limits
            );
            return false; // Questo uscirà dalla funzione corrente
          }
        } else {
          console.log("Found possible! ", dataRow, " - with limits ", limits);
        }
      }
    }

    return true;
  };

  //AOC
}

export default AOC;
