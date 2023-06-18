use lazy_static::lazy_static;
use serde_derive::Serialize;
use serde_json;
use std::fs;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use std::sync::Mutex;

lazy_static! {
    static ref IMAGES: Mutex<Vec<String>> = Mutex::new(vec![]);
}

fn main() {
    traverse_directories("./public/img".to_string());
    write_data();
}

fn write_data() {
    let file_path: &str = "./img.json";
    let serialized_json: Vec<u8> = serde_json::to_vec(&IMAGES.lock().unwrap().clone()).unwrap();
    let mut json_file: File = File::create(file_path).expect("Failed to create file");
    json_file
        .write_all(&serialized_json)
        .expect("Failed to write to file");
}
fn traverse_directories(dir: String) {
    let approved_file_extensions: Vec<String> =
        vec!["png".to_string(), "jpg".to_string(), "jpeg".to_string()];

    let do_not_enter: Vec<String> = vec![
        "target".to_string(),
        r".vscode".to_string(),
        "node_modules".to_string(),
    ];

    println!("{}", dir.clone());
    let paths: fs::ReadDir = fs::read_dir(dir.clone()).unwrap();
    let mut files: Vec<String> = Vec::new();
    for path in paths {
        files.push(path.unwrap().path().display().to_string());
    }

    let mut i: usize = 0;
    while i < files.len() {
        let path: &Path = Path::new(&files[i]);
        if path.is_dir() {
            traverse_directories(files[i].clone());
        } else {
            if approved_file_extensions.contains(&get_file_extension(&files[i]))
                && !do_not_enter.contains(&path.display().to_string())
            {
                let mut images: std::sync::MutexGuard<'_, Vec<String>> = IMAGES.lock().unwrap();
                let _: &() = &images.push(path.display().to_string().clone());
            }
        }
        i += 1;
    }
}

fn get_file_extension(file: &str) -> String {
    let mut ext: String = String::new();
    for c in file.chars().rev() {
        if c != '.' {
            ext.insert(0, c);
        }
        break;
    }
    ext
}
