import json
import os

devnull = os.devnull

def run(command):
    os.system(f"{command} > {devnull} 2>&1")

with open('compile.json') as file:
    data = json.load(file)

for lang in data:
    for file in lang["files"]:
        if lang["type_"] != 'sh': run(f"rm {file['compilesTo']}")
