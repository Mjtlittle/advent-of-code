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

exports.result = target
exports.expected = 756008079
