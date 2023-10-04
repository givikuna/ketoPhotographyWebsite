"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessions = exports.getCategories = exports.getStills = void 0;
var fs = require("fs");
var findPath_1 = require("./findPath");
function getStills() {
    return JSON.parse(fs.readFileSync((0, findPath_1.findPath)(["img"], "stills.json"), "utf-8"));
}
exports.getStills = getStills;
function getCategories() {
    return JSON.parse(fs.readFileSync((0, findPath_1.findPath)(["img"], "categories.json"), "utf-8"));
}
exports.getCategories = getCategories;
function getSessions() {
    return JSON.parse(fs.readFileSync((0, findPath_1.findPath)(["img"], "sessions.json"), "utf-8"));
}
exports.getSessions = getSessions;
