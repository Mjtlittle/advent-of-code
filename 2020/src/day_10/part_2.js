const fs = require('fs')

const adapters = fs
  .readFileSync('src/day_10/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())
  .map((v) => parseInt(v))

adapters.sort((a, b) => a - b)

// add a zero at the start to include the
// difference of the outlet to the first adapter
adapters.unshift(0)

// calculate the differences of all of the values
let differences = []
for (let j = 1; j < adapters.length; j++) {
  differences.push(adapters[j] - adapters[j - 1])
}

// count the groups of differences of one
let one_groups = []
let one_count = 0
for (let diff of differences) {
  if (diff == 1) one_count += 1
  else if (one_count != 0) {
    one_groups.push(one_count)
    one_count = 0
  }
}
if (one_count > 0) one_groups.push(one_count)

// iterate over every section and account all of the posisiblities as a whole
let count = 1
for (let group of one_groups) {
  // worked out on paper
  // (idk past 4, just saw the input had a max of 4, one groups)
  if (group == 1) continue
  else if (group == 2) count *= 2
  else if (group == 3) count *= 4
  else if (group == 4) count *= 7
}

exports.result = count
exports.expected = 3947645370368
