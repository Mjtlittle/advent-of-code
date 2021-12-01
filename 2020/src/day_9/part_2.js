const fs = require('fs')

const preamble_size = 25
// preamble, the 25 values before any number
// (ik thats not what its means but I need a word for it)

const data = fs
  .readFileSync('src/day_9/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())
  .map((v) => parseInt(v))

const check_valid = (preamble, target) => {
  preamble.sort()

  let i = 0
  let j = preamble.length - 1
  while (true) {
    // make sure j is not at 1
    if (j == 0) return false

    // make sure largest operand is not greater than target
    // or that the second operand is not the first target or greater
    vj = preamble[j]
    if (i >= j || vj > target) {
      j -= 1
      i = 0
      continue
    }

    // check if the two values sum to the target
    vi = preamble[i]
    if (vi + vj == target) return true
    else i += 1
  }
}

// get the first number that does not have two values in the
// preceeding preamble that add up to the number
let preamble, target
for (let i = preamble_size; i < data.length; i++) {
  target = data[i]

  preamble = data.slice(i - preamble_size, i)
  if (!check_valid(preamble, target)) break
}

// get the range of values that add up to the target
// the running sum at any 'i' will equal the running sum of any 'j' minus the target when the range 'i' to 'j' sums to the target
// ie. if 'P' is the cummulative sum of the data P_i = P_j - target
// so checking if/where this difference has been visited, that index and 'j' will be the range that sums to the target

// P_i's and their respective index
let visited = {}

// iterate over all values
let j, diff
let running_sum = 0
for (j = 0; j < data.length; j++) {
  // make running sum P_j
  running_sum += data[j]

  // the differnce between P_j and the target
  diff = running_sum - target

  // if the difference is equal to one of the P_i's
  if (visited.hasOwnProperty(diff)) break

  // rare case if 'i' in range is zero
  if (running_sum == target) break

  // add the P_i/P_j to the visited
  visited[running_sum] = j
}
const range_start = visited[diff] + 1
const range_end = j

// find the min and maximum in the range
let max = 0
let min = data[range_end]
let value
for (let i = range_start; i < range_end + 1; i++) {
  value = data[i]
  if (value > max) max = value
  if (value < min) min = value
}

exports.result = min + max
exports.expected = 93727241
