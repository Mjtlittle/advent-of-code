import { read_input, print } from "../lib";

interface Instruction {
  ins: string;
  value: number;
}

const get_instrutions = () =>
  read_input("day_2")
    .split("\n")
    .map((line) => line.split(" "))
    .map(([ins, value]) => ({
      ins,
      value: parseInt(value),
    }));

export const part_1 = () => {
  const instructions = get_instrutions();

  let depth = 0;
  let position = 0;

  for (const { ins, value } of instructions) {
    if (ins === "forward") position += value;
    else if (ins === "up") depth -= value;
    else if (ins === "down") depth += value;
  }

  return depth * position;
};

export const part_2 = () => {
  const instructions = get_instrutions();

  let aim = 0;
  let position = 0;
  let depth = 0;

  for (const { ins, value } of instructions) {
    if (ins === "forward") {
      position += value;
      depth += aim * value;
    } else if (ins === "up") aim -= value;
    else if (ins === "down") aim += value;
  }

  return depth * position;
};

export const expected_results = [1989265, 2089174012];
