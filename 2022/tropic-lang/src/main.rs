mod eval;
mod lexer;

use clap::{Parser, Subcommand};
use std::fs;
use std::path::PathBuf;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// executes the program provided
    Run {
        #[arg(value_name = "PROGRAM")]
        program: PathBuf,
    },

    /// formats the program provided
    Format {
        #[arg(value_name = "PROGRAM")]
        program: PathBuf,
    },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Some(Commands::Run { program }) => {
            let program_string = fs::read_to_string(program).unwrap();
            let tokens = lexer::tokenize(program_string.as_str());
            let ast = lexer::parse(&tokens);

            println!("{:?}", ast);
        }
        Some(Commands::Format { program }) => {
            let program_string = fs::read_to_string(program).unwrap();
            let output = lexer::format(program_string.as_str());
            println!("\"\"\"\n{}\n\"\"\"", output);
        }
        None => {}
    }
}
