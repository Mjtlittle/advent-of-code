import { read_input, print } from "../lib";

export const part_1 = () => {
  const depths = read_input("day_1")
    .split("\n")
    .map((line) => parseInt(line));

  let increase_count = 0;
  let previous = depths[0];
  for (const depth of depths) {
    if (depth > previous) increase_count++;
    previous = depth;
  }

  return increase_count;
};

export const part_2 = () => {
  const window_size = 3;
  const depths = read_input("day_1")
    .split("\n")
    .map((line) => parseInt(line));

  let increase_count = 0;
  let previous_sum = null;
  let current_sum = 0;

  for (let i = 0; i < depths.length; i++) {
    // add the head of the window
    current_sum += depths[i];

    if (i >= window_size) {
      // remove the tail of the window
      current_sum -= depths[i - window_size];

      // count if increased
      if (current_sum > previous_sum) increase_count++;
    }

    previous_sum = current_sum;
  }

  return increase_count;
};

export const expected_results = [1475, 1516];
