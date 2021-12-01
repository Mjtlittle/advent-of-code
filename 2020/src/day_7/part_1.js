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

// this object has a key for every bag that can be put in another bag
// the value at each key is the list of all bags that the key can fit in
let can_be_put_into = {}
rules.forEach(({ name, subbags }) => {
  subbags.forEach(({ name: subbag_name }) => {
    if (can_be_put_into.hasOwnProperty(subbag_name))
      can_be_put_into[subbag_name].push(name)
    else can_be_put_into[subbag_name] = [name]
  })
})

// start with all of the bags which the shiny gold bag can fit in
let bag_buffer = [...can_be_put_into['shiny gold']]

// which bags have been counted
let counted = new Set()
let count = 0

// keep combing through the buffer until it is empty
let current_bag
while (bag_buffer.length != 0) {
  // get the next bag in the buffer
  current_bag = bag_buffer.pop()

  // if the bag has already been counted skip it
  if (counted.has(current_bag)) continue

  // otherwise count it
  count += 1
  counted.add(current_bag)

  // if the bag cannot be put into another type of bag skip it
  if (!can_be_put_into.hasOwnProperty(current_bag)) continue

  // otherwise add all of those bags to the buffer
  // to be counted if they havent already
  for (let bag of can_be_put_into[current_bag]) bag_buffer.push(bag)
}

exports.result = count
exports.expected = 229
