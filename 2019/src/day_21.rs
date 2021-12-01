mod intcode;
use intcode::Program;

fn main() {

    let mut program = Program::new_from_file("inputs/day_21/input.txt");
    program.reset();
    program.write_ascii_line("NOT A J");
    program.write_ascii_line("WALK");
    program.run();
    program.print_ascii_output();

}