"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var url = require("url");
var fs = require("fs");
var portServer_1 = require("./modules/portServer");
var findPath_1 = require("./modules/findPath");
var getImageData_1 = require("./modules/getImageData");
var extension_1 = require("./extensions/extension");
var app = express();
var filename = "select";
var port = (0, portServer_1.getPort)(filename); // 8094
function getSpecificData(givenData, url_info) {
    var _default = "[]";
    try {
        var write = "";
        if (
            givenData === "categorySessions" &&
            "category" in url_info &&
            (typeof url_info["category"] === "string" || typeof url_info["category"] === "number")
        ) {
            var category_UID_1 = (function (categoryData) {
                var categories = (0, getImageData_1.getCategories)();
                if (typeof categoryData === "string") {
                    var assumedCategory = categories.find(function (category) {
                        return category.NAME.toString() == categoryData.toString();
                    });
                    if (
                        assumedCategory &&
                        [null, undefined, "", [], {}].includes(assumedCategory) &&
                        typeof assumedCategory !== "undefined" &&
                        "UID" in assumedCategory
                    ) {
                        return assumedCategory.UID;
                    }
                }
                if (typeof categoryData === "number") {
                    return Math.floor(categoryData);
                }
                return 0;
            })(url_info["category"]);
            return JSON.stringify(
                (0, getImageData_1.getSessions)().filter(function (session) {
                    return String(session.CATEGORY_UID) == String(category_UID_1);
                }),
                null,
                4,
            );
        }
        if (
            givenData === "categoryImages" &&
            "category" in url_info &&
            ["number", "string"].includes(typeof url_info["category"])
        ) {
            var categories = (0, getImageData_1.getCategories)();
            var category_UID_2 = (function (category_data, _categories) {
                var _a;
                if (typeof category_data !== "string" && typeof category_data !== "number") {
                    return 0;
                }
                if (
                    typeof category_data === "number" &&
                    category_data <= (0, getImageData_1.getCategories)().length
                ) {
                    return category_data;
                }
                if (
                    typeof category_data === "string" &&
                    /^[-+]?\d+(\.\d+)?$/.test(category_data) && // checks if the string is numeric
                    _categories
                        .map(function (category) {
                            return category.UID;
                        })
                        .includes(parseInt(category_data))
                ) {
                    return parseInt(category_data);
                }
                if (
                    typeof category_data === "string" &&
                    !/^[-+]?\d+(\.\d+)?$/.test(category_data) && // checks if the string is NOT numeric
                    _categories
                        .map(function (category) {
                            return category.NAME;
                        })
                        .includes(category_data)
                ) {
                    return (_a = _categories.find(function (category) {
                        return category.NAME === category_data;
                    })) === null || _a === void 0
                        ? void 0
                        : _a.UID;
                }
                return 0;
            })(url_info["category"], categories);
            if (
                [0, 1].includes(category_UID_2) ||
                categories.filter(function (category) {
                    return category.UID === category_UID_2;
                }).length < 1
            ) {
                throw new Error("category was unable to be found");
            }
            var sessionUIDs_1 = (0, getImageData_1.getSessions)()
                .filter(function (session) {
                    return session.CATEGORY_UID === category_UID_2;
                })
                .map(function (session) {
                    return session.UID;
                });
            return JSON.stringify(
                (0, getImageData_1.getStills)().filter(function (still) {
                    return sessionUIDs_1.includes(still.SESSION_UID);
                }),
                null,
                4,
            );
        }
        if (
            givenData === "sessionImages" &&
            "session" in url_info &&
            ["number", "string"].includes(typeof url_info["session"])
        ) {
            var session_UID_1 = (function (session_uid) {
                var sessionMatch = (0, getImageData_1.getSessions)().find(function (session) {
                    return session.UID == parseInt(String(session_uid));
                });
                return typeof sessionMatch &&
                    sessionMatch !== undefined &&
                    sessionMatch !== null &&
                    "UID" in sessionMatch
                    ? sessionMatch.UID
                    : 0;
            })(url_info["session"]);
            return JSON.stringify(
                (0, getImageData_1.getStills)().filter(function (still) {
                    return String(still.SESSION_UID) == String(session_UID_1);
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
        if (
            ["categorySessions", "sessionImages", "frontPageCoverImageData", "categoryImages"].includes(
                givenData,
            )
        ) {
            return getSpecificData(givenData, url_info);
        }
        var write = "";
        var pathArray = [];
        var dataFile = "";
        switch (givenData.toLocaleLowerCase()) {
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
        if ((0, extension_1.isJSON)(dataAsString)) {
            write = JSON.stringify(dataAsString, null, 4);
        } else {
            write = JSON.stringify(dataAsString);
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
