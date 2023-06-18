use lazy_static::lazy_static;
use std::sync::Mutex;
use std::{io, process::Command};

lazy_static! {
    static ref ADD: Mutex<String> = Mutex::new("git add .".to_string());
    static ref COMMIT: Mutex<String> = Mutex::new("git commit -m ".to_string());
    static ref PUSH: Mutex<String> = Mutex::new("git push".to_string());
}

fn main() {
    if commit() {
        push();
    } else {
        println!("everything somehow failed. figure it out");
    }
}

fn push() {
    println!("Do you want to push these changes ");
    let stdin: io::Stdin = io::stdin();
    let mut input: String = String::new();
    stdin.read_line(&mut input).expect("Failed to read line");
    input = input.trim().to_string();
    if input == "y" {
        let push_cmd: String = PUSH.lock().unwrap().clone();
        let push_output: std::process::Output = Command::new("bash")
            .arg("-c")
            .arg(push_cmd.clone())
            .output()
            .expect("Failed to execute command");
        if push_output.status.success() {
            let stdout: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&push_output.stdout);
            println!("pushed all changes without any issues\n{}", stdout);
        } else {
            let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&push_output.stderr);
            println!("failed to push the changes to the repo.\n{}", stderr);
        }
    }
}

fn commit() -> bool {
    println!("Do you want to commit these changes? ");
    let stdin: io::Stdin = io::stdin();
    let mut input: String = String::new();
    stdin.read_line(&mut input).expect("Failed to read line");
    input = input.trim().to_string();
    if input == "y" || input == "Y" {
        if add() {
            let commit_cmd: String =
                COMMIT.lock().unwrap().clone() + "\"" + commitname().as_str() + "\"";
            println!("{}", commit_cmd.clone());
            let commit_output: std::process::Output = Command::new("bash")
                .arg("-c")
                .arg(commit_cmd.clone())
                .output()
                .expect("Failed to execute commmand");
            if commit_output.status.success() {
                let stdout: std::borrow::Cow<'_, str> =
                    String::from_utf8_lossy(&commit_output.stdout);
                println!("committed all the changes to the repo\n{}", stdout);
            } else {
                let stderr: std::borrow::Cow<'_, str> =
                    String::from_utf8_lossy(&commit_output.stderr);
                println!("failed to commit the changes to the repo.\n{}", stderr);
                return false;
            }
        } else {
            println!("failed to add changes");
            return false;
        }
    } else {
        return false;
    }
    true
}

fn add() -> bool {
    let add_cmd: String = ADD.lock().unwrap().clone();
    let add_output: std::process::Output = Command::new("bash")
        .arg("-c")
        .arg(add_cmd.clone())
        .output()
        .expect("Failed to execute command");
    if add_output.status.success() {
        let stdout: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&add_output.stdout);
        println!("added all files. \n{}", stdout);
    } else {
        let stderr: std::borrow::Cow<'_, str> = String::from_utf8_lossy(&add_output.stderr);
        println!("failed to add all the files. \n{}", stderr);
        return false;
    }
    true
}

fn commitname() -> String {
    println!("name your commit:");
    let stdin: io::Stdin = io::stdin();
    let mut input: String = String::new();
    stdin.read_line(&mut input).expect("Failed to read line");
    input = input.trim().to_string();
    input
}
