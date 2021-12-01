use std::collections::VecDeque;
use std::fs::read_to_string;
use std::io::Write;
use std::io;

pub struct Program {
    source: Vec<isize>,
    data: Vec<isize>,
    pc: usize,

    relative_base: isize,

    input_buffer: VecDeque<isize>,
    output_buffer: VecDeque<isize>,
}

pub enum ProgramCommand {
    Continue,
    Halt,
}

#[derive(Copy, Clone, Debug)]
pub enum ArgumentMode {
    PositionMode,  // 0
    ImmediateMode, // 1
    RelativeMode,  // 2
}

impl ArgumentMode {
    fn decode(value: usize) -> ArgumentMode {
        match value {
            0 => ArgumentMode::PositionMode,
            1 => ArgumentMode::ImmediateMode,
            2 => ArgumentMode::RelativeMode,
            _ => ArgumentMode::PositionMode,
        }
    }
}

impl Program {

    pub fn new_from_file(file_path: &str) -> Program {
        let input_string: String = read_to_string(file_path).expect("Error opening file");
        Program::new_from_string(input_string.as_ref())
    }

    pub fn new_from_string(input_string: &str) -> Program {
        let source: Vec<isize> = input_string
            .split(",")
            .map(|v| v.trim().parse::<isize>())
            .filter_map(Result::ok)
            .collect();
        Program {
            source: source,
            data: Vec::new(),
            pc: 0,
            relative_base: 0,

            input_buffer: VecDeque::new(),
            output_buffer: VecDeque::new(),
        }
    }

    pub fn reset(&mut self) {
        self.data = self.source.clone();
        self.pc = 0;
        self.relative_base = 0;

        self.input_buffer = VecDeque::new();
        self.output_buffer = VecDeque::new();
    }

    pub fn run(&mut self) {

        // program loop
        loop {
            // check to see if end of data
            if self.pc >= self.data.len() {
                break;
            }

            // step
            let command = self.step();

            // follow command
            match command {
                ProgramCommand::Continue => (),
                ProgramCommand::Halt => break,
            }
        }
    }

    fn consume(&mut self) -> isize {
        let value = self.get_data(self.pc);
        self.pc += 1;
        return value;
    }

    fn consume_modal_src(&mut self, argument_mode: ArgumentMode) -> isize {

        let value = self.consume();
        match argument_mode {
            ArgumentMode::PositionMode => self.get_data(value as usize),
            ArgumentMode::ImmediateMode => value,
            ArgumentMode::RelativeMode => self.get_data((self.relative_base + value) as usize),
            _ => self.get_data(value as usize),
        }
    }

    fn consume_modal_dest(&mut self, argument_mode: ArgumentMode) -> usize {

        let value = self.consume();

        match argument_mode {
            ArgumentMode::PositionMode => value as usize,
            ArgumentMode::ImmediateMode => self.pc - 1,
            ArgumentMode::RelativeMode => (self.relative_base + value) as usize,
            _ => value as usize,
        }
    }

    pub fn step(&mut self) -> ProgramCommand {

        
        let mut value = self.consume();

        // consume the last two digits which will be the opcode
        let opcode = value % 100;
        value /= 100;

        // read in parameter modes and consume
        #[derive(Debug)]
        let mut parameter_modes: [ArgumentMode; 3] = [ArgumentMode::PositionMode; 3];
        for i in 0..3 {
            parameter_modes[i] = ArgumentMode::decode((value % 10) as usize);
            value /= 10;
        }

        // completion command
        let mut command = ProgramCommand::Continue;

        match opcode {

            // binary methods
            1 | 2 | 7 | 8 => {

                // get arugments
                let a = self.consume_modal_src(parameter_modes[0]);
                let b = self.consume_modal_src(parameter_modes[1]);
                let dest = self.consume_modal_dest(parameter_modes[2]);

                // evaluate
                self.write_data(dest, match opcode {
                    1 => a + b,                    // add
                    2 => a * b,                    // multiply
                    7 => if a < b {1} else {0},    // less than
                    8 => if a == b {1} else {0},   // less than
                    _ => a,                        // dead path, but rust compiler really wants it lol
                });
            },

            // read input
            3 => {

                // get destination
                let dest = self.consume_modal_dest(parameter_modes[0]);

                // read in value
                // if input buffer is empty take stdin
                let mut input_value;
                if self.input_buffer.len() == 0 {
                    let mut input_text = String::new();
                    
                    // print the prompt
                    print!("> ");
                    io::stdout().flush();
                    
                    // read the input
                    io::stdin()
                        .read_line(&mut input_text)
                        .expect("failed to read from stdin");

                    // trim and parse
                    let trimmed = input_text.trim();
                    input_value = trimmed.parse::<isize>().expect("Expected an integer value");
                
                // read in from buffer
                } else {
                    input_value = self.input_buffer.pop_front().expect("Expected an integer value");
                }
                
                // store value
                self.write_data(dest as usize, input_value);
            },

            // output value
            4 => {

                // get source
                let value = self.consume_modal_src(parameter_modes[0]);
                self.output_buffer.push_back(value);
            },

            // set the relative base
            9 => {
                self.relative_base += self.consume_modal_src(parameter_modes[0]);
            }

            // jump-if-true
            5 => {

                // get arguments
                let a = self.consume_modal_src(parameter_modes[0]);
                let b = self.consume_modal_src(parameter_modes[1]);

                // if first value is non zero
                if a != 0 {
                    self.pc = b as usize;
                }
            },

            // jump-if-false
            6 => {

                // get arguments
                let a = self.consume_modal_src(parameter_modes[0]);
                let b = self.consume_modal_src(parameter_modes[1]);

                // if first value is zero
                if a == 0 {
                    self.pc = b as usize;
                }
            },
            
            99 | _ => {
                command = ProgramCommand::Halt;
            }

        }

        return command;
    }

    pub fn write_data(&mut self, index: usize, value: isize) {
        self.ensure_data_at(index);
        self.data[index] = value;
    }

    pub fn get_data(&mut self, index: usize) -> isize {
        self.ensure_data_at(index);
        return self.data[index];
    }

    pub fn ensure_data_at(&mut self, index: usize) {
        if self.data.len() <= index {
            for i in 0..(index - self.data.len() + 1) {
                self.data.push(0);
            }
        }
    }

    pub fn write(&mut self, value: isize) {
        self.input_buffer.push_back(value);
    }

    pub fn write_ascii(&mut self, string: &str) {
        for c in string.chars() {
            self.write(c as isize);
        }
    }

    pub fn write_ascii_line(&mut self, string: &str) {
        self.write_ascii(string);
        self.write_ascii("\n");
    }

    pub fn read(&mut self) -> isize {
        return self.output_buffer.pop_front().expect("Expected an integer value");
    }

    pub fn print_output(&mut self) {
        while self.output_buffer.len() > 0 {
            println!("{}", self.read());
        }
    }

    pub fn print_ascii_output(&mut self) {
        while self.output_buffer.len() > 0 {
            print!("{}", char::from(self.read() as u8));
        }
    }

    pub fn print_data(&self) {
        println!("{:?}", self.data);
    }
}
