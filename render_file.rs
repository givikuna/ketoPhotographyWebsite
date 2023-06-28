use serde_derive::Deserialize;
use serde_derive::Serialize;
use std::fs;
use std::io;
use std::process::Command;

#[derive(Clone, Serialize, Debug, Deserialize)]
pub struct Transpileable {
    type_: String,
    command: String,
    files: Vec<FileStruct>,
}

#[derive(Debug, Serialize, Deserialize)]
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
    println!("Enter the path of the file you want to compile or transpile: ");
    let stdin: io::Stdin = io::stdin();
    let mut input: String = String::new();
    stdin.read_line(&mut input).expect("Failed to read line");
    let file: String = if input.starts_with("./") {
        input.trim_end().to_string()
    } else if input.starts_with("/") {
        format!(".{}", input.trim_end())
    } else {
        format!("./{}", input.trim_end())
    };

    let cmd: String = "./build_render".to_string();
    let output = Command::new("bash")
        .arg("-c")
        .arg(cmd.clone())
        .output()
        .expect("Failed to execute command");
    if !output.status.success() {
        let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&output.stderr);
        println!("Before proceeding, buildrender.rs is broken, please fix it");
        println!("Error message: {}", stderr);
        return;
    }

    let json_content: String = fs::read_to_string("render.json").unwrap();
    let render_json: Vec<Transpileable> = serde_json::from_str(&json_content).unwrap();
    let mut files: Vec<String> = Vec::new();
    for item in render_json.clone() {
        for _file in &item.files {
            files.push(_file.file.clone());
        }
    }
    if file_exists(&file.to_string(), &files) {
        let m_cmd: String =
            get_command(file.to_string().clone(), render_json).to_string() + " " + &file;
        let m_output = Command::new("bash")
            .arg("-c")
            .arg(m_cmd.clone())
            .output()
            .expect("Failed to execute command");
        if m_output.status.success() {
            let stdout: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&output.stdout);
            println!("Great success!");
            println!("{}", stdout);
        } else {
            let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&output.stderr);
            println!("{} couldn't compile or transpile: {}", &file, stderr);
            return;
        }
    } else {
        println!("{} isn't compileable/transpileable or doesn't exist", file);
    }

    return;
}

fn get_command(file: String, arr: Vec<Transpileable>) -> String {
    for el in arr.clone() {
        for _file in el.files.clone() {
            if _file.file == file {
                return el.command;
            }
        }
    }
    "".to_string()
}

fn file_exists(file: &String, files: &Vec<String>) -> bool {
    let mut flag: bool = false;
    if files.contains(&file.to_string()) {
        flag = true;
    }
    let mut i: usize = 0;
    while &i < &files.len() {
        println!("{}", &filename(&files[i]));
        if &&filename(&files[i]) == &file {
            flag = true;
        }
        i += 1;
    }
    flag
}

fn filename(file: &String) -> String {
    std::path::Path::new(file).file_name().and_then(std::ffi::OsStr::to_str).unwrap().to_string()
}
