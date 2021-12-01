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

const count_trees = (dx, dy) => {
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

  return trees_count
}

slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

solution = slopes
  .map((slope) => count_trees(slope[0], slope[1]))
  .reduce((prev, curr) => prev * curr, 1)

exports.result = solution
exports.expected = 2431272960
