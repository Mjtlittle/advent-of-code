const fs = require('fs')

const parse_line = (line) => {
  const split_line = line.split(' ')
  const password = split_line[2].trim()
  const letter = split_line[1].slice(0, -1)

  const range_string = split_line[0]
  const range_split = range_string.split('-')
  const pos1 = parseInt(range_split[0]) - 1
  const pos2 = parseInt(range_split[1]) - 1

  return { pos1, pos2, letter, password }
}

const passwords = fs
  .readFileSync('src/day_2/input.txt', 'utf-8')
  .split('\n')
  .map(parse_line)

let valid_passwords = 0
passwords.forEach(({ pos1, pos2, letter, password }) => {
  // check for letter at position
  // check to see if index is within the length of the password before hand
  const at_pos1 = pos1 < password.length && password.charAt(pos1) == letter
  const at_pos2 = pos2 < password.length && password.charAt(pos2) == letter

  // exclusive or: A xor B = (A or B) and not (A and B)
  const at_only_one = (at_pos1 || at_pos2) && !(at_pos1 && at_pos2)

  if (at_only_one) valid_passwords += 1
})

exports.result = valid_passwords
exports.expected = 485
