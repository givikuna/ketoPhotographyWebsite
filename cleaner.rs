use std::fs::File;
use std::io::Read;
use std::process::Command;

fn main() {
    let mut file: File = File::open("./.gitignore").expect("Failed to read file");
    let mut files: String = String::new();
    file.read_to_string(&mut files)
        .expect("Failed to read file");
    let to_del: Vec<&str> = files.lines().collect();
    for _file in to_del {
        let output: std::process::Output = Command::new("bash")
            .arg("-c")
            .arg("rm ./".to_owned() + _file)
            .arg("sudo rm -r ./".to_owned() + _file)
            .output()
            .expect("Failed to run command");
        if output.status.success() {
            print!("deleted ./{}", _file);
        }
    }
}
