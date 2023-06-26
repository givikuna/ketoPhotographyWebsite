import * as fs from "fs";

import { isJSON, jsonify } from "../extensions/syntax";
import { findPath } from "../modules/findPath";

export const NULL: null = null;

export const ZERO: number = 0;

export const PORTS: JSON[] | null = isJSON(fs.readFileSync(findPath(["cgi", "constants"], "ports.json"), "utf-8"))
  ? jsonify(fs.readFileSync(findPath(["cgi", "constants"], "ports.json"), "utf-8")) : null;
