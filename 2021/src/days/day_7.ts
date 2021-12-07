import { read_input, print } from "../lib";

const sum = (values: number[]): number => values.reduce((acc, v) => acc + v, 0);
const mean = (values: number[]): number => sum(values) / values.length;

const median = (values: number[]): number => {
  const sorted = values.sort((a, b) => b - a);
  const mid_i = Math.floor(values.length / 2);
  if (values.length % 2 !== 0) return sorted[mid_i];
  else return (sorted[mid_i - 1] + sorted[mid_i]) / 2;
};

export const part_1 = () => {
  const positions = read_input("day_7")
    .split(",")
    .map((v) => parseInt(v));

  const target = Math.floor(median(positions));
  const delta = positions.map((v) => Math.abs(v - target));
  const delta_total = sum(delta);

  return delta_total;
};

export const part_2 = () => {};

export const expected_results = [];
