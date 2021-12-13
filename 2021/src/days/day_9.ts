import { read_input, print } from "../lib";

const directions = [
  { dcol: 1, drow: 0 },
  { dcol: -1, drow: 0 },
  { dcol: 0, drow: -1 },
  { dcol: 0, drow: 1 },
];

export const part_1 = () => {
  const dmap = read_input("day_9")
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

  const rows = dmap.length;
  const cols = dmap[0].length;

  const is_within = (row, col) =>
    row < rows && row >= 0 && col < cols && col >= 0;

  const get_around = (row, col) =>
    directions
      .map(({ dcol, drow }) => ({ row: row + drow, col: col + dcol }))
      .filter(({ row, col }) => is_within(row, col));

  // collect all of the low values
  let low_values = [];
  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      const cval = dmap[ri][ci];
      let low_point = true;
      get_around(ri, ci).forEach(({ row, col }) => {
        const val = dmap[row][col];
        if (val <= cval) low_point = false;
      });
      if (low_point) low_values.push(cval);
    }
  }

  // collect all low values
  const total_low_risk = low_values
    .map((v) => v + 1)
    .reduce((acc, v) => acc + v, 0);

  return total_low_risk;
};

export const part_2 = () => {
  class FlowNode {
    value: number;
    connected: FlowNode[] = [];
    visited: boolean = false;

    constructor(value) {
      this.value = value;
    }

    toString() {
      return `${this.value}`;
    }

    getSize() {
      return (
        1 +
        this.connected.map((v) => v.getSize()).reduce((acc, v) => v + acc, 0)
      );
    }
  }

  const fmap = read_input("day_9")
    .split("\n")
    .map((line) =>
      line.split("").map((char) => {
        const value = parseInt(char, 10);
        return new FlowNode(value);
      })
    );

  const rows = fmap.length;
  const cols = fmap[0].length;

  const is_within = (row, col) =>
    row < rows && row >= 0 && col < cols && col >= 0;

  const get_around = (row, col) =>
    directions
      .map(({ dcol, drow }) => ({ row: row + drow, col: col + dcol }))
      .filter(({ row, col }) => is_within(row, col));

  let single_basins = new Set();
  const flood = (ri, ci) => {
    const node = fmap[ri][ci];

    if (node.visited) return;
    node.visited = true;

    if (node.value == 9) return;

    let is_single = true;
    let made_connection = false;
    get_around(ri, ci).forEach(({ row, col }) => {
      const bnode = fmap[row][col];
      if (bnode.value <= node.value) {
        if (!made_connection) {
          bnode.connected.push(node);
          made_connection = true;
          flood(row, col);
        }
        is_single = false;
      }
    });

    if (is_single) single_basins.add(node);
  };

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      flood(ri, ci);
    }
  }

  const sizes = Array.from(single_basins)
    .map((n: FlowNode) => n.getSize())
    .sort((a, b) => a - b);
  print(sizes.slice(-3));
  const prod = sizes.slice(-3).reduce((acc, v) => acc * v, 1);

  return prod;
};

export const expected_results = [];
