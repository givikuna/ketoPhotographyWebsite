use serde_derive::Serialize;
use serde_json;
use std::fs;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

#[derive(Serialize)]
pub struct Component {
    type_: String,
    component: String,
}

impl Clone for Component {
    fn clone(&self) -> Self {
        Component {
            type_: self.type_.clone(),
            component: self.component.clone(),
        }
    }
}

fn main() {
    let file_path: &str = "./components.json";
    let to_json: Vec<u8> = serde_json::to_vec(&get_components()).unwrap();
    let mut json_file: File = File::create(file_path).expect("Failed to create file");
    json_file
        .write_all(&to_json)
        .expect("Failed to write to file");
}

fn get_components() -> Vec<Component> {
    let mut components: Vec<Component> = vec![];
    let files: fs::ReadDir = fs::read_dir("./public/components").unwrap();
    for file in files {
        let f: String = file.unwrap().path().display().to_string();
        if !(Path::new(&f).file_stem().unwrap().to_str().unwrap().to_string() == "js") {
            let component: Vec<Component> = vec![Component {
                type_: Path::new(&f)
                    .extension()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .to_string(),
                component: Path::new(&f)
                    .file_stem()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .to_string(),
            }];
            components.push(component[0].clone());
        }
    }

    components
}
