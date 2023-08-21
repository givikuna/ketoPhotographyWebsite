"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var url = require("url");
var fs = require("fs");
var replaceData_1 = require("./modules/replaceData");
var portServer_1 = require("./modules/portServer");
var findPath_1 = require("./modules/findPath");
var app = express();
var filename = "index";
var port = (0, portServer_1.getPort)(filename); // 8091
app.get("/", function (req, res) {
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
        var fpath = (0, findPath_1.findPath)(["public"], "index.html");
        return fs.existsSync(fpath) ? w((0, replaceData_1.replaceData)(String(fs.readFileSync(fpath)), url_info)) : w("");
    }
    catch (e) {
        console.error(e);
        return w("");
    }
}).listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port, "/"));
});
