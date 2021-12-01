use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::collections::VecDeque;

struct Deck {
    size: usize,
    cards: VecDeque<usize>,
}

impl Deck {
    fn new_factory_order(size: usize) -> Deck {
        Deck {
            size: size,
            cards: (0..size).collect(),
        }
    }

    fn print(&self){
        for card in &self.cards {
            print!("{} ", card);
        }
        println!("");
    }

    fn deal_into_new_stack(&mut self) {
        let mut new_stack: VecDeque<usize> = VecDeque::with_capacity(self.size);
        for &card in self.cards.iter() {
            new_stack.push_front(card);
        }
        self.cards = new_stack;
    }

    fn cut(&mut self, n: isize) {
        let mut card;
        if n >= 0 {
            for _ in 0..n {
                card = self.cards.pop_front().unwrap();
                self.cards.push_back(card);
            }
        } else {
            for _ in 0..n.abs() {
                card = self.cards.pop_back().unwrap();
                self.cards.push_front(card);
            }
        }
    }

    fn deal_with_increment(&mut self, n: usize) {
        let mut new_stack: VecDeque<usize> = vec![0; self.size].into_iter().collect();
        for (i, &card) in self.cards.iter().enumerate() {
            new_stack[i * n % self.size] = card;
        }

        self.cards = new_stack;
    }

    fn get(&self, i: usize) -> usize {
        return self.cards[i];
    }

    fn find(&self, v: usize) -> usize {
        for i in 0..self.size {
            if self.get(i) == v {
                return i;
            }
        }
        return self.size;
    }
}

fn main() {

    // create deck
    let mut deck = Deck::new_factory_order(10007);

    // open file and parse shuffle instructions
    let file = File::open("inputs/day_22/input.txt").expect("error opening file");
    let reader = BufReader::new(file);
    for line in reader.lines() {
        let line_string: String = line.expect("error reading line");
    
        let parts: Vec<&str> = line_string.rsplitn(2," ").collect();

        // perform moves
        match parts[1] {
            "deal into new" => {deck.deal_into_new_stack();}
            "deal with increment" => {deck.deal_with_increment(parts[0].parse().unwrap());},
            "cut" => {deck.cut(parts[0].parse().unwrap());},
            _ => {},
        }
    }

    println!("Day 22: Part 1 = {}", deck.find(2019));

}