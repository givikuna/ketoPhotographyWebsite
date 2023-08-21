"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var url = require("url");
var fs = require("fs");
var portServer_1 = require("./modules/portServer");
var findPath_1 = require("./modules/findPath");
var replaceData_1 = require("./modules/replaceData");
var app = express();
var filename = "serve";
var port = (0, portServer_1.getPort)(filename); // 8095
function getExt(url_info) {
    var _default = "html";
    try {
        return "t" in url_info ? url_info["t"] : _default;
    }
    catch (e) {
        console.log(e);
        return _default;
    }
}
app.get("/", function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    var w = function (data) {
        if (data === void 0) { data = ""; }
        res.write(data);
        return res.end();
    };
    try {
        if (!req.url) {
            return w("");
        }
        var url_info = url.parse(req.url, true).query;
        if (Object.keys(url_info).length === 0 || !("c" in url_info)) {
            throw new Error("Wrong input");
        }
        var fpath = (0, findPath_1.findPath)(["public", "components"], "".concat(url_info["c"], ".").concat(getExt(url_info)));
        if (fs.existsSync(fpath)) {
            return w((0, replaceData_1.replaceData)(String(fs.readFileSync(fpath, "utf-8")), url_info));
        }
        throw new Error("Wrong input");
    }
    catch (e) {
        console.error(e);
        return w("");
    }
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port, "/"));
});
