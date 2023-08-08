import * as fs from "fs";
import prettier from "prettier";

import { Album } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

type Image = string;

const albumData: Album[] = JSON.parse(
    fs.readFileSync(findPath(["img"], "info.json"), {
        encoding: "utf8",
        flag: "r",
    }),
) as Album[];

function scrambleImages(arr: Image[]): Image[] {
    let arr2: Image[] = [...arr];
    for (var i: number = arr2.length - 1; i > 0; i--) {
        var j: number = Math.floor(Math.random() * (i + 1));
        var temp: Image = arr2[i];
        arr2[i] = arr2[j];
        arr2[j] = temp;
    }
    return arr2;
}

for (let o: number = 0; o < 20; o++) {
    for (let i: number = 0; i < albumData.length; i++) albumData[i].images = scrambleImages(albumData[i].images);
}

fs.writeFileSync(
    findPath(["img"], "info.json"),
    await prettier.format(JSON.stringify(albumData), {
        parser: "json",
        ...require(".prettierrc.json"),
    }),
    "utf8",
);
