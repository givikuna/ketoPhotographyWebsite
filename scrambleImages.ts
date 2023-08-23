import * as fs from "fs";
import * as _ from "lodash";

import prettier from "prettier";

import { Album } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

<<<<<<< HEAD
const albumData: Album[] = JSON.parse(fs.readFileSync("./img/info.json", "utf8")) as Album[];
=======
const albumData: Album[] = require("./img/info.json") as Album[];
>>>>>>> main

for (let o: number = 0; o < 20; o++) {
    for (let i: number = 0; i < albumData.length; i++) {
        albumData[i].images = _.shuffle(albumData[i].images as ReadonlyArray<string>);
    }
}

(async (): Promise<void> => {
    fs.writeFileSync(
        findPath(["img"], "info.json"),
        await prettier.format(JSON.stringify(albumData), {
            parser: "json",
            ...(require("./.prettierrc.json") as JSON),
        }),
        "utf8",
    );
})();
