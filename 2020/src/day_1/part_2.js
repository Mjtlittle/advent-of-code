const fs = require('fs')

final_target = 2020

const entries = fs
  .readFileSync('src/day_1/input.txt', 'utf-8')
  .split('\n')
  .map((v) => parseInt(v))
  .sort((a, b) => a - b)

const find_sum_pair_in_range = (start, target) => {
  let i = start
  let j = entries.length - 1

  let a, b
  while (i < j) {
    // get the two entries
    a = entries[i]
    b = entries[j]

    // and sum them
    sum = a + b

    // if sum is greater than the target sum
    // move the right pointer to the left to decrese the sum
    if (sum > target) {
      j -= 1
    }

    // if the sum is less than the target sum
    // move the left pointer to the right to increase the sum
    else if (sum < target) {
      i += 1
    }

    // otherwise the solution is found
    else {
      return [a, b]
    }
  }

  // if no solution is found return false
  return false
}

// iterate over all values to then check for the next two entries
let first, result
for (let i = 0; i < entries.length - 2; i++) {
  // get the first value in the entries to check
  first = entries[i]

  // find the resulting sum past the first pointer
  result = find_sum_pair_in_range(i + 1, final_target - first)

  // if the solution is found
  if (result != false) {
    break
  }
}

answer = first * result[0] * result[1]

exports.result = answer
exports.expected = 201251610
