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
    let json_content: String = fs::read_to_string("render.json").unwrap();
    let render_json: Vec<Transpileable> = serde_json::from_str(&json_content).unwrap();

    let mut langs: Vec<String> = Vec::new();
    for item in render_json.clone() {
        langs.push(item.type_.clone());
    }
    let langs_string: String = langs.iter().cloned().collect::<Vec<_>>().join(", ");

    println!("what language do you want to render? ({})", langs_string);
    let stdin: io::Stdin = io::stdin();
    let mut input: String = String::new();
    stdin.read_line(&mut input).expect("Failed to read line");
    let lang: &str = input.trim_end();

    let buildrender_output: std::process::Output = Command::new("bash")
        .arg("-c")
        .arg("./build_render")
        .output()
        .expect("Failed to execute command");

    if buildrender_output.status.success() {
        let stdout: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&buildrender_output.stdout);
        println!("built render.json w/ {}", stdout);
    } else {
        let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&buildrender_output.stderr);
        println!("Error: {}", stderr);
        return;
    }

    if let Some(i) = langs.iter().position(|x: &String| x == lang) {
        let item: &Transpileable = &render_json.clone()[i];
        // println!("WOW");
        let cmd: &String = &item.command;
        for _file in &item.files {
            let _cmd: String = cmd.clone()
                + " "
                + fix_rust_file((&_file.file).to_string(), lang.to_string()).as_str();
            let output: std::process::Output = Command::new("bash")
                .arg("-c")
                .arg(_cmd.clone())
                .output()
                .expect("Failed to execute command");
            if output.status.success() {
                let stdout: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&output.stdout);
                println!(
                    "Rendered {} successfully with {}: \n{}",
                    &_file.file, _cmd, stdout
                );

                move_file(&_file);
            } else {
                let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&output.stderr);
                println!(
                    "Command \"{}\" failed to render {} :\n{}",
                    _cmd, &_file.file, stderr
                );
            }
        }
    } else {
        println!("'{}' not found in 'langs'", lang);
    }
}

fn fix_rust_file(rust_file: String, lang: String) -> String {
    if lang != "rs" {
        return rust_file;
    }
    return rust_file[2..rust_file.len() - 3].to_string();
}

fn move_file(_file: &&FileStruct) {
    if file_extension(&_file.file) == "cr" || file_extension(&_file.file) == "rs" {
        if is_test(remove_extension(&_file.file).as_str()) {
            let cmd: String = if file_extension(&_file.file) == "cr" {
                "mv ./".to_owned() + &remove_extension(&_file.file) + " " + "./tests"
            } else {
                "mv ./target/release/".to_owned()
                    + &remove_extension(&_file.file).as_str()
                    + " "
                    + "./tests"
            };
            let _output: std::process::Output = Command::new("bash")
                .arg("-c")
                .arg(cmd.clone())
                .output()
                .expect("Failed to execute program");
        }
    }
}

fn file_extension(file: &str) -> String {
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

fn remove_extension(file: &String) -> String {
    let mut no_ext: String = "".to_string();
    no_ext = no_ext.replace(
        (".".to_string() + file_extension(&file).as_str()).as_str(),
        "",
    );
    no_ext
}

fn is_test(file: &str) -> bool {
    let mut data_: String = String::new();
    let mut flag: bool = false;
    for c in file.chars().rev() {
        if c != '_' && c != '.' {
            data_ = data_ + c.to_string().as_str();
        } else {
            if data_.contains("test") {
                flag = true;
                break;
            }
            continue;
        }
    }
    flag
}
