use crate::lexer::Atom;

struct Environment {
    // builtins: HashMap<String>,
}

// impl Environment {
//    pub fn eval(&mut self, atom: Atom) => {

//    }
// }

pub fn eval(atom: Atom) -> Atom {
    match atom {
        Atom::List(list) => if let Atom::Symbol(symbol) = list.get(0).unwrap() {},
        _ => {}
    }

    // let a = |atom: Atom| Atom::Integer(1);
    Atom::Integer(1)
}

// pub fn eval_ast(atom: Atom) -> Atom {

// }
