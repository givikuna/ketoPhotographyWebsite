import os
import json

devnull = os.devnull

def run(command):
    os.system(f"{command} > {devnull} 2>&1")

run("cargo run --bin build_render")

with open('render.json') as file:
    data = json.load(file)

for lang in data:
    for file in lang["files"]:
        print(f"compiling {file['file']}")
        run(f"{lang['command']} {file['file'][2:-3] if file['file'][-2:] == 'rs' else file['file']}")
        if lang["type_"] == "rs": run(f"mv ./target/debug/{file['file'][2:-3]} ./")
    print("\n")
