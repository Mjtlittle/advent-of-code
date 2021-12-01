use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::collections::HashMap;

struct OrbitMap {

    orbits: HashMap<String,String>, // "a)b"  where orbits[b] => what b orbits which is a

}

impl OrbitMap {
    fn new() -> OrbitMap {
        OrbitMap {
            orbits: HashMap::new(),
        }
    }

    fn new_from_file(path: &str) -> OrbitMap {
        
        let mut new_map = OrbitMap::new();

        let file = File::open(path).expect("Error opening file");
        let reader = BufReader::new(file);

        for raw_line in reader.lines() {
            let line = raw_line.expect("Error reading line");
            
            let parts: Vec<&str> = line.split(")").collect();

            let obj_a = parts[0];
            let obj_b = parts[1];

            new_map.register_orbit(obj_a, obj_b);
        }

        return new_map;
    }

    fn total_orbits(&self) -> usize {

        let mut orbit_count = 0;

        for (key, _) in &self.orbits {
            orbit_count += self.orbits_for_object(key);
        }

        return orbit_count;
    }

    fn orbits_for_object(&self, object: &str) -> usize{
        
        let mut count = 0;
        let mut cparent: &str = object;
        loop {
            
            // COM has no orbits
            if cparent == "COM" {
                break;
            }

            cparent = self.orbits.get(cparent).expect("Expected the key to be in the table");
            count += 1;
        }

        return count;
    }

    fn transfers_between(&self, src: &str, dest: &str) -> usize {
        let mut curr_from_src;
        let mut src_dist;

        let mut curr_from_dest = dest;
        let mut dest_dist = 0;

        loop {

            // reset the src and distance
            curr_from_src = src;
            src_dist = 0;

            // travel the src
            loop {
                
                // check to see if the currs are the same
                if curr_from_dest == curr_from_src {
                    return dest_dist + src_dist - 2;
                }

                // check to see if end of line
                if curr_from_src == "COM" {
                    break;
                }

                // move the source
                curr_from_src = self.orbits.get(curr_from_src).expect("Orbit was not found in orbits");
                src_dist += 1;

            }
            
            // move the dest
            curr_from_dest = self.orbits.get(curr_from_dest).expect("Orbit was not found in orbits");
            dest_dist += 1;
        }


    }

    fn register_orbit(&mut self, a: &str, b: &str) {
        self.orbits.insert(b.to_string(), a.to_string());
    }

}

fn main() {

    let map = OrbitMap::new_from_file("inputs/day_6/input.txt");

    println!("Day 6: Part 1 = {}", map.total_orbits());
    println!("       Part 2 = {}", map.transfers_between("YOU", "SAN"));

}
