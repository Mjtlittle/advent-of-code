use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::f64::consts::PI;
use std::collections::HashMap;


struct Asteroid {
    x: usize,
    y: usize,
}

impl Asteroid {
    fn new(x: usize, y: usize) -> Asteroid {
        Asteroid {
            x: x,
            y: y,
        }
    }
}

struct AsteroidMap {
    locations: Vec<Vec<bool>>,
    asteroids: Vec<Asteroid>,
    width: usize,
    height: usize,
}

impl AsteroidMap {

    fn new() -> AsteroidMap {
        AsteroidMap {
            locations: Vec::new(),
            width: 0,
            height: 0,
        }
    }

    fn new_from_file(file_path: &str) -> AsteroidMap {
        let mut new_map = AsteroidMap::new();
        
        let file = File::open(file_path).expect("Error opening file");
        let reader = BufReader::new(file);
        
        let mut char_value: u8;
        for line in reader.lines() {

            // make new row
            let mut new_row: Vec<bool> = Vec::new();

            // populate new row
            for chr in line.expect("Expected line").chars() {
                new_row.push(match chr {
                    '#' => true,
                    '.' => false,
                    _ => true,
                });
            }

            // push the new row
            new_map.locations.push(new_row);
        }

        // set the width and height
        new_map.width = new_map.locations[0].len();
        new_map.height = new_map.locations.len();

        return new_map;
    }

    fn print(&self) {
        for yi in 0..self.height {
            for xi in 0..self.width {
                if self.is_asteroid(xi, yi) {
                    print!("#");
                } else {
                    print!(".");
                }
            }
            print!("\n");
        }
    }

    fn is_within(&self, tx: f64, ty: f64) -> bool {
        (tx >= 0.0) && (ty >= 0.0) && (tx < self.width as f64) && (ty < self.width as f64)
    }

    fn is_asteroid(&self, tx: usize, ty: usize) -> bool {
        self.locations[ty][tx]
    }

    fn count_visible_at(&self, tx: usize, ty: usize) -> usize {

        let mut asteroids: HashSet<isize> = HashSet::new();

        for xi in 0..self.width {
            for yi in 0..self.height {
                
                // skip non asteroids
                if !self.is_asteroid(xi, yi) {
                    continue;
                }

                // calculate angle
                let dx: f64 = (xi as isize - tx as isize) as f64;
                let dy: f64 = (yi as isize - ty as isize) as f64;

                
                let theta = dy.atan2(dx);
                let mut deg_theta: isize = (theta * 18000.0 / PI) as isize;

                // add to asteroids
                asteroids.insert(deg_theta);
            }
        }

        return asteroids.len();
    }

    fn get_most_visible(&self) -> (usize, usize) {

        let mut max_current = (0,0);
        let mut max_visible = 0;
        
        for xi in 0..self.width {
            for yi in 0..self.height {
                
                // skip non asteroids
                if !self.is_asteroid(xi, yi) {
                    continue;
                }

                // count visible
                let amount = self.count_visible_at(xi, yi);

                if amount > max_visible {
                    max_current = (xi, yi);
                    max_visible = amount;
                }
            }
        }

        println!("{}", max_visible);
        return max_current;

    }
}


fn main() {
    let map = AsteroidMap::new_from_file("inputs/day_10/input.txt");
    map.print();
    println!("{:?}", map.get_most_visible());
    println!("{:?}", map.count_visible_at(11,13));
    
}