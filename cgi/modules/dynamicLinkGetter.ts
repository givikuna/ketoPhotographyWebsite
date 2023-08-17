import * as fs from "fs";

import { print } from "lsse";

import { supertrim } from "../extensions/syntax";
import { findPath } from "./findPath";

export function getDynLink(): fs.PathLike {
    const _default: ReturnType<typeof getDynLink> = "http://127.0.0.1";

    try {
        const fpath: Readonly<fs.PathLike> = findPath(["public", "data"], "dynamicLink.txt");

        if (fs.existsSync(fpath)) {
            return supertrim(fs.readFileSync(fpath).toString());
        }

        throw new Error("dynamic link not found");
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}
