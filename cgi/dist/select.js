"use strict";
exports.__esModule = true;
var express = require("express");
var url = require("url");
var fs = require("fs");
var lsse_1 = require("lsse");
var portServer_1 = require("./modules/portServer");
var findPath_1 = require("./modules/findPath");
var app = express();
var filename = "select";
var port = portServer_1.getPort(filename); // 8094
function getSpecificData(givenData, url_info) {
    var _default = "";
    try {
        var write = "";
        if (givenData === "categorySessions" &&
            "category" in url_info &&
            (typeof url_info["category"] === "string" || typeof url_info["category"] === "number")) {
            var category_UID_1 = (function (categoryData) {
                var categoryDataType = typeof categoryData;
                var categories = JSON.parse(getDataToReturn("categories", {}));
                if (categoryDataType === "string") {
                    for (var i = 0; i < lsse_1.len(categoryData); i++) {
                        if (categoryData === categories[i].NAME) {
                            return categories[i].UID;
                        }
                    }
                }
                if (categoryDataType === "number") {
                    return categoryData;
                }
                return 0;
            })(url_info["category"]);
            return JSON.stringify(JSON.parse(getDataToReturn("sessions", {})).filter(function (session) { return session.CATEGORY_UID === category_UID_1; }));
        }
        if (givenData === "sessionImages" &&
            "session" in url_info &&
            typeof url_info["session"] === "number") {
            var session_UID_1 = (function (session_uid) {
                var sessions = JSON.parse(getDataToReturn("sessions", {}));
                for (var i = 0; i < sessions.length; i++) {
                    if (session_uid === sessions[i].UID) {
                        return session_uid;
                    }
                }
                return 0;
            })(url_info["session"]);
            return JSON.stringify(JSON.parse(getDataToReturn("stills", {})).filter(function (still) { return still.SESSION_UID === session_UID_1; }));
        }
        return write;
    }
    catch (e) {
        lsse_1.print(e);
        return _default;
    }
}
function getDataToReturn(givenData, url_info) {
    var _default = "";
    try {
        if (givenData in ["categorySessions", "sessionImages"]) {
            return getSpecificData(givenData, url_info);
        }
        var write = "";
        var pathArray = [];
        var dataFile = "";
        switch (lsse_1.lower(givenData)) {
            case "languages":
            case "pages":
                break;
            case "welcome":
                pathArray = ["public", "assets", "" + url_info["data"]];
                dataFile = "info.json";
                break;
            case "albumData":
                pathArray = ["img"];
                dataFile = "info.json";
                break;
            case "categories":
                pathArray = ["img"];
                dataFile = "categories.json";
                break;
            case "sessions":
                pathArray = ["img"];
                dataFile = "sessions.json";
                break;
            case "stills":
                pathArray = ["img"];
                dataFile = "stills.json";
                break;
            default:
                write = "";
                throw new Error("unknown request");
        }
        write = String(fs.readFileSync(findPath_1.findPath(pathArray, dataFile), {
            encoding: "utf8",
            flag: "r"
        }));
        return write;
    }
    catch (e) {
        lsse_1.print(e);
        return _default;
    }
}
app.get("/", function (req, res) {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
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
        if (!("data" in url_info) || typeof url_info["data"] !== "string") {
            return w("");
        }
        return w(getDataToReturn(url_info["data"], url_info));
    }
    catch (e) {
        lsse_1.print(e);
        return w("");
    }
});
app.listen(port, function () {
    lsse_1.print("Server is running on http://localhost:" + port + "/");
});
