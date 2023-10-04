import * as fs from "fs";

import { CATEGORY, SESSION, STILL, Immutable2DArray } from "../../types/types";
import { findPath } from "./findPath";

export function getStills(): Immutable2DArray<STILL> {
    return JSON.parse(fs.readFileSync(findPath(["img"], "stills.json"), "utf-8")) as Immutable2DArray<STILL>;
}

export function getCategories(): Immutable2DArray<CATEGORY> {
    return JSON.parse(
        fs.readFileSync(findPath(["img"], "categories.json"), "utf-8"),
    ) as Immutable2DArray<CATEGORY>;
}

export function getSessions(): Immutable2DArray<SESSION> {
    return JSON.parse(
        fs.readFileSync(findPath(["img"], "sessions.json"), "utf-8"),
    ) as Immutable2DArray<SESSION>;
}
