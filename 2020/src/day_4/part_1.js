const fs = require('fs')

const lines = fs
  .readFileSync('src/day_4/input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.trim())

let passport_lines = [[]]
for (const line of lines) {
  if (line == '') passport_lines.push([])
  else passport_lines[passport_lines.length - 1].push(line)
}

const passport_strings = passport_lines.map((lines) => lines.join(' '))

const parse_keys = (string) => {
  return string.split(' ').reduce((prev, curr) => {
    const parts = curr.split(':')
    const [key, value] = parts
    prev[key] = value
    return prev
  }, {})
}

const passports = passport_strings.map(parse_keys)

const required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const is_passport_valid = (passport) => {
  for (const field of required_fields) {
    if (!passport.hasOwnProperty(field)) return false
  }
  return true
}

const valid_passports = passports.reduce(
  (prev, curr) => prev + (is_passport_valid(curr) ? 1 : 0),
  0
)

exports.result = valid_passports
exports.expected = 222
