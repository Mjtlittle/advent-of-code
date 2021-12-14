import { read_input, print } from "../lib";

type State = number[][];

const rows = 10;
const cols = 10;
const directions = [
  { dcol: 1, drow: 0 },
  { dcol: -1, drow: 0 },
  { dcol: 0, drow: -1 },
  { dcol: 0, drow: 1 },
  { dcol: 1, drow: 1 },
  { dcol: 1, drow: -1 },
  { dcol: -1, drow: 1 },
  { dcol: -1, drow: -1 },
];
const is_within = (row: number, col: number) =>
  row >= 0 && row < rows && col >= 0 && col < cols;
const increase_around = (state: State, row: number, col: number) => {
  directions
    .map(({ drow, dcol }) => ({ row: row + dcol, col: col + dcol }))
    .filter(({ row, col }) => is_within(row, col))
    .forEach(({ row, col }) => (state[row][col] += 1));
};
const reset_flashed = (state: State): number => {
  let flashes = 0;
  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      if (state[ri][ci] > 9) {
        state[ri][ci] = 0;
        flashes += 1;
      }
    }
  }
  return flashes;
};
const copy_state = (s: State): State => s.map((r) => [...r]);
const tick_state = (s: State): { next_state: State; flashes: number } => {
  let flashes = 0;

  return { next_state, flashes };
};

export const part_1 = () => {
  const starting_state: State = read_input("day_11_example")
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

  print(starting_state);
};

export const part_2 = () => {};

export const expected_results = [];
