use regex::{Regex, RegexSet};

pub fn tokenize(source: &str) {
    let mut tokens: Vec<String> = Vec::new();

    // let re = Regex::new(r"a").expect("valid");
    // for s in (source) {
    //     println!("{:?}", s);
    // }

    // source.matches(&re);
    // let matches: Vec<_> = set.matches("foobar").into_iter().collect();

    for c in source.chars() {
        println!("c: {}", c);
    }

    println!("Source: {}", source);
}
