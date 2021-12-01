const fs = require('fs')

const initial_layout = fs
  .readFileSync('src/day_11/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim().split(''))

const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'
const FLOOR = '.'

const create_filled_list = (length, value) => {
  let result = []
  for (let i = 0; i < length; i++) result.push(value)
  return result
}

const create_empty_layout = (width, height) => {
  let result = []
  for (let i = 0; i < height; i++) result.push(create_filled_list(width, FLOOR))
  return result
}

const width = initial_layout[0].length
const height = initial_layout.length

const is_within = (tx, ty) => tx >= 0 && tx < width && ty >= 0 && ty < height

const around_deltas = [
  { dx: -1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
  { dx: 1, dy: 1 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
]

const count_around = (layout, tx, ty, char) => {
  let count = 0
  around_deltas.forEach(({ dx, dy }) => {
    x = tx + dx
    y = ty + dy
    if (!is_within(x, y)) return
    if (layout[y][x] == char) count += 1
  })
  return count
}

const print_layout = (layout) => {
  layout.forEach((row) => {
    console.log(row.join(''))
  })
  console.log('')
}

// iterate over a layout calling the callback for each location
const layout_for_each = (layout, func) => {
  let value
  for (let tx = 0; tx < width; tx++) {
    for (let ty = 0; ty < height; ty++) {
      value = layout[ty][tx]
      func(value, tx, ty)
    }
  }
}

const layout_step = (layout) => {
  let result = create_empty_layout(width, height)
  let changed = false

  // iterate over all locations
  layout_for_each(layout, (value, tx, ty) => {
    const occupied_around = count_around(layout, tx, ty, OCCUPIED_SEAT)

    // if seat is empty
    if (value == EMPTY_SEAT && occupied_around == 0) {
      result[ty][tx] = OCCUPIED_SEAT
      changed = true
    }
    // if seat is occupied
    else if (value == OCCUPIED_SEAT && occupied_around >= 4) {
      result[ty][tx] = EMPTY_SEAT
      changed = true
    }
    // otherwise copy over
    else result[ty][tx] = layout[ty][tx]
  })
  return { result, changed }
}

// step through layout till it stops changing
layout = initial_layout
while (true) {
  const { result, changed } = layout_step(layout)
  if (!changed) break
  layout = result
}

// count the occupied seats
let count = 0
layout_for_each(layout, (value) => {
  if (value == OCCUPIED_SEAT) count += 1
})

exports.result = count
exports.expected = 2247
