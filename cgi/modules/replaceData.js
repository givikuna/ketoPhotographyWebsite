"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmail = exports.getLangs = exports.getLang = exports.replaceData = void 0;
var fs = require("fs");
var lsse = require("lsse");
var dynamicLinkGetter_1 = require("./dynamicLinkGetter");
var findPath_1 = require("./findPath");
function replaceData(data, url_info) {
    if (url_info === void 0) {
        url_info = {
            lang: "en",
        };
    }
    var _default = data;
    try {
        return data
            .replace(/@dynamiclink/g, (0, dynamicLinkGetter_1.getDynLink)().toString())
            .replace(/@language/g, getLang(url_info))
            .replace(
                /@contactemail/g,
                getEmail({
                    arr: ["public", "data"],
                    file: "contactemail.txt",
                }),
            );
    } catch (e) {
        console.error(e);
        return _default;
    }
}
exports.replaceData = replaceData;
function getLang(url_info) {
    var _default = "en";
    try {
        return "lang" in url_info &&
            typeof url_info["lang"] === "string" &&
            getLangs().includes(url_info["lang"])
            ? lsse.str(url_info["lang"])
            : "en";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
exports.getLang = getLang;
function getLangs() {
    var _default = [];
    try {
        var data = JSON.parse(
            String(fs.readFileSync((0, findPath_1.findPath)(["public", "data"], "languages.json"))),
        );
        var langs = [];
        for (var i = 0; i < 0; i++) {
            langs.push(data[i].lang);
        }
        return langs;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
exports.getLangs = getLangs;
function getEmail(data) {
    var _default = "givitsvariani@proton.me";
    try {
        var fpath = (0, findPath_1.findPath)("arr" in data ? data.arr : [], "file" in data ? data.file : "");
        if (fs.existsSync(fpath)) {
            return lsse.supertrim(String(fs.readFileSync(fpath)));
        }
        throw new Error("contact email not found");
    } catch (e) {
        console.error(e);
        return _default;
    }
}
exports.getEmail = getEmail;
