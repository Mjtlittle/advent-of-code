import { read_input, print } from "../lib";

interface Status {
  value: number;
  drawn: boolean;
}

type Board = number[][];
type StatusBoard = Status[][];

const parse_board_row = (raw_row: string): number[] => {
  return raw_row
    .split(" ")
    .map((v) => v.trim())
    .filter((v) => v != "")
    .map((v) => parseInt(v));
};

const read_day_info = () => {
  const lines = read_input("day_4").split("\n");
  const numbers_drawn = lines[0].split(",").map((v) => parseInt(v));

  // parse all of the boards
  let boards: Board[] = [[]];
  for (let li = 2; li < lines.length; li++) {
    const line = lines[li];

    // skip and make new board on break
    if (line.trim() == "") {
      boards.push([]);
      continue;
    }

    // otherwise add each row to the last board
    const board = boards[boards.length - 1];
    const row = parse_board_row(line);
    board.push(row);
  }

  return { numbers_drawn, boards };
};

const create_status_board = (board: Board): StatusBoard =>
  board.map((row) => row.map((value) => ({ value, drawn: false })));

const add_number = (board: StatusBoard, number: number): number | null => {
  for (let ri = 0; ri < board.length; ri++) {
    const row = board[ri];
    for (let ci = 0; ci < row.length; ci++) {
      const cell = row[ci];
      if (cell.value == number) {
        cell.drawn = true;

        let result = check_winning_addition(board, ri, ci);
        if (result != null) return result;
      }
    }
  }
};

const check_winning_addition = (
  board: StatusBoard,
  ri: number,
  ci: number
): number | null => {
  let row_v = check_row(board, ri);
  if (row_v != null) return row_v;

  let col_v = check_col(board, ci);
  if (col_v != null) return col_v;
};

const check_row = (board: StatusBoard, ri: number): number | null => {
  let running_sum = 0;

  for (let i = 0; i < board[ri].length; i++) {
    const { drawn, value } = board[ri][i];
    if (!drawn) return null;
    running_sum += value;
  }

  return running_sum;
};

const check_col = (board: StatusBoard, ci: number): number | null => {
  let running_sum = 0;

  for (let i = 0; i < board.length; i++) {
    const { drawn, value } = board[i][ci];
    if (!drawn) return null;
    running_sum += value;
  }

  return running_sum;
};

const print_board = (board: StatusBoard): void => {
  for (const row of board) {
    let line = [];
    for (const { value, drawn } of row) {
      if (drawn) line.push(value.toString().padStart(3, " "));
      else line.push("  -");
      line.push(" ");
    }
    print(line.join(""));
  }
};

export const part_1 = () => {
  const { numbers_drawn, boards } = read_day_info();

  const sboards = boards.map(create_status_board);

  let last_number: number;
  let last_board: StatusBoard;
  outer: for (const number of numbers_drawn) {
    last_number = number;
    for (const board of sboards) {
      last_board = board;
      let result = add_number(board, number);
      if (result != null) break outer;
    }
  }

  // collect all of the statuses
  const uncalled_status_sum = last_board
    .reduce((acc, row) => [...acc, ...row], [])
    .filter((s) => !s.drawn)
    .reduce((acc, s) => acc + s.value, 0);

  return uncalled_status_sum * last_number;
};

export const part_2 = () => {
  const { numbers_drawn, boards } = read_day_info();
  const sboards = boards.map(create_status_board);

  let remaining_boards = new Set(sboards);

  let last_number: number;
  let last_board: StatusBoard;
  outer: for (const number of numbers_drawn) {
    // note last number
    last_number = number;

    // add number to all boards
    for (const board of Array.from(remaining_boards.values())) {
      last_board = board;

      // if number resulted in win
      let result = add_number(board, number);
      if (result != null) {
        // stop if the last board to win is found
        if (remaining_boards.size == 1) break outer;

        // remove board from remaining boards
        remaining_boards.delete(board);
      }
    }
  }

  // collect all of the statuses
  const uncalled_status_sum = last_board
    .reduce((acc, row) => [...acc, ...row], [])
    .filter((s) => !s.drawn)
    .reduce((acc, s) => acc + s.value, 0);

  return uncalled_status_sum * last_number;
};

export const expected_results = [];
