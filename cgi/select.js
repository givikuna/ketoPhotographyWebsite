"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var url = require("url");
var fs = require("fs");
var lsse = require("lsse");
var portServer_1 = require("./modules/portServer");
var findPath_1 = require("./modules/findPath");
var getImageData_1 = require("./modules/getImageData");
var app = express();
var filename = "select";
var port = (0, portServer_1.getPort)(filename); // 8094
function getSpecificData(givenData, url_info) {
    var _default = "";
    try {
        var write = "";
        if (
            givenData === "categorySessions" &&
            "category" in url_info &&
            (typeof url_info["category"] === "string" || typeof url_info["category"] === "number")
        ) {
            var category_UID_1 = (function (categoryData) {
                var categoryDataType = typeof categoryData;
                var categories = (0, getImageData_1.getCategories)();
                if (categoryDataType === "string") {
                    var assumedCategory = categories.find(function (category) {
                        return lsse.equals(category.NAME, categoryData);
                    });
                    if (
                        assumedCategory &&
                        !lsse.equalsAny(assumedCategory, [null, undefined, "", [], {}]) &&
                        typeof assumedCategory !== "undefined" &&
                        "UID" in assumedCategory
                    ) {
                        return assumedCategory.UID;
                    }
                }
                if (categoryDataType === "number") {
                    return lsse.int(categoryData);
                }
                return 0;
            })(url_info["category"]);
            return JSON.stringify(
                (0, getImageData_1.getSessions)().filter(function (session) {
                    return lsse.equals(lsse.str(session.CATEGORY_UID), lsse.str(category_UID_1));
                }),
                null,
                4,
            );
        }
        if (
            givenData === "sessionImages" &&
            "session" in url_info &&
            (typeof url_info["session"] === "number" || typeof url_info["session"] === "string")
        ) {
            var session_UID_1 = (function (session_uid) {
                var sessionMatch = (0, getImageData_1.getSessions)().find(function (session) {
                    return lsse.equals(lsse.str(session.UID), lsse.str(session_uid));
                });
                return typeof sessionMatch &&
                    sessionMatch !== undefined &&
                    sessionMatch !== null &&
                    "UID" in sessionMatch
                    ? lsse.int(sessionMatch.UID)
                    : 0;
            })(url_info["session"]);
            return JSON.stringify(
                (0, getImageData_1.getStills)().filter(function (still) {
                    return lsse.equals(lsse.str(still.SESSION_UID), lsse.str(session_UID_1));
                }),
                null,
                4,
            );
        }
        if (givenData === "frontPageCoverImageData") {
            return JSON.stringify(
                (0, getImageData_1.getStills)().filter(function (still) {
                    return still.IS_FRONT_COVER_IMAGE;
                }),
                null,
                4,
            );
        }
        return write;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getDataToReturn(givenData, url_info) {
    if (url_info === void 0) {
        url_info = {};
    }
    var _default = "[]";
    try {
        if (["categorySessions", "sessionImages", "frontPageCoverImageData"].includes(givenData)) {
            return getSpecificData(givenData, url_info);
        }
        var write = "";
        var pathArray = [];
        var dataFile = "";
        switch (lsse.lower(givenData)) {
            case "languages":
                throw new Error("languages can't be requested just yet");
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
            case "pages":
                pathArray = ["public", "data"];
                dataFile = "pages.json";
                break;
            default:
                write = "";
                throw new Error("unknown request");
        }
        var dataAsString = fs.readFileSync((0, findPath_1.findPath)(pathArray, dataFile), {
            encoding: "utf8",
            flag: "r",
        });
        if (lsse.isJSON(dataAsString)) {
            write = JSON.stringify(dataAsString, null, 4);
        } else {
            write = lsse.str(dataAsString);
        }
        return write;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
app.get("/", function (req, res) {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
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
        if (!("data" in url_info) || typeof url_info["data"] !== "string") {
            return w("");
        }
        return w(getDataToReturn(url_info["data"], url_info));
    } catch (e) {
        console.error(e);
        return w("");
    }
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port, "/"));
});
