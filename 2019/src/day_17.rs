mod intcode;
use intcode::Program;

fn main() {

    let mut program = Program::new_from_file("inputs/day_17/input.txt");
    program.reset();
    program.run();
    program.print_ascii_output();

}