// import './appenv';
import AOC from "./06";

async function startAoc() {
  const aoc = new AOC();
  // const input1 = "input/06.txt";
  // await aoc.part1(input1);
  const input2 = "input/06.txt";
  await aoc.part2(input2);
}

startAoc();
