import os
import json

os.system("cargo run --bin build_render")

with open('render.json') as file:
    data = json.load(file)

for lang in data:
    for file in lang["files"]:
        print(f"compiling {file['file']}")
        os.system(f"{lang['command']} {file['file']}")
        if lang["type"] == "rs": os.system(f"mv ./target/debug/{file['file'][2:-3]} ./")
    print("\n")
