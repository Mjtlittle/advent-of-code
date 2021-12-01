const fs = require('fs')

const parse_action = (line) => {
  const type = line[0]
  const arg = parseInt(line.slice(1))
  return { type, arg }
}

const actions = fs
  .readFileSync('src/day_12/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())
  .map(parse_action)

let x = 0
let y = 0
let facing = 0

for (const { type, arg } of actions) {
  if (type == 'N') y += arg
  else if (type == 'S') y -= arg
  else if (type == 'E') x += arg
  else if (type == 'W') x -= arg
  else if (type == 'L') facing += arg
  else if (type == 'R') facing -= arg
  else if (type == 'F') {
    x += Math.floor(Math.cos((facing / 180) * Math.PI) * arg)
    y += Math.floor(Math.sin((facing / 180) * Math.PI) * arg)
  }
}

const distance = Math.abs(x) + Math.abs(y)

exports.result = distance
exports.expected = 1007
