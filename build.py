import os
import json

with open('install_dependencies.json', 'r') as file:
    data = json.load(file)

install_rust = input("install rust? (y/n): ")
if install_rust == "y": os.system(data[0]["a"])

install_typescript = input("install typescript? (y/n): ")
if install_typescript == "y": os.system(data[1]["a"])

os.system("chmod +x ./build.sh && ./build.sh")
