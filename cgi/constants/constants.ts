import * as syntax from "../extensions/syntax";
const { isJSON, jsonify } = syntax;
import * as fs from "fs";
import * as f from "../modules/findPath";
const { findPath } = f;

export const NULL: null = null;

export const ZERO: number = 0;

export const PORTS: any = isJSON(
  fs.readFileSync(findPath(["cgi", "constants"], "ports.json"), "utf-8")
)
  ? jsonify(
    fs.readFileSync(findPath(["cgi", "constants"], "ports.json"), "utf-8")
  )
  : null;