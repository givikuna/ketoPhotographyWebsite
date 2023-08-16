import * as fs from "fs";
import * as prettier from "prettier";

import { Album } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

const albumData: Album[] = require("./img/info.json") as Album[];

for (let i: number = 0; i < albumData.length; i++) {
    albumData[i].images = [];
}

(async (): Promise<void> => {
    fs.writeFileSync(
        findPath(["img"], "info.json"),
        await ((_albumData: Readonly<Album[]>): Promise<string> => {
            return prettier.format(JSON.stringify(_albumData), {
                parser: "json",
                ...require("./.prettierrc.json"),
            });
        })(albumData as Readonly<typeof albumData>),
        "utf8",
    );
})();
