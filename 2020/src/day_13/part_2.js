const fs = require('fs')

const lines = fs
  .readFileSync('src/day_13/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())

const buses = lines[1]
  .split(',')
  .map((bus) => {
    if (bus != 'x') return parseInt(bus)
    else return bus
  })
  .map((bus, i) => {
    if (bus == 'x') return bus
    else
      return {
        id: bus,
        t_delta: i,
      }
  })
  .filter((bus) => bus != 'x')

let total = buses[0].id
let factor = buses[0].id
for (let bi = 1; bi < buses.length; bi++) {
  const { id, t_delta } = buses[bi]

  let diff = id - t_delta
  while (diff < 0) diff += id

  let k = 1
  let new_total
  while (true) {
    new_total = total + factor * k
    if (new_total % id == diff) break
    else k += 1
  }

  total = new_total
  factor *= id
}

exports.result = total
exports.expected = 842186186521918
