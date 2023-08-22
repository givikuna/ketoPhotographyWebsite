import * as fs from "fs";
import * as lsse from "lsse";

import { findPath } from "./findPath";

export function getDynLink(): fs.PathLike {
    const _default: ReturnType<typeof getDynLink> = "http://127.0.0.1";

    try {
        const fpath: Readonly<fs.PathLike> = findPath(["public", "data"], "dynamicLink.txt");

        if (fs.existsSync(fpath)) {
            return lsse.supertrim(fs.readFileSync(fpath).toString());
        }

        throw new Error("dynamic link not found");
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}
