mod intcode;
use intcode::Program;

fn main() {

    let mut program = Program::new_from_file("inputs/day_5/input.txt");

    program.reset();
    program.write(1);
    program.run();

    // random numbers come out of the program
    for _ in 0..9 {
        program.read();
    }

    println!("Day 5: Part 1 = {}", program.read());
    
    program.reset();
    program.write(5);
    program.run();
    
    println!("       Part 2 = {}", program.read());



}



