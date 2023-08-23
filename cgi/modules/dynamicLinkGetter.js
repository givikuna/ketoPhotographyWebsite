"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynLink = void 0;
var fs = require("fs");
var lsse = require("lsse");
var findPath_1 = require("./findPath");
function getDynLink() {
    var _default = "http://127.0.0.1";
    try {
        var fpath = (0, findPath_1.findPath)(["public", "data"], "dynamicLink.txt");
        if (fs.existsSync(fpath)) {
            return lsse.supertrim(fs.readFileSync(fpath).toString());
        }
        throw new Error("dynamic link not found");
    } catch (e) {
        console.error(e);
        return _default;
    }
}
exports.getDynLink = getDynLink;
