const fs = require('fs')

const parse_line = (line) => {
  const split_line = line.split(' ')
  const password = split_line[2].trim()
  const letter = split_line[1].slice(0, -1)

  const range_string = split_line[0]
  const range_split = range_string.split('-')
  const min = parseInt(range_split[0])
  const max = parseInt(range_split[1])

  return { min, max, letter, password }
}

const count_letters = (string, target) => {
  let count = 0
  for (let i = 0; i < string.length; i++)
    if (string.charAt(i) == target) count += 1
  return count
}

const passwords = fs
  .readFileSync('src/day_2/input.txt', 'utf-8')
  .split('\n')
  .map(parse_line)

let valid_passwords = 0
passwords.forEach(({ min, max, letter, password }) => {
  const letter_count = count_letters(password, letter)
  if (letter_count >= min && letter_count <= max) {
    valid_passwords += 1
  }
})

exports.result = valid_passwords
exports.expected = 524
