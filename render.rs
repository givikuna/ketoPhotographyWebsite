use serde_derive::Deserialize;
use serde_derive::Serialize;
use serde_json;
use std::fs;
use std::process::Command;

#[derive(Clone, Serialize, Debug, Deserialize)]
pub struct Transpileable {
    type_: String,
    command: String,
    files: Vec<FileStruct>,
}

impl Clone for FileStruct {
    fn clone(&self) -> Self {
        FileStruct {
            dir: self.dir.clone(),
            file: self.file.clone(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FileStruct {
    dir: String,
    file: String,
}

fn main() {
    clean();
    build();

    let json_content: String = fs::read_to_string("render.json").unwrap();
    let render_json: Vec<Transpileable> = serde_json::from_str(&json_content).unwrap();

    let mut i: usize = 0;
    while i < render_json.len() {
        let mut j: usize = 0;
        let el: &Transpileable = &render_json[i];
        while j < render_json[i].files.len() {
            let _file: &FileStruct = &render_json[i].files[j];
            println!("{} {}", get_right_text(el.type_.clone()), _file.file);
            let cmd: String = el.command.clone() + " " + file_name_fixer(&_file.file);
            run_command(&cmd);
            if el.type_ == "rs" {
                let mv_cmd: String = "mv ./target/debug/".to_owned()
                    + file_name_fixer(&_file.file)
                    + " "
                    + file_path(&_file.dir).as_str();
                run_command(&mv_cmd);
            }
            j += 1;
        }
        i += 1;
    }
}

fn build() {
    run_command(&"cargo run --bin build_render".to_string());
}

fn clean() {
    run_command(&"cargo run --bin cleaner".to_string())
}

fn get_right_text(type_: String) -> &'static str {
    if type_ == "rs" || type_ == "cr" || type_ == "go" {
        return "compiling";
    } else if type_ == "sh" {
        return "giving perms to";
    }
    "transpiling"
}

fn file_name_fixer(file_name: &str) -> &str {
    if file_extension(&file_name) == "rs" {
        return remove_path(&remove_extension(&file_name));
    }
    file_name
}

fn file_extension(file_path: &str) -> String {
    let extension: Option<&str> = std::path::Path::new(file_path)
        .file_name()
        .expect("")
        .to_str()
        .expect("")
        .split('.')
        .last();
    return extension.expect("").to_string();
}

fn remove_path(file_name: &str) -> &str {
    file_name.rsplit('/').next().unwrap_or(file_name)
}

fn remove_extension(file_name: &str) -> &str {
    if let Some(index) = file_name.rfind('.') {
        return &file_name[..index];
    }
    file_name
}

fn run_command(cmd: &String) {
    let output: std::process::Output = Command::new("bash")
        .arg("-c")
        .arg(cmd.clone())
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        println!("ERROR: {}", stderr);
    }
}

fn file_path(fp: &str) -> String {
    if fp.is_empty() {
        return " ./".to_string();
    }
    return " ".to_owned() + fp;
}
