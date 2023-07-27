import os
import json

devnull: str = os.devnull

def run(command: str) -> None:
    os.system(f"{command} > {devnull} 2>&1")

print("cleaning up previously compiled data..")
run("python3 compilercleaner.py")
print("collecting data for the compilation to begin...")
run("ts-node buildCompilerFile")

with open('compile.json') as file:
    data: dict | list = json.load(file)

for lang in data:
    for file in lang["files"]:
        print(f"{'giving permissions to' if lang['type_'] == 'sh' else 'compiling'} {file['file']}...")
        run(f"{lang['command']} {file['file'][2:-3] if file['file'][-2:] == 'rs' else file['file']}")
        if lang["type_"] == "rs": run(f"mv ./target/debug/{file['file'][2:-3]} ./")
    print("\n")
