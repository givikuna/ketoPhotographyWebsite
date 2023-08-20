import json
import os

devnull: str = os.devnull


def run(command: str) -> None:
    os.system(f"{command} > {devnull} 2>&1")


with open("compile.json") as file:
    data: dict | list = json.load(file)

for lang in data:
    for file in lang["files"]:
        if lang["type_"] != "sh":
            run(f"rm {file['compilesTo']}")
