use lazy_static::lazy_static;
use serde_derive::Serialize;
use serde_json;
use std::fs;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use std::sync::Mutex;

lazy_static! {
    static ref COUNT: Mutex<u32> = Mutex::new(0);
}

lazy_static! {
    static ref TRANSPILEABLES: Mutex<Vec<Transpileable>> = Mutex::new(vec![
        Transpileable {
            type_: String::from("rs"),
            command: String::from("cargo build --bin"),
            files: vec![],
        },
        Transpileable {
            type_: String::from("ts"),
            command: String::from("tsc"),
            files: vec![],
        },
        Transpileable {
            type_: String::from("cr"),
            command: String::from("crystal build"),
            files: vec![],
        },
        Transpileable {
            type_: String::from("sh"),
            command: String::from("sudo chmod +x"),
            files: vec![],
        },
    ]);
}

#[derive(Serialize, Clone, Debug)]
pub struct Transpileable {
    type_: String,
    command: String,
    files: Vec<FileStruct>,
}

#[derive(Debug, Serialize)]
pub struct FileStruct {
    dir: String,
    file: String,
}

impl Clone for FileStruct {
    fn clone(&self) -> Self {
        FileStruct {
            dir: self.dir.clone(),
            file: self.file.clone(),
        }
    }
}

fn main() {
    traverse_directories("./".to_string());
    save_data(TRANSPILEABLES.lock().unwrap().clone());
}

fn save_data(_transpileables: Vec<Transpileable>) {
    let file_path: &str = "./render.json";
    let serialized_json: Vec<u8> = serde_json::to_vec(&_transpileables).unwrap();
    let mut json_file: std::fs::File = File::create(file_path).expect("Failed to create file");
    json_file
        .write_all(&serialized_json)
        .expect("Failed to write to file");
}

fn traverse_directories(dir: String) {
    let do_not_enter: Vec<String> = vec![
        ".git".to_string(),
        "coverage".to_string(),
        "data".to_string(),
        "node_modules".to_string(),
        "target".to_string(),
        "assets".to_string(),
        "data".to_string(),
        "archived".to_string(),
        "components".to_string(),
        "lib".to_string(),
        "types".to_string(),
    ];

    let approved_file_extensions: Vec<String> =
        vec!["rs".to_string(), "ts".to_string(), "cr".to_string()];

    let paths: std::fs::ReadDir = fs::read_dir(dir.clone()).unwrap();
    let mut _files: Vec<String> = Vec::new();
    for path in paths {
        _files.push(path.unwrap().path().display().to_string());
    }

    let mut _i: usize = 0;
    while _i < _files.len() {
        let path: &Path = Path::new(&_files[_i]);
        if path.is_dir() {
            if !do_not_enter.contains(&get_dir_name(&_files[_i])) {
                traverse_directories(_files[_i].clone());
            }
        } else {
            if approved_file_extensions.contains(&get_file_extension(&_files[_i])) {
                let mut _j: usize = 0;
                while _j < TRANSPILEABLES.lock().unwrap().len() {
                    if TRANSPILEABLES.lock().unwrap()[_j].type_ == get_file_extension(&_files[_i]) {
                        let _file: Vec<FileStruct> = vec![FileStruct {
                            dir: strip_dir(&dir),
                            file: _files[_i].clone(),
                        }];
                        TRANSPILEABLES.lock().unwrap()[_j]
                            .files
                            .push(_file[0].clone());
                    }
                    _j += 1;
                }
            }
        }
        _i += 1;
    }

    count_up();
    {
        let count: std::sync::MutexGuard<u32> = COUNT.lock().unwrap();
        if *count > 200 {
            return;
        }
    }
}

fn count_up() {
    let mut count: std::sync::MutexGuard<u32> = COUNT.lock().unwrap();
    *count += *count + 1;
}

fn get_file_extension(file: &str) -> String {
    let mut ext: String = String::new();
    for c in file.chars().rev() {
        if c != '.' {
            ext.insert(0, c);
        } else {
            break;
        }
    }
    ext
}

fn strip_dir(dir: &str) -> String {
    let mut stripped_dir: String = String::new();
    let mut current_dir: String = String::new();
    for c in dir.chars().rev() {
        if c != '/' {
            current_dir.insert(0, c);
        } else if current_dir != "ketoWebsite" {
            stripped_dir = format!(
                "{}{}{}",
                current_dir,
                if stripped_dir.is_empty() { "" } else { "/" },
                stripped_dir
            );
            current_dir.clear();
        } else {
            break;
        }
    }
    stripped_dir
}

fn get_dir_name(dir: &str) -> String {
    let mut dir_name: String = String::new();
    for c in dir.chars().rev() {
        if c != '/' {
            dir_name.insert(0, c);
        } else {
            break;
        }
    }
    dir_name
}
