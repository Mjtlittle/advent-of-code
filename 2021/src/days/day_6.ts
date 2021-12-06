import { count } from "console";
import { read_input, print } from "../lib";

type TimerCount = Map<number, number>;

const add_to_count = (
  timer_count: TimerCount,
  value: number,
  delta: number
) => {
  if (!timer_count.has(value)) timer_count.set(value, 0);
  timer_count.set(value, timer_count.get(value) + delta);
};

const add_up_count = (timer_count: TimerCount): number => {
  let total = 0;
  timer_count.forEach((count) => (total += count));
  return total;
};

const tick = (timer_count: TimerCount): TimerCount => {
  let new_count = new Map<number, number>();
  timer_count.forEach((count, value) => {
    if (value == 0) {
      add_to_count(new_count, 6, count);
      add_to_count(new_count, 8, count);
    } else {
      add_to_count(new_count, value - 1, count);
    }
  });
  return new_count;
};

const count_after_days = (timers: number[], days: number): number => {
  // build out the count
  let timer_count: TimerCount = new Map();
  timers.forEach((value) => add_to_count(timer_count, value, 1));

  // iterate 80 times
  for (let i = 0; i < days; i++) timer_count = tick(timer_count);

  // count every timer
  const final_count = add_up_count(timer_count);

  return final_count;
};

export const part_1 = () => {
  const timers = read_input("day_6")
    .split(",")
    .map((v) => parseInt(v));

  return count_after_days(timers, 80);
};

export const part_2 = () => {
  const timers = read_input("day_6")
    .split(",")
    .map((v) => parseInt(v));

  return count_after_days(timers, 256);
};

export const expected_results = [375482, 1689540415957];
