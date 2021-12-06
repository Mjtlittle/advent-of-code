import { read_input, print } from "../lib";

export const part_1 = () => {
  const values = read_input("day_3").split("\n");
  const digits = values[0].length;
  const value_count = values.length;

  // count up how many ones are in each column
  let one_count = Array(digits).fill(0);
  for (const value of values) {
    for (let i = 0; i < digits; i++) {
      const char = value.charAt(i);
      if (char === "1") one_count[i] += 1;
    }
  }

  // generate the power values
  let gamma = 0;
  let epsilon = 0;
  const final_value_arr = one_count.map((v) => v > value_count / 2);
  for (const active of final_value_arr) {
    // update gamma
    gamma *= 2;
    if (active) gamma += 1;

    // update epsilon
    epsilon *= 2;
    if (!active) epsilon += 1;
  }

  let power = gamma * epsilon;
  return power;
};

export const part_2 = () => {};

export const expected_results = [];
