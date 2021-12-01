use std::fs::File;
use std::io::{prelude::*, BufReader};

struct SpaceImageLayer {
    width: usize,
    height: usize,
    data: Vec<u8>,
}

impl SpaceImageLayer {
    fn new(width: usize, height: usize) -> SpaceImageLayer {
        SpaceImageLayer {
            width: width,
            height: height,
            data: Vec::new(),
        }
    }

    fn is_full(&self) -> bool {
        self.data.len() >= self.width * self.height
    }

    fn count_value(&self, value: u8) -> usize {
        let mut count: usize = 0;
        for v in &self.data {
            if *v == value {
                count += 1;
            }
        }
        return count;
    }

    fn get_pixel(&self, tx: usize, ty: usize) -> u8 {
        self.data[ty * self.width + tx]
    }

    fn print_value(&self) {
        let mut pixel_value: u8;
        for yi in 0..self.height {
            for xi in 0..self.width {
                pixel_value = self.get_pixel(xi, yi);
                print!("{}", pixel_value);
            }
            print!("\n");
        }
    }

    fn print(&self) {
        let mut pixel_value: u8;
        for yi in 0..self.height {
            for xi in 0..self.width {
                pixel_value = self.get_pixel(xi, yi);
                print!("{}", match pixel_value {
                    0 => " ",
                    1 => "#",
                    _ => " "
                });
            }
            print!("\n");
        }
    }
}

struct SpaceImage {
    width: usize,
    height: usize,
    layers: Vec<SpaceImageLayer>,
}

impl SpaceImage {

    fn new(width: usize, height: usize) -> SpaceImage {
        SpaceImage {
            width: width,
            height: height,
            layers: Vec::new(),
        }
    }

    fn new_from_file(width: usize, height: usize, path: &str) -> SpaceImage {
        let mut new_image = SpaceImage::new(width, height);
        new_image.populate_from_file(path);
        return new_image;
    }

    fn new_layer(&self) -> SpaceImageLayer {
        SpaceImageLayer::new(self.width, self.height)
    }

    fn populate_from_file(&mut self, path: &str) {
        let file = File::open(path).expect("Error opening file");
        let reader = BufReader::new(file);
        
        let mut current_layer = self.new_layer();

        let mut char_value: u8;
        for line in reader.lines() {
            for chr in line.expect("Expected line").chars() {

                // write the value from file
                char_value = chr.to_string().parse().unwrap();
                current_layer.data.push(char_value);

                // get a new layer when the current one is full
                if current_layer.is_full() {
                    self.layers.push(current_layer);
                    current_layer = self.new_layer();
                }
            }
        }
    }

    fn get_layer_with_least_zeros(&self) -> &SpaceImageLayer {
    

        let mut running_layer: &SpaceImageLayer = &self.layers[0];
        let mut running_count: usize = usize::max_value();
        let mut current_count: usize;
        for layer in &self.layers {

            current_count = layer.count_value(0);
            if current_count <= running_count {
                running_count = current_count;
                running_layer = layer;
            }
        }
        return running_layer;
    }

    fn render_image(&self) -> SpaceImageLayer {
        
        // make new layer
        let mut final_image = self.new_layer();

        // iterate through whole image
        for i in 0..(self.width * self.height) {

            let mut final_value;
            let mut current_layer: usize = 0;
            loop {

                // get current pixel
                final_value = self.layers[current_layer].data[i];

                // continue if transparent
                if final_value == 2 {
                    current_layer += 1;
                
                // otherwise move on
                } else {
                    break;
                }
            }

            // write the new pixel to the new layer
            final_image.data.push(final_value);
            
        }

        return final_image;
    }
}

fn main() {
    let si = SpaceImage::new_from_file(25, 6, "inputs/day_8/input.txt");

    let layer = si.get_layer_with_least_zeros();
    
    println!("Day 8: Part 1 = {}", layer.count_value(1) * layer.count_value(2));
    println!("       Part 2 = ");
    
    let rendered_layer = si.render_image();
    rendered_layer.print();
}