const fs = require('fs')

const parse_subbag = (string) => {
  const words = string.split(' ').slice(0, -1)
  return {
    name: words.slice(1).join(' '),
    count: parseInt(words[0]),
  }
}

const parse_rule = (line) => {
  const halfs = line.split('contain')
  const subbags_raw = halfs[1]
    .trim()
    .slice(0, -1)
    .split(', ')
    .map((s) => s.trim())
  const name = halfs[0].trim().slice(0, -5)

  if (subbags_raw[0] == 'no other bags')
    return {
      name: name,
      subbags: [],
    }
  else
    return {
      name: name,
      subbags: subbags_raw.map(parse_subbag),
    }
}

const rules = fs
  .readFileSync('src/day_7/input.txt', 'utf-8')
  .split('\n')
  .map(parse_rule)

let subbag_lookup = {}
rules.forEach(({ name, subbags }) => {
  subbag_lookup[name] = subbags
})

const count_all_subbags = (bag) => {
  let result = 0
  subbag_lookup[bag].forEach(({ name, count }) => {
    result += count + count_all_subbags(name) * count
  })
  return result
}

const count = count_all_subbags('shiny gold')

exports.result = count
exports.expected = 6683
