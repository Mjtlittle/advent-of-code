mod intcode;
use intcode::Program;

fn main () {
    let mut program = Program::new_from_file("inputs/day_9/input.txt");
    
    program.reset();
    program.write(1);
    program.run();

    println!("Day 9: Part 1 = {}", program.read());

    program.reset();
    program.write(2);
    program.run();

    println!("       Part 2 = {}", program.read());
}   