// import './appenv';
import AOC from "./01";

async function startAoc() {
  const aoc = new AOC();
  // const input1 = "input/03_test_1.txt";
  // await aoc.part1(input1);
  const input2 = "input/01.txt";
  await aoc.part2(input2);
}

startAoc();
