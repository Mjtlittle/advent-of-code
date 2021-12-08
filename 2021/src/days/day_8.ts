import { read_input, print } from "../lib";

type SegmentHash = string;
type SegmentSet = Set<string>;
type PartHalf = SegmentHash[];
type Part = PartHalf[];

type Translator = Map<SegmentHash, number>;

const set_to_hash = (seg: SegmentSet) =>
  [...Array.from(seg.values())].sort().join("");

const hash_to_set = (hash: SegmentHash) => new Set(hash.split(""));

const sort_hash = (hash: SegmentHash) => hash.split("").sort().join("");

const segment_lines: Map<number, SegmentSet> = new Map(
  Object.entries({
    1: "cf",

    7: "acf",

    4: "bcdf",

    2: "acdeg",
    3: "acdfg",
    5: "abdfg",

    0: "abcefg",
    6: "abdefg",
    9: "abcdfg",

    8: "abcdefg",
  }).map(([digit_value, hash]) => [parseInt(digit_value), hash_to_set(hash)])
);

const build_translator = (reference: SegmentHash[]): Translator => {
  const final_translator = new Map();

  // first pass to get knowns
  for (let i = 0; i < reference.length; i++);

  return final_translator;
};

const solve_part = (part: Part): number[] => {
  const [reference, message] = part;
  const translator = build_translator(reference);

  return message.map((hash) => translator.get(hash));
};

export const part_1 = () => {
  const parts: Part[] = read_input("day_8_example")
    .split("\n")
    .map((line) =>
      line.split(" | ").map(
        (half) =>
          half.split(" ").map((unsorted_hash) => sort_hash(unsorted_hash))
        // .map((segment_parts) => new Set(segment_parts.split("")))
      )
    );
  parts.map(solve_part);
};

export const part_2 = () => {};

export const expected_results = [];
