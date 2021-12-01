const fs = require('fs')

const parse_instruction = (line) => {
  const parts = line.split(' ')

  return {
    operation: parts[0],
    argument: parseInt(parts[1]),
  }
}

const instructions = fs
  .readFileSync('src/day_8/input.txt', 'utf-8')
  .split('\n')
  .map(parse_instruction)

let acc = 0
let ip = 0

let visited = new Set()

let inst, op, arg
while (ip < instructions.length) {
  if (!visited.has(ip)) visited.add(ip)
  else break

  inst = instructions[ip]
  op = inst.operation
  arg = inst.argument
  if (op == 'nop') {
  } else if (op == 'acc') {
    acc += arg
  } else if (op == 'jmp') {
    ip += arg
    continue
  }
  ip += 1
}

exports.result = acc
exports.expected = 1217
