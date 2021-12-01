const fs = require('fs')

const lines = fs
  .readFileSync('src/day_13/input.txt', 'utf-8')
  .split('\n')
  .map((v) => v.trim())

const earliest_departure = parseInt(lines[0])
const buses = lines[1]
  .split(',')
  .map((bus) => {
    if (bus != 'x') return parseInt(bus)
    else return bus
  })
  .filter((bus) => bus != 'x')

const closest_departures = buses.map(
  (bus) => earliest_departure + (bus - (earliest_departure % bus))
)

let lowest_time = closest_departures[0]
let lowest_bus = buses[0]
for (let i = 0; i < buses.length; i++) {
  const time = closest_departures[i]
  const bus_id = buses[i]
  if (time < lowest_time) {
    lowest_time = time
    lowest_bus = bus_id
  }
}

const wait_time = lowest_time - earliest_departure

exports.result = wait_time * lowest_bus
exports.expected = 104
