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
let wx = 10
let wy = 1

const rotate_waypoint = (deg) => {
  const rad = (deg / 180) * Math.PI

  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  nwx = wx * cos - wy * sin
  nwy = wy * cos + wx * sin

  wx = Math.round(nwx, 0)
  wy = Math.round(nwy, 0)
}

for (const { type, arg } of actions) {
  if (type == 'N') wy += arg
  else if (type == 'S') wy -= arg
  else if (type == 'E') wx += arg
  else if (type == 'W') wx -= arg
  else if (type == 'L') rotate_waypoint(arg)
  else if (type == 'R') rotate_waypoint(-arg)
  else if (type == 'F') {
    x += wx * arg
    y += wy * arg
  }
}

const distance = Math.abs(x) + Math.abs(y)

exports.result = distance
exports.expected = 41212
