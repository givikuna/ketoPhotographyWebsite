import * as fs from "fs";
import * as prettier from "prettier";

import { Album } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

const albumData: Album[] = JSON.parse(
    fs.readFileSync(findPath(["img"], "info.json"), {
        encoding: "utf8",
        flag: "r",
    }),
) as Album[];

for (let i: number = 0; i < albumData.length; i++) {
    albumData[i].images = [];
}

fs.writeFileSync(
    findPath(["img"], "info.json"),
    await prettier.format(JSON.stringify(albumData), {
        parser: "json",
        ...require(".prettierrc.json"),
    }),
    "utf8",
);
