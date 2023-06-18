import os
import json


def valid_distro(distro):
    for o in valid_distros:
        if o.lower() == distro.lower():
            return True
    return False


def get_base(c):
    if c.lower() == "nixos":
        return "NixOS"
    for l in r:
        for m in l["distributions"]:
            if m == c:
                return l["base"]
    return r[0]["base"]


def get_install_cmd(dep, _for):
    if (
        dep.lower() == "typescript"
        or dep.lower() == "livescript"
        or dep.lower() == "coffeescript"
    ):
        return "npm install -g " + dep.lower()
    else:
        with open("./install_dependencies.json", "r") as _file_:
            install_dependencies_data = _file_.read()
        arr = json.loads(install_dependencies_data)
        for _r in arr:
            if _r["dependency"] == dep:
                return _r[get_base(_for.lower()).lower()]
    return ""


print("These are the supported Linux distributions: ")
with open("./supported_distros.json", "r") as file:
    to_read = file.read()


r = json.loads(to_read)


valid_distros = []


for i in r:
    if i["base"] != "other":
        print(i["base"] + " based:")
        valid_distros.append(i["base"])
    else:
        print(i["base"])
    for k in i["distributions"]:
        print("\t" + k)
        valid_distros.append(k)
    print("\n\n")


choice = input("Enter the name of your system: ")


if not valid_distro(choice.lower()):
    print("the choice is not valid, try again. for extra help read README.md")
else:
    with open("./install_dependencies.json", "r") as _file_:
        install_dependencies_data = _file_.read()
    arr = json.loads(install_dependencies_data)
    to_install = []
    for j in arr:
        user_input = input("install " + j["dependency"] + " (y/n)? ")
        if user_input == "y":
            to_install.append(j["dependency"])
    for i_ in to_install:
        os.system(get_install_cmd(i_, choice.lower()))

    os.system("chmod +x ./build.sh")
    os.system("./build.sh")
