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
const is_passport_valid = (p) => {
  // insure all fields are present
  for (const field of required_fields)
    if (!p.hasOwnProperty(field)) return false

  // birth year
  if (!p.byr.match(/^[0-9]{4}$/g)) return false
  const birth_year = parseInt(p.byr)
  if (birth_year < 1920 || birth_year > 2002) return false

  // issue year
  if (!p.iyr.match(/^[0-9]{4}$/g)) return false
  const issue_year = parseInt(p.iyr)
  if (issue_year < 2010 || issue_year > 2020) return false

  // expiration year
  if (!p.eyr.match(/^[0-9]{4}$/g)) return false
  const expiration_year = parseInt(p.eyr)
  if (expiration_year < 2020 || expiration_year > 2030) return false

  // height year
  if (!p.hgt.match(/[0-9]+in|cm$/g)) return false
  const height = parseInt(p.hgt.slice(0, -2))
  const unit = p.hgt.slice(-2)
  if (unit == 'cm') {
    if (height < 150 || height > 193) return false
  } else {
    if (height < 59 || height > 76) return false
  }

  // hair color
  if (!p.hcl.match(/#([a-f0-9]{6})/g)) return false

  // eye color
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl))
    return false

  // passport id
  if (!p.pid.match(/^[a-f0-9]{9}$/g)) return false

  // passes all tests
  return true
}

const valid_passports = passports.reduce(
  (prev, curr) => prev + (is_passport_valid(curr) ? 1 : 0),
  0
)

exports.result = valid_passports
exports.expected = 140
