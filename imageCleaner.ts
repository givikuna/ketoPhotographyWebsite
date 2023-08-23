import * as fs from "fs";
import * as prettier from "prettier";

import { Album, Immutable2DArray, Unarray } from "./cgi/types/types";
import { findPath } from "./cgi/modules/findPath";

const albumData: Album[] = require("./img/info.json") as Album[];

for (let i: number = 0; i < albumData.length; i++) {
    albumData[i].images = [];
}

(async (): Promise<void> => {
    fs.writeFileSync(
        findPath(["img"], "info.json"),
        await ((_albumData: Immutable2DArray<Album>): Promise<string> => {
            return prettier.format(JSON.stringify(_albumData), {
                parser: "json",
                ...require("./.prettierrc.json"),
            });
        })(albumData as Immutable2DArray<Unarray<typeof albumData>>),
        "utf8",
    );
})();
