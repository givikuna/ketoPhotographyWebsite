import * as fs from "fs";

import { CATEGORY, SESSION, STILL } from "../../types/types";
import { findPath } from "./findPath";

export function getStills(): ReadonlyArray<STILL> {
    return JSON.parse(fs.readFileSync(findPath(["img"], "stills.json"), "utf-8")) as ReadonlyArray<STILL>;
}

export function getCategories(): ReadonlyArray<CATEGORY> {
    return JSON.parse(
        fs.readFileSync(findPath(["img"], "categories.json"), "utf-8"),
    ) as ReadonlyArray<CATEGORY>;
}

export function getSessions(): ReadonlyArray<SESSION> {
    return JSON.parse(fs.readFileSync(findPath(["img"], "sessions.json"), "utf-8")) as ReadonlyArray<SESSION>;
}
