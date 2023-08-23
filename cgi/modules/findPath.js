"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErr = exports.findPath = void 0;
var fs = require("fs");
var path = require("path");
function findPath(folders, requestedFile, reqFrom) {
    if (reqFrom === void 0) {
        reqFrom = "index";
    }
    var cFunc = "findPath";
    var def = "";
    try {
        var fPath = "";
        var foundDir = false;
        var count = 0;
        var i = 0;
        while (i < folders.length) {
            var folder = fPath + folders[i];
            if (fs.existsSync(folder)) {
                if (i === 0 && !foundDir && count === 0) {
                    foundDir = true;
                    fPath = "./";
                }
                fPath += folders[i] + "/";
                i++;
                continue;
            }
            i = -1;
            fPath += "../";
            if (count > 7) {
                break;
            }
            count++;
            i++;
        }
        var p = path.join(fPath, requestedFile);
        if (fs.existsSync(p)) {
            return p;
        }
        return def;
    } catch (e) {
        return logErr(cFunc, e, def, reqFrom);
    }
}
exports.findPath = findPath;
function logErr(cFunc, e, def, filename) {
    if (def === void 0) {
        def = "";
    }
    console.error("".concat(filename, " ").concat(cFunc, "() ERROR: ").concat(e));
    return def;
}
exports.logErr = logErr;
