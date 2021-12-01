const fs = require('fs')

target = 2020

const entries = fs
  .readFileSync('src/day_1/input.txt', 'utf-8')
  .split('\n')
  .map((v) => parseInt(v))
  .sort((a, b) => a - b)

let i = 0
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
    break
  }
}

// calculate the answer
answer = a * b

exports.result = answer
exports.expected = 878724
