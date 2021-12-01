const fs = require('fs')

const adapters = fs
  .readFileSync('src/day_10/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())
  .map((v) => parseInt(v))

adapters.sort((a, b) => a - b)

let one_diff = 0
let three_diff = 0

const count_difference = (a, b) => {
  const diff = b - a
  if (diff == 1) one_diff += 1
  else if (diff == 3) three_diff += 1
}

const device_joltage = adapters[adapters.length - 1] + 3
count_difference(adapters[adapters.length - 1], device_joltage)

count_difference(0, adapters[0])

for (let j = 1; j < adapters.length; j++) {
  count_difference(adapters[j - 1], adapters[j])
}

exports.result = one_diff * three_diff
exports.expected = 2244
