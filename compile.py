import os
import json

devnull = os.devnull

def run(command):
    os.system(f"{command} > {devnull} 2>&1")

run("python3 compilercleaner.py")
run("ts-node buildCompilerFile")

with open('compile.json') as file:
    data = json.load(file)

for lang in data:
    for file in lang["files"]:
        print(f"{'giving permissions to' if lang['type_'] == 'sh' else 'compiling'} {file['file']}")
        run(f"{lang['command']} {file['file'][2:-3] if file['file'][-2:] == 'rs' else file['file']}")
        if lang["type_"] == "rs": run(f"mv ./target/debug/{file['file'][2:-3]} ./")
    print("\n")
