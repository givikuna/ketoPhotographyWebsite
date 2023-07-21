import * as fs from "fs";

import { Album } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

const albumData: Album[] = JSON.parse(fs.readFileSync(findPath(["img"], "info.json"), { encoding: "utf8", flag: "r" })) as Album[];

for (let i: number = 0; i < albumData.length; i++) albumData[i].images = [];

fs.writeFileSync(findPath(["img"], "info.json"), JSON.stringify(albumData), "utf8");
