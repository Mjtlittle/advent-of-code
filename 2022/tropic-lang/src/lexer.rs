use std::cell::RefCell;

use regex::Regex;

#[derive(Debug)]
pub struct Token {
    text: String,
    start: usize,
}

pub fn tokenize(source: &str) -> Vec<Token> {
    let mut tokens: Vec<Token> = Vec::new();

    let re_pattern = r###"(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)"###;
    let re = Regex::new(re_pattern).unwrap();

    for cap in re.captures_iter(source) {
        let m = cap.get(0).unwrap();
        let text = m.as_str();

        if text.is_empty() {
            continue;
        }

        tokens.push(Token {
            text: m.as_str().to_owned(),
            start: m.start(),
        })
    }

    return tokens;
}

#[derive(Debug)]
pub enum Atom {
    List(Vec<Atom>),
    Symbol(String),
    String(String),
    Integer(i64),
}

pub fn parse(tokens: &Vec<Token>) -> Vec<Atom> {
    let mut program: Vec<Atom> = Vec::new();
    let stack: RefCell<Vec<Vec<Atom>>> = RefCell::new(Vec::new());

    let re_string = Regex::new(r#"".*""#).unwrap();
    let re_integer = Regex::new(r"-?\d+").unwrap();

    let mut push_atom = |atom: Atom| {
        let mut stack = stack.borrow_mut();
        if stack.len() > 0 {
            stack.last_mut().unwrap().push(atom);
        } else {
            program.push(atom);
        }
    };

    // iterate over all tokens
    for token in tokens.iter() {
        match token.text.as_str() {
            // comments
            text if text.starts_with(';') => {}

            // string
            text if re_string.is_match(text) => {
                let mut string = text.to_owned();

                // remove quotes
                string.remove(0);
                string.remove(string.len() - 1);

                push_atom(Atom::String(string));
            }

            // integer
            text if re_integer.is_match(text) => {
                let value = text.parse::<i64>().expect("error parsing number");
                push_atom(Atom::Integer(value));
            }

            // parens
            "(" => {
                stack.borrow_mut().push(Vec::new());
            }
            ")" => {
                let list = Atom::List(
                    stack
                        .borrow_mut()
                        .pop()
                        .expect("must have an opening paren"),
                );
                push_atom(list);
            }

            // otherwise, symbol
            text => {
                push_atom(Atom::Symbol(text.to_owned()));
            }
        }
    }

    program
}

pub fn format(source: &str) -> String {
    panic!("not implemented");
    let tokens = tokenize(source);

    let mut output: String = String::new();

    let max_line_length = 60;
    let mut line_length = 0;

    for token in &tokens {
        let text = token.text.as_str();
        // println!("t: \"{}\"", text);

        if (!output.is_empty() && text != ")" && output.chars().last().unwrap_or(' ') != '(') {
            output.push(' ');
        }

        output.push_str(text);
    }

    output
}
