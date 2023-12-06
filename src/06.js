import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let regexNumeri = /\d+/g; // Regex per corrispondere a uno o più numeri

    let times = dataRows[0].match(regexNumeri);
    let distances = dataRows[1].match(regexNumeri);
    // Converti gli elementi dell'array da stringhe a numeri
    times = times.map(Number);
    distances = distances.map(Number);

    let validSolutions = [];
    for (let raceId = 0; raceId < times.length; raceId++) {
      const time = times[raceId];
      const distance = distances[raceId];
      validSolutions.push(AOC.findValidSolutions(time, distance));
    }

    console.log("validSolutions", validSolutions);

    let total = 1;

    for (let counter = 0; counter < validSolutions.length; counter++) {
      const row = validSolutions[counter];
      total *= row.length;
    }

    console.log("total", total);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);

    let regexNumeri = /\d+/g; // Regex per corrispondere a uno o più numeri

    let time = parseInt(dataRows[0].match(regexNumeri).join(""));
    let distance = parseInt(dataRows[1].match(regexNumeri).join(""));

    let validSolutions = AOC.findValidSolutions(time, distance);

    console.log("solutions = ", validSolutions);

    console.log("time ", time);
    console.log("distance ", distance);
  };

  static findValidSolutions = (totalTime, maxDistance) => {
    //let validSolutions = [];
    let countValidSolutions = 0;

    for (let time = 0; time < totalTime; time++) {
      let distance = time * (totalTime - time);
      if (distance > maxDistance) {
        //validSolutions.push(distance);
        countValidSolutions++;
      }
    }
    return countValidSolutions;
  };

  //AOC
}

export default AOC;
