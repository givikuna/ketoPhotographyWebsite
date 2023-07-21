import os
import json

with open('install_dependencies.json', 'r') as file:
    data = json.load(file)

for dep in data:
    install = input(f"Install {dep['dependency']}? (y/n): ").strip()
    if install == "y": os.system(dep["a"])

os.system("make")
