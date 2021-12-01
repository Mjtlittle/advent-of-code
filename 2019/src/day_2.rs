mod intcode;
use intcode::Program;

fn main(){

    let mut program = Program::new_from_file("inputs/day_2/input.txt");

    program.reset();
    program.write_data(1,12);
    program.write_data(2,2);
    program.run();

    println!("Day 2: Part 1 = {}", program.get_data(0));
    
    'full_loop: for noun in 0..99 as usize {
        for verb in 0..99 as usize {
            program.reset();
            program.write_data(1, noun as isize);
            program.write_data(2, verb as isize);
            program.run();

            if program.get_data(0) == 19690720 {
                println!("       Part 2 = {}", 100 * noun + verb);
                break 'full_loop;
            }
        }
    }
}
