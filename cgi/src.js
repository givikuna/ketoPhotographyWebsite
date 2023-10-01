"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var fs = require("fs");
var http = require("http");
var findPath_1 = require("./modules/findPath");
var portServer_1 = require("./modules/portServer");
var dynamicLinkGetter_1 = require("./modules/dynamicLinkGetter");
var filename = "src";
var port = (0, portServer_1.getPort)(filename); // 8093
function getSourceFileExtension(url_info) {
    var _default = "js";
    try {
        var m_type = url_info["type"];
        return m_type === "style" || m_type === "css" ? "css" : "js";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getPath(url_info, requestsLibrary) {
    var _default = "../public/components/home.html";
    try {
        if (requestsLibrary) {
            return (0, findPath_1.findPath)(
                ["public", "lib"],
                "".concat(url_info["type"], ".").concat(getSourceFileExtension(url_info)),
            );
        }
        return "type" in url_info && String(url_info["type"]) === "script"
            ? (0, findPath_1.findPath)(["dist"], "index.js")
            : (0, findPath_1.findPath)(["public"], "app.css");
    } catch (e) {
        console.error(e);
        return _default;
    }
}
var server = http.createServer(function (req, res) {
    var w = function (data) {
        if (data === void 0) {
            data = "";
        }
        res.write(data);
        return res.end();
    };
    try {
        if (!req.url) {
            return w("");
        }
        var url_info = url.parse(req.url, true).query;
        var requestsLibrary =
            "type" in url_info && (url_info["type"] == "jQuery" || url_info["type"] == "Bootstrap");
        var fpath = getPath(url_info, requestsLibrary);
        return w(
            fs.existsSync(fpath)
                ? String(
                      fs
                          .readFileSync(fpath, "utf-8")
                          .replace(/@dynamiclink/g, (0, dynamicLinkGetter_1.getDynLink)()),
                  )
                : "",
        );
    } catch (e) {
        console.error(e);
        return w("");
    }
});
server.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port, "/"));
});
