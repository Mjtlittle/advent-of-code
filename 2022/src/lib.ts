import * as fs from "fs";
import * as path from "path";

export const read_input = (file: string) => {
  const file_path = `./src/inputs/${file}.txt`;
  return fs.readFileSync(path.resolve(file_path), "utf-8");
};

export const print = console.log;
