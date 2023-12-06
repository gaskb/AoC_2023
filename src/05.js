import Utils from "./utils";

class AOC {
  part1 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);
    let maps = AOC.readMaps(dataRows);
    // Utils.printComplexObject(maps);

    let locations = AOC.findRightLocations(maps);

    console.log("locations ", locations);
  };

  part2 = async (inputFile) => {
    const inputData = await Utils.getInputData(inputFile);
    const dataRows = await Utils.getDataRows(inputData);
    let maps = AOC.readMapsUpdated(dataRows);

    // Utils.printComplexObject(maps);

    let location = AOC.findRightLocationsUpdated(maps);

    console.log("location ", location);
  };

  static findRightLocations = (data) => {
    let locations = [];
    for (let seedsCounter = 0; seedsCounter < data["seeds"].length; seedsCounter++) {
      const seed = parseInt(data["seeds"][seedsCounter]);
      let soil = AOC.getNextStep(seed, data["seed-to-soil"]);
      let fertilizer = AOC.getNextStep(soil, data["soil-to-fertilizer"]);
      let water = AOC.getNextStep(fertilizer, data["fertilizer-to-water"]);
      let light = AOC.getNextStep(water, data["water-to-light"]);
      let temperature = AOC.getNextStep(light, data["light-to-temperature"]);
      let humidity = AOC.getNextStep(temperature, data["temperature-to-humidity"]);
      let location = AOC.getNextStep(humidity, data["humidity-to-location"]);

      locations.push(location);
    }

    return locations.sort((a, b) => a - b);
  };

  static findRightLocationsUpdated = (data) => {
    let minLocation = 0;
    let seedStart = data["seeds"]["startingSeeds"];
    let seedNumbers = data["seeds"]["seedsNumber"];
    let iterations = 0;

    console.log("seedStart ", seedStart);
    console.log("seedNumber ", seedNumbers);

    for (let counter = 0; counter < seedStart.length; counter++) {
      let firstSeed = seedStart[counter];
      let seedNumber = seedNumbers[counter];

      iterations += seedNumber;

      console.log("firstSeed ", firstSeed);
      console.log("seedNumbers ", seedNumber);

      for (let seed = firstSeed; seed < firstSeed + seedNumber; seed++) {
        let soil = AOC.getNextStep(seed, data["seed-to-soil"]);
        let fertilizer = AOC.getNextStep(soil, data["soil-to-fertilizer"]);
        let water = AOC.getNextStep(fertilizer, data["fertilizer-to-water"]);
        let light = AOC.getNextStep(water, data["water-to-light"]);
        let temperature = AOC.getNextStep(light, data["light-to-temperature"]);
        let humidity = AOC.getNextStep(temperature, data["temperature-to-humidity"]);
        let location = AOC.getNextStep(humidity, data["humidity-to-location"]);

        if (minLocation == 0 || location < minLocation) {
          minLocation = location;
        }
      }
    }
    console.log("iterations = ", iterations);
    return minLocation;
  };

  static getNextStep = (startingValue, map) => {
    let result = 0;
    for (let mapCounter = 0; mapCounter < map.length; mapCounter++) {
      const dataMap = map[mapCounter];

      if (startingValue >= dataMap["source"] && startingValue <= dataMap["source"] + dataMap["range"]) {
        result = startingValue - dataMap["source"] + dataMap["destination"];

        return result;
      }
    }
    if (result == 0) {
      result = startingValue;
    }

    return result;
  };

  static readMaps = (dataRows) => {
    let seeds = [];
    let currentMap = "";
    let maps = {};

    for (let rowNumber = 0; rowNumber < dataRows.length; rowNumber++) {
      let row = dataRows[rowNumber];

      console.log("row - ", row);
      if (!/^[0-9a-z]/.test(row)) {
        // console.log("new map");
        currentMap = "";
        continue;
      }
      if (currentMap == "") {
        if (row.includes("seeds")) {
          // console.log("seeds");
          maps["seeds"] = {};
          seeds = row.split(": ")[1].split(" ");
          maps["seeds"] = seeds;
        }
        if (row.includes("seed-to-soil")) {
          // console.log("seed-to-soil");
          currentMap = "seed-to-soil";
        }
        if (row.includes("soil-to-fertilizer")) {
          // console.log("soil-to-fertilizer");
          currentMap = "soil-to-fertilizer";
        }
        if (row.includes("fertilizer-to-water")) {
          // console.log("fertilizer-to-water");
          currentMap = "fertilizer-to-water";
        }
        if (row.includes("water-to-light")) {
          // console.log("water-to-light");
          currentMap = "water-to-light";
        }
        if (row.includes("light-to-temperature")) {
          // console.log("light-to-temperature");
          currentMap = "light-to-temperature";
        }
        if (row.includes("temperature-to-humidity")) {
          // console.log("temperature-to-humidity");
          currentMap = "temperature-to-humidity";
        }
        if (row.includes("humidity-to-location")) {
          // console.log("humidity-to-location");
          currentMap = "humidity-to-location";
        }
        if (currentMap != "") {
          maps[currentMap] = [];
        }

        continue;
      }

      console.log(currentMap);

      if (!/^[0-9a-z]/.test(row)) {
        // console.log("empty row");
        continue;
      }
      if (/^[a-z]/.test(row) && currentMap != "seeds") {
        // console.log("title row");
        continue;
      }

      Utils.printComplexObject(maps);

      // console.log("else - ", row);
      let rawData = row.split(" ");
      let data = { source: parseInt(rawData[1]), destination: parseInt(rawData[0]), range: parseInt(rawData[2]) };
      maps[currentMap].push(data);
    }

    return maps;
  };

  static readMapsUpdated = (dataRows) => {
    let currentMap = "";
    let maps = {};

    for (let rowNumber = 0; rowNumber < dataRows.length; rowNumber++) {
      let row = dataRows[rowNumber];
      if (!/^[0-9a-z]/.test(row)) {
        currentMap = "";
        continue;
      }
      if (currentMap == "") {
        if (row.includes("seeds")) {
          maps["seeds"] = {};
          let seedsData = row.split(": ")[1].split(" ");
          let seedStart = [];
          let seedNumber = [];

          for (let counter = 0; counter < seedsData.length; counter++) {
            let seed = parseInt(seedsData[counter]);
            if ((counter + 2) % 2 == 0) {
              seedStart.push(seed);
            } else {
              seedNumber.push(seed);
            }
          }

          maps["seeds"]["startingSeeds"] = seedStart;
          maps["seeds"]["seedsNumber"] = seedNumber;
        }
        if (row.includes("seed-to-soil")) {
          currentMap = "seed-to-soil";
        }
        if (row.includes("soil-to-fertilizer")) {
          currentMap = "soil-to-fertilizer";
        }
        if (row.includes("fertilizer-to-water")) {
          currentMap = "fertilizer-to-water";
        }
        if (row.includes("water-to-light")) {
          currentMap = "water-to-light";
        }
        if (row.includes("light-to-temperature")) {
          currentMap = "light-to-temperature";
        }
        if (row.includes("temperature-to-humidity")) {
          currentMap = "temperature-to-humidity";
        }
        if (row.includes("humidity-to-location")) {
          currentMap = "humidity-to-location";
        }
        if (currentMap != "") {
          maps[currentMap] = [];
        }

        continue;
      }

      if (!/^[0-9a-z]/.test(row)) {
        continue;
      }
      if (/^[a-z]/.test(row) && currentMap != "seeds") {
        continue;
      }

      let rawData = row.split(" ");
      let data = { source: parseInt(rawData[1]), destination: parseInt(rawData[0]), range: parseInt(rawData[2]) };
      maps[currentMap].push(data);
    }

    Utils.printComplexObject(maps["seeds"]);

    return maps;
  };

  //AOC
}

export default AOC;
