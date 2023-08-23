import * as fs from "fs";
import * as prettier from "prettier";

import { Album, ImageExtension, imageExtensions } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";
import { getFileExtension } from "./cgi/extensions/syntax";

function isImage(img: string | ImageExtension) {
    if (img == undefined || img == null) {
        return false;
    }

    const imgExtension: string | undefined = getFileExtension(img);

    if (typeof imgExtension === "string") {
        return imageExtensions
            .map((extension: ImageExtension): string => {
                return extension as string;
            })
            .includes(imgExtension);
    }

    return false;
}

const dir: string = "./img";
const albumData: Album[] = require("./img/info.json") as Album[];

const albumDirectories: string[] = fs
    .readdirSync(dir)
    .filter((item: string): boolean => fs.statSync(`${dir}/${item}`).isDirectory());

if (albumDirectories.length <= 0) process.exit();

for (let i: number = 0; i < albumDirectories.length; i++) {
    for (let j: number = 0; j < albumData.length; j++) {
        if (albumData[j].album === albumDirectories[i]) {
            albumData[j].images = fs
                .readdirSync(`${dir}/${albumDirectories[i]}`)
                .filter((item: string): boolean => {
                    return isImage(item);
                });
        }
    }
}

(async (): Promise<void> => {
    fs.writeFileSync(
        findPath(["img"], "info.json"),
        await prettier.format(JSON.stringify(albumData), {
            parser: "json",
            ...require("./.prettierrc.json"),
        }),
        "utf8",
    );
})();
