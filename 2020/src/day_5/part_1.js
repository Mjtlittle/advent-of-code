const fs = require('fs')

const boarding_passes = fs
  .readFileSync('src/day_5/input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.trim())

const binary_search = (string, max_value, low_char, high_char) => {
  let lower_bound = 0
  let upper_bound = max_value

  for (const char of string) {
    const width = upper_bound - lower_bound + 1
    if (char == high_char) lower_bound += width / 2
    else if (char == low_char) upper_bound -= width / 2
  }

  if (lower_bound == upper_bound) return lower_bound
  return false
}

const decode_row = (string) => binary_search(string, 127, 'F', 'B')

const decode_col = (string) => binary_search(string, 7, 'L', 'R')

const decode_id = (boarding_pass) => {
  const row_string = boarding_pass.slice(0, 7)
  const col_string = boarding_pass.slice(-3)
  const row = decode_row(row_string)
  const col = decode_col(col_string)
  return row * 8 + col
}

const boarding_ids = boarding_passes.map(decode_id)

let max_id = 0
boarding_ids.forEach((id) => {
  if (id > max_id) max_id = id
})

exports.result = max_id
exports.expected = 994
