import { to_vec, Vec } from "../../types/classes";

import * as fs from "fs";

import { CATEGORY, SESSION, STILL } from "../../types/types";
import { findPath } from "./findPath";

export function getStills(): Vec<STILL> {
    return to_vec(JSON.parse(fs.readFileSync(findPath(["img"], "stills.json"), "utf-8")) as Array<STILL>);
}

export function getCategories(): Vec<CATEGORY> {
    return to_vec(
        JSON.parse(fs.readFileSync(findPath(["img"], "categories.json"), "utf-8")) as Array<CATEGORY>,
    );
}

export function getSessions(): Vec<SESSION> {
    return to_vec(JSON.parse(fs.readFileSync(findPath(["img"], "sessions.json"), "utf-8")) as Array<SESSION>);
}
