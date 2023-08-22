"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = exports.getFileExtension = exports.supertrim = exports.isJSON = exports.isBlank = void 0;
function isBlank(input) {
    return !input || input == null || input == "" || input == undefined;
}
exports.isBlank = isBlank;
function isJSON(obj) {
    try {
        if (typeof obj !== "string") return false;
        var ans = JSON.parse(obj);
        if (["", [], {}, null, undefined].includes(ans) || typeof ans === "undefined" || Array.isArray(ans)) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}
exports.isJSON = isJSON;
function supertrim(input) {
    return input.replace(/\r?\n|\r/g, "").trim();
}
exports.supertrim = supertrim;
function getFileExtension(file) {
    if (file == undefined || file == null) return undefined;
    return file.split(".").length > 1 ? file.split(".").pop() : undefined;
}
exports.getFileExtension = getFileExtension;
function isNumeric(givenString) {
    if (typeof givenString !== "string") return false;
    return /^-?\d+$/.test(givenString);
}
exports.isNumeric = isNumeric;
