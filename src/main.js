// import './appenv';
import AOC from "./05";

async function startAoc() {
  const aoc = new AOC();
  // const input1 = "input/05.txt";
  // await aoc.part1(input1);
  const input2 = "input/05.txt";
  await aoc.part2(input2);
}

startAoc();
