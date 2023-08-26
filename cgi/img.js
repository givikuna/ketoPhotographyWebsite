"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var url = require("url");
var fs = require("fs");
var lsse = require("lsse");
var findPath_1 = require("./modules/findPath");
var portServer_1 = require("./modules/portServer");
var getImageData_1 = require("./modules/getImageData");
var app = express();
var filename = "img";
var port = (0, portServer_1.getPort)(filename); // 8092
function getIcons() {
    var _default = [
        {
            icon: "facebook",
            file: "facebook.png",
            extension: "png",
        },
        {
            icon: "flickr",
            file: "flickr.png",
            extension: "png",
        },
        {
            icon: "instagram",
            file: "instagram.png",
            extension: "png",
        },
        {
            icon: "pinterest",
            file: "pinterest.png",
            extension: "png",
        },
        {
            icon: "youtube",
            file: "youtube.png",
            extension: "png",
        },
    ];
    try {
        return require("../public/assets/icons/icons.json");
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getIconExtension(icon) {
    var _default = "png";
    try {
        var icons = getIcons();
        if (!Array.isArray(icons)) {
            throw new Error("Icons couldn't be fetched");
        }
        for (var i = 0; i < icons.length; i++) {
            if (icons[i].icon === icon) {
                return "".concat(icons[i].extension);
            }
        }
        return _default;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getAlbumCoverImage(url_info) {
    var _default = "";
    try {
        if (!("album" in url_info) || typeof url_info["album"] !== "string") {
            throw new Error("wrong data given to album cover image getter function");
        }
        return (0, getImageData_1.getStills)().filter(function (still) {
            return lsse.equals(
                lsse.int(still.UID),
                lsse.int(
                    (0, getImageData_1.getCategories)().map(function (category) {
                        return category.COVER_STILL_UID;
                    })[
                        (0, getImageData_1.getCategories)().findIndex(function (category) {
                            return lsse.equals(category.NAME, String(url_info["album"]));
                        })
                    ],
                ),
            );
        })[0].NAME;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function wantsIcon(url_info) {
    var _default = false;
    try {
        var type_ = "type" in url_info ? url_info["type"] : "";
        return type_ === "icons" && "img" in url_info;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function wantsAlbumCover(url_info) {
    var _default = false;
    try {
        var type_ = "type" in url_info ? url_info["type"] : "";
        return type_ === "cover" && "album" in url_info && typeof url_info["album"] === "string";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function wantsAlbumImage(url_info) {
    var _default = false;
    try {
        var type_ = "type" in url_info ? url_info["type"] : "";
        return type_ === "album" && "img" in url_info && typeof url_info["img"] === "string";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function wantsFrontPageCoverImage(url_info) {
    var _default = false;
    try {
        var type_ = "type" in url_info ? url_info["type"] : "";
        return (
            type_ === "frontPageCoverImage" && "img" in url_info && lsse.isNumeric(String(url_info["img"]))
        );
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function wantsLogo(url_info) {
    var _default = false;
    try {
        return "type" in url_info && typeof url_info["type"] === "string" && url_info["type"] === "logo";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getFrontPageCoverImagePath(url_info) {
    if (!wantsFrontPageCoverImage(url_info)) {
        return "./";
    }
    return (0, findPath_1.findPath)(
        ["img", "img"],
        lsse.str(
            (0, getImageData_1.getStills)().filter(function (still) {
                return still.IS_FRONT_COVER_IMAGE;
            })["img" in url_info && lsse.isNumeric(url_info["img"]) ? lsse.int(url_info["img"]) : 0].NAME,
        ),
    );
}
function getImage(img_UID) {
    var _default = "error.png";
    try {
        return (0, getImageData_1.getStills)().filter(function (still) {
            return lsse.equals(lsse.str(still.UID), lsse.str(img_UID));
        })[0].NAME;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getPath(url_info) {
    var _default = undefined;
    try {
        var type_ = "type" in url_info && typeof url_info["type"] === "string" ? url_info["type"] : "";
        if (wantsIcon(url_info)) {
            return (0, findPath_1.findPath)(
                ["public", "assets", type_],
                "".concat(lsse.str(url_info["img"]), ".").concat(getIconExtension(url_info["img"])),
            );
        }
        if (wantsFrontPageCoverImage(url_info)) {
            return getFrontPageCoverImagePath(url_info);
        }
        if (wantsAlbumImage(url_info)) {
            return (0, findPath_1.findPath)(["img", "img"], getImage(lsse.int(lsse.str(url_info["img"])))); // findPath(["img"]);
        }
        if (wantsAlbumCover(url_info)) {
            return (0, findPath_1.findPath)(["img", "img"], getAlbumCoverImage(url_info));
        }
        if (wantsLogo(url_info)) {
            return (0, findPath_1.findPath)(["public", "assets", "logo"], "logo.png");
        }
        return _default;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
/*
    subProcess.exec("npm run collect-images", (err: subProcess.ExecException | null, _output: string): void => {
        if (err) console.log(`Image collection failed:\n${err}`);
        console.log("Images were collected");
    });
*/
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
        if (
            !("img" in url_info) &&
            typeof url_info["img"] !== "string" &&
            !("type" in url_info) &&
            typeof url_info["type"] == "string"
        ) {
            throw new Error("Invalid request");
        }
        var fpath = getPath(url_info);
        return fpath !== undefined && fpath !== null && fs.existsSync(fpath)
            ? w(fs.readFileSync(fpath))
            : w("");
    } catch (e) {
        console.error(e);
        return w("");
    }
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port, "/"));
});
