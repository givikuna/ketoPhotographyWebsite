import subprocess
import json

subprocess.run("npm install".split());
subprocess.run("cargo build".split())
subprocess.run("cargo run --bin build_render".split())

with open("./render.json", "r") as file:
    toCompile = file.read()

r = json.loads(toCompile)


def file_extension(file_name):
    return file_name.split(".")[-1]


def remove_extension(file_name):
    index = file_name.rfind(".")
    if index != -1:
        return file_name[:index]
    else:
        return file_name


def remove_path(file_name):
    return file_name.split("/")[-1]


def file_name_fixer(file_name):
    if file_extension(file_name) == "rs":
        return remove_path(remove_extension(file_name))
    else:
        return file_name


def get_right_text(type_):
    if type_ == "rs" or type_ == "cr" or type_ == "jl":
        return "compiling"
    elif type_ == "sh":
        return "giving permissions to"
    return "transpiling"


def file_path(fp):
    if fp == "":
        return " ./"
    return " " + fp


def main():
    for i in r:
        for _file in i["files"]:
            print(get_right_text(i["type_"]) + " " + _file["file"])
            cmd = i["command"] + " " + file_name_fixer(_file["file"])
            # print("w/ " + cmd)
            subprocess.run(cmd.split())
            if i["type_"] == "rs":
                mv_cmd = (
                    "mv ./target/debug/"
                    + file_name_fixer(_file["file"])
                    + file_path(_file["dir"])
                )
                subprocess.run(mv_cmd.split())
        print("\n")


main()
