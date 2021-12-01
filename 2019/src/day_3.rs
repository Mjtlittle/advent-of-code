use std::cmp::{max, min};
use std::fs::File;
use std::io::{self, prelude::*, BufReader};

#[derive(Debug)]
struct Point {
    x: isize,
    y: isize,
}

impl Point {
    fn new(x: isize, y: isize) -> Point {
        Point { x, y }
    }

    fn manhattan_distance(&self, other: &Point) -> isize {
        (max(self.x, other.x) - min(self.x, other.x))
            + (max(self.y, other.y) - min(self.y, other.y))
    }

    fn add(&self, x: isize, y: isize) -> Point {
        Point::new(self.x + x, self.y + y)
    }

    fn add_pt(&self, other: &Point) -> Point {
        Point::new(self.x + other.x, self.y + other.y)
    }

    fn scale_by(&mut self, factor: isize) {
        self.x *= factor;
        self.y *= factor;
    }

    fn clone(&self) -> Point {
        Point::new(self.x, self.y)
    }

    fn get_tuple(&self) -> (isize, isize) {
        (self.x, self.y)
    }

    fn move_by(&mut self, dx: isize, dy: isize) {
        self.x += dx;
        self.y += dy;
    }
    fn move_by_pt(&mut self, other: &Point) {
        self.x += other.x;
        self.y += other.y;
    }
}

#[derive(Debug)]
struct Line {
    a: Point,
    b: Point,
}

impl Line {
    fn new(a: Point, b: Point) -> Line {
        Line { a: a, b: b }
    }

    fn intersects(&self, other: &Line) -> Option<Point> {

    }
}

#[derive(Debug)]
struct Map {
    wires: Vec<Line>,
}

impl Map {
    fn new() -> Map {
        Map { wires: Vec::new() }
    }

    fn add_wire_string(&mut self, wire_string: &str) {
        let instructions = wire_string.split(",");

        // parse variables
        let mut command: &str;
        let mut vector: Point;
        let mut length: usize;

        // creation variables
        let mut pos: Point = Point::new(0, 0);

        // iterate over every instruction
        for ins in instructions {
            command = &ins[..1]; // not good in practice as instruction might conain non ascii character
            vector = match command {
                "U" => Point::new(0, 1),
                "D" => Point::new(0, -1),
                "L" => Point::new(-1, 0),
                "R" => Point::new(1, 0),
                _ => Point::new(0, 0),
            };

            length = ins[1..].parse().expect("Could not parse number!");
            vector.scale_by(length as isize);

            let start = pos.clone();
            pos.move_by_pt(&vector);
            let end = pos.clone();

            self.wires.push(Line::new(start, end));
        }
    }

    fn get_intersections(&self) -> Vec<Point> {
        
        let mut intersections: Vec<Point> = Vec::new();
        
        let mut inter: Option<Point>;
        for ai in 0..self.wires.len() {
            for bi in ai+1..self.wires.len() {
                inter = self.wires[ai].intersects(&self.wires[bi]);
                match inter {
                    Some(p) => {intersections.push(p)},
                    None => continue,
                }
            }
        }

        intersections

    }
}

fn main() {
    // // initialize the map
    // let mut map: Map = Map::new();

    // // open file and parse wire lines
    // let file = File::open("inputs/day_3/input.txt").expect("error opening file");
    // let reader = BufReader::new(file);
    // for line in reader.lines() {
    //     let line_string: String = line.expect("error reading line");
    //     map.add_wire_string(line_string.as_ref());
    // }
    // let intersections = map.get_intersections();
    // println!("{:?}", intersections);

    let a = Line::new(Point::new(0,0),Point::new(0,1));
    let b = Line::new(Point::new(0,0),Point::new(1,0));

    println!("{:?}", a.intersects(&b));

}

