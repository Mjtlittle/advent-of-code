// require(`./days/day_${args.day}`);

const day_number = parseInt(process.argv[2]);

const {
  part_1,
  part_2,
  expected_results,
} = require(`./days/day_${day_number}`);

const check_solution = (solution: () => number, expected: number) => {
  const result = solution();
  console.log(`Solution: ${result}`);
  // console.log(`${result == expected}`);
  // console.log();
};

if (part_1) check_solution(part_1, expected_results[0]);
if (part_2) check_solution(part_2, expected_results[1]);
