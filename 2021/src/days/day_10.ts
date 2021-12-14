import { read_input, print } from "../lib";

const closing_lookup = {
  "{": "}",
  "[": "]",
  "<": ">",
  "(": ")",
};

const openings = new Set("{[<(".split(""));

const is_valid_chunk = (chunk: string[]): string | null => {
  const closing_stack = [];
  for (const char of chunk) {
    if (openings.has(char)) {
      const closing_char = closing_lookup[char];
      closing_stack.push(closing_char);
    } else if (closing_stack.length == 0) {
      return char;
    } else if (closing_stack[closing_stack.length - 1] == char) {
      closing_stack.pop();
    } else {
      return char;
    }
  }
  if (closing_stack.length == 0) return "";
  else {
    return closing_stack.reverse().join("");
  }
};

export const part_1 = () => {
  const chunks = read_input("day_10_example")
    .split("\n")
    .map((line) => line.split(""));

  const scoring = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const error_score = chunks
    .map(is_valid_chunk)
    .filter((v) => v.length == 1)
    .map((v) => scoring[v])
    .reduce((acc, v) => acc + v, 0);

  return error_score;
};

export const part_2 = () => {
  const chunks = read_input("day_10")
    .split("\n")
    .map((line) => line.split(""));

  const scoring = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const scores = chunks
    .map(is_valid_chunk)
    .filter((v) => v.length > 1)
    .map((v) =>
      v
        .split("")
        .map((v) => scoring[v])
        .reduce((acc, v) => acc * 5 + v, 0)
    )
    .sort((a, b) => a - b);
  const middle_score = scores[~~(scores.length / 2)];
  return middle_score;
};

export const expected_results = [];
