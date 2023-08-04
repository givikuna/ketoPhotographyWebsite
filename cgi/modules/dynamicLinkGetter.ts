import { existsSync, readFileSync } from "fs";

import { PathLike } from "fs";

import { supertrim } from "../extensions/syntax";
import { findPath } from "./findPath";

export function getDynLink(): PathLike {
    const _default: string = "http://127.0.0.1";
    try {
        const fpath: Readonly<PathLike> = findPath(["public", "data"], "dynamicLink.txt");
        if (existsSync(fpath)) return supertrim(readFileSync(fpath).toString());
        throw new Error("dynamic link not found");
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}
