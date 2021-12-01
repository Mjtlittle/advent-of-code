const fs = require('fs')

const data = fs
  .readFileSync('src/day_3/input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    line = line.trim()
    let line_list = []
    for (let i = 0; i < line.length; i++) {
      line_list.push(line.charAt(i))
    }
    return line_list
  })

const width = data[0].length
const height = data.length
const dx = 3
const dy = 1
let x = 0
let y = 0

let trees_count = 0
while (y < height) {
  // check the space
  if (data[y][x] == '#') trees_count += 1

  // move
  x += dx
  y += dy

  // wrap
  x %= width
}

exports.result = trees_count
exports.expected = 184
