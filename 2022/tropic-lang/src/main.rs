mod lexer;

use std::path::PathBuf;

use clap::Parser;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    /// program to be run
    #[arg(index = 1, value_name = "PROGRAM")]
    program: Option<PathBuf>,
}

fn main() {
    let cli = Cli::parse();

    // if let Some(program) = cli.program.as_deref() {
    //     println!(
    //         "Value for name: {}",
    //         program.to_str().expect("problem with path")
    //     );
    // }

    lexer::tokenize("this is a test")
}

fn run_program() {}
