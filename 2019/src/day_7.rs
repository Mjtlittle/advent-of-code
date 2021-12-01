mod intcode;
use intcode::Program;

fn main() {

    let number_of_amps: usize = 5;
    let possible_settings: usize = 5;

    let mut biggest_number: isize = 0;

    let mut current_pattern: usize = 0;
    let mut working_pattern: usize = current_pattern;
    
    let mut amp = Program::new_from_file("inputs/day_7/input.txt");

    // check all possible amp settings
    'full_search: loop {

        // reset the pattern back to the current pattern
        working_pattern = current_pattern;
        
        // check the amp
        let mut input_value: isize = 0;
        let mut setting: usize;
        
        for amp_i in 0..number_of_amps {
            
            // reset the amp
            amp.reset();
            
            // get setting (first digit)
            setting = working_pattern % possible_settings;
            working_pattern /= possible_settings;
            
            // write the setting
            amp.write(setting as isize);
            
            // write the input
            amp.write(input_value);

            // run the amp
            amp.run();

            // get the output and place in the input
            input_value = amp.read();

        }

        // update biggest
        if input_value > biggest_number {
            biggest_number = input_value;
        }

        // next pattern
        current_pattern += 1;

        // check to see if all patterns have been exhausted
        if current_pattern == possible_settings.pow(number_of_amps as u32) {
            break
        }

    }

    println!("{}", biggest_number);

}