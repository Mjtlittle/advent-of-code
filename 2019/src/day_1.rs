use std::fs::File;
use std::io::{prelude::*, BufReader};

fn get_fuel(mass: i32) -> i32 {
    return mass / 3 - 2;
}

fn recursive_get_fuel(mass: i32) -> i32 {
    let mut fuel_required = get_fuel(mass);
    // clamp to positive numbers
    if fuel_required < 0 {
        fuel_required = 0;
    }

    // recurse
    if fuel_required != 0 {
        fuel_required += recursive_get_fuel(fuel_required);
    }

    return fuel_required;
}

fn main() {
    
    // read the masses from the file
    let file = File::open("inputs/day_1/input.txt").expect("Error opening file");
    let reader = BufReader::new(file);
    
    // iterate over all modules
    let mut mass: i32;
    let mut fuel_sum: i32 = 0;
    let mut recursive_fuel_sum: i32 = 0;

    for line in reader.lines() {
        mass = line.expect("Error reading line").parse().unwrap();

        fuel_sum += get_fuel(mass);
        recursive_fuel_sum += recursive_get_fuel(mass);
    }

    // print answers
    println!("Day 1: Part 1 = {}", fuel_sum);
    println!("       Part 2 = {}", recursive_fuel_sum);
}
