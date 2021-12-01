const fs = require('fs')

const parse_instruction = (line, i) => {
  const parts = line.split(' ')

  return {
    operation: parts[0],
    argument: parseInt(parts[1]),
    i: i,
  }
}

const instructions = fs
  .readFileSync('src/day_8/input.txt', 'utf-8')
  .split('\n')
  .map(parse_instruction)

const flip_instruction_not_loop = (i) => {
  let visited = new Set()
  let ip = 0
  let acc = 0
  let inst, op, arg
  while (ip < instructions.length) {
    // return false if looped
    if (!visited.has(ip)) visited.add(ip)
    else return false

    // unpacks the inst information
    inst = instructions[ip]
    op = inst.operation
    arg = inst.argument

    // flips jmp <> nop if at i, ip
    if (ip == i)
      if (op == 'jmp') op = 'nop'
      else if (op == 'nop') op = 'jmp'

    // execute inst
    if (op == 'jmp') {
      ip += arg
      continue
    } else if (op == 'acc') acc += arg
    ip += 1
  }

  return acc
}

// find all jmps and nops
const all_jmps = instructions
  .filter((inst) => inst.operation == 'jmp' || inst.operation == 'nop')
  .map((inst) => inst.i)

// flip all check if loops
for (let i of all_jmps) {
  result = flip_instruction_not_loop(i)
  if (result != false) break
}

exports.result = result
exports.expected = 501
