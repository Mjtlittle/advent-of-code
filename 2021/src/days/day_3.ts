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

  const power = gamma * epsilon;
  return power;
};

export const part_2 = () => {
  const input_values = read_input("day_3").split("\n");
  const digits = input_values[0].length;
  const value_count = input_values.length;

  const count_ones = (values: string[], index: number) =>
    values.reduce(
      (acc, value) => (value.charAt(index) === "1" ? acc + 1 : acc),
      0
    );

  const filter_on_position = (
    values: string[],
    index: number,
    expected: string
  ) => values.filter((value) => value.charAt(index) === expected);

  type RCond = (one_count: number, values_left: number) => boolean;
  const final_reducer = (condition: RCond) => {
    let current_values = [...input_values];
    let i = 0;
    while (current_values.length > 1) {
      const one_count = count_ones(current_values, i);
      const values_left = current_values.length;
      const expect_one = condition(one_count, values_left);
      const expected_digit = expect_one ? "1" : "0";

      current_values = filter_on_position(current_values, i, expected_digit);
      i++;
    }
    return parseInt(current_values[0], 2);
  };

  const oxygen_rating = final_reducer(
    (one_count, values_left) => one_count >= values_left / 2
  );
  const co2_rating = final_reducer(
    (one_count, values_left) => one_count < values_left / 2
  );

  const life_support_rating = oxygen_rating * co2_rating;
  return life_support_rating;
};

export const expected_results = [];
