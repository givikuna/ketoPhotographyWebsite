var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
var pages = [];
var loadedGalleryAndSessionPages = [];
var iterated = 0;
var previousPage = "";
function main(d, l, c) {
    if (d === void 0) {
        d = null;
    }
    if (l === void 0) {
        l = null;
    }
    if (c === void 0) {
        c = null;
    }
    return __awaiter(this, void 0, void 0, function () {
        var dynamiclink, language, contactemail, _1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dynamiclink = d ? d : "ketojibladze.com";
                    language = l ? getLang(l) : "en";
                    contactemail = c ? c : "givitsvariani@proton.me";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    previousPage = getPage();
                    changeLang(language);
                    updateNavbar();
                    return [
                        4 /*yield*/,
                        buildNavBar(dynamiclink)
                            .then(function () {
                                buildApp(dynamiclink);
                            })
                            .then(updateApp)
                            .then(function () {
                                makeFooter(dynamiclink);
                            })
                            .then(function () {
                                updateNavbar();
                                // keep this like this
                                // it'll throw an error if you pass it in as as a variable directly because parameters
                                // - me to future me
                            })
                            .then(updateApp)
                            .then(function () {
                                var navbars = ["navbar-div-phone", "homepage-navbar-div-phone"];
                                for (var i = 0; i < navbars.length; i++) {
                                    var _2 = buildHamburger(navbars[i], dynamiclink);
                                }
                            })
                            .then(function () {
                                if (inPhoneMode()) {
                                    hideDiv("navbar-div");
                                    hideDiv("homepagenavbar-container");
                                    if (getPage() === "home") {
                                        showDiv("homepage-navbar-div");
                                    } else {
                                        hideDiv("homepage-navbar-div");
                                    }
                                }
                            })
                            .then(function () {
                                addCategoriesAndSessionsAsPages(dynamiclink);
                            }),
                    ];
                case 2:
                    _1 = _a.sent();
                    console.log("all loaded properly");
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
// --------------------------------------------------------------------------------------- Build functions:
function addCategoriesAndSessionsAsPages(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var categories, sessions, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, fetchCategories(dynamiclink)];
                case 1:
                    categories = _a.sent();
                    return [4 /*yield*/, fetchSessions(dynamiclink)];
                case 2:
                    sessions = _a.sent();
                    try {
                        for (i = 0; i < categories.length; i++) {
                            $("#app").append(
                                $(/* HTML */ "<div></div>")
                                    .attr(
                                        "id",
                                        categories[i].NAME ? "album_".concat(categories[i].NAME) : "ERROR",
                                    )
                                    .addClass("albumPage")
                                    .hide(),
                            );
                            pages.push("album_".concat(categories[i].NAME));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        for (i = 0; i < sessions.length; i++) {
                            $("#app").append(
                                $(/* HTML */ "<div></div>")
                                    .attr(
                                        "id",
                                        sessions[i].UID ? "gallery_".concat(sessions[i].UID) : "ERROR",
                                    )
                                    .css("text-align", "center")
                                    .addClass("galleryPage")
                                    .hide(),
                            );
                            pages.push("gallery_".concat(sessions[i].UID));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function buildApp(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, data, _loop_1, i, i, e_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _default = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    return [
                        4 /*yield*/,
                        (function (_dynamiclink) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var _data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            return [4 /*yield*/, getPages(_dynamiclink)];
                                        case 1:
                                            _data = _a.sent();
                                            if (typeof _data === "string") {
                                                return [2 /*return*/, JSON.parse(_data)];
                                            }
                                            return [2 /*return*/, _data];
                                    }
                                });
                            });
                        })(dynamiclink),
                    ];
                case 2:
                    data = _a.sent();
                    _loop_1 = function (i) {
                        var pageDiv;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    pageDiv = $(/* HTML */ "<div></div>")
                                        .attr("id", data[i].page ? data[i].page : "ERROR")
                                        .addClass(
                                            data[i].page && data[i].page.startsWith("album_")
                                                ? "albumPage"
                                                : "webPage",
                                        );
                                    $("#app").append(pageDiv);
                                    pages.push(data[i].page);
                                    return [
                                        4 /*yield*/,
                                        buildComponent(
                                            (function (div_id) {
                                                if (div_id == undefined && typeof div_id !== "undefined") {
                                                    return "";
                                                }
                                                return pageDiv.attr("id");
                                            })(pageDiv.attr("id")),
                                            dynamiclink,
                                        ),
                                    ];
                                case 1:
                                    _b.sent();
                                    updateApp();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < data.length)) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1(i)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < data.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, buildPage(data[i].page, dynamiclink)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    return [2 /*return*/, true];
                case 11:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [2 /*return*/, _default];
                case 12:
                    return [2 /*return*/];
            }
        });
    });
}
function buildPage(page, dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, categories, i, element, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = page;
                    switch (_a) {
                        case "home":
                            return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1:
                    return [4 /*yield*/, fetchCategories(dynamiclink)];
                case 2:
                    categories = _b.sent();
                    // ${dynamiclink}:8092/?type=cover&album=${categories[i].NAME}
                    for (i = 0; i < categories.length; i++) {
                        element =
                            '\n                        <div class="imageContainer">\n                            <img\n                                src="'
                                .concat(
                                    (function (_dynamiclink, category) {
                                        var url = new URL("".concat(_dynamiclink, ":8092/"));
                                        url.searchParams.set("type", "cover");
                                        url.searchParams.set("album", category);
                                        return url.toString();
                                    })(dynamiclink, categories[i].NAME),
                                    '"\n                                onclick="window.location.href=\'#album_',
                                )
                                .concat(
                                    categories[i].NAME,
                                    '\'"\n                                class="albumCoverImage"\n                                alt="Image ',
                                )
                                .concat(i, '"\n                                id="')
                                .concat(
                                    categories[i].NAME,
                                    'AlbumCoverForHome"\n                            />\n\n                            <span id="',
                                )
                                .concat(
                                    categories[i].NAME,
                                    'AlbumCoverForHomeSpan">\n                                ',
                                )
                                .concat(
                                    categories[i].NAME,
                                    "\n                            </span>\n                        </div>\n                    ",
                                );
                        $("#album-gallery").append(element);
                    }
                    return [3 /*break*/, 3];
                case 3:
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    console.error(e_3);
                    return [3 /*break*/, 5];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function buildNavBar(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var navbar_div, homepage_navbar_div, _a, _b, _c, _d, e_4;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    navbar_div = document.getElementById("navbar-div");
                    homepage_navbar_div = document.getElementById("homepage-navbar-div");
                    if (navbar_div == null || homepage_navbar_div == null) {
                        return [2 /*return*/];
                    }
                    _a = navbar_div;
                    _b = _a.innerHTML;
                    return [4 /*yield*/, fetchComponent("navbar", dynamiclink)];
                case 1:
                    _a.innerHTML = _b + _e.sent();
                    _c = homepage_navbar_div;
                    _d = _c.innerHTML;
                    return [4 /*yield*/, fetchComponent("homepagenavbar", dynamiclink)];
                case 2:
                    _c.innerHTML = _d + _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _e.sent();
                    console.error(e_4);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
function updateNavbar(callingFromWindowSizeCheck) {
    if (callingFromWindowSizeCheck === void 0) {
        callingFromWindowSizeCheck = false;
    }
    try {
        if (callingFromWindowSizeCheck === false && windowSizeCheck() === true) {
            return;
        }
        if (getPage() === "home") {
            hideDiv("navbar-div");
            showDiv("homepage-navbar-div");
        } else {
            hideDiv("homepage-navbar-div");
            showDiv("navbar-div");
        }
    } catch (e) {
        console.error(e);
    }
}
function buildHamburger(div, dynamiclink) {
    try {
        $("#".concat(div)).append(
            /* HTML */ '\n            <div\n                class="hamburger-button"\n                onclick="hamburgerClick(\''
                .concat(div, '\')"\n                id="inside-')
                .concat(
                    div,
                    '"\n            >\n                &#9776;\n            </div>\n            <!-- Hamburger Navbar -->\n            <div\n                class="hamburger-navbar"\n                id="hamburger-navbar-for-',
                )
                .concat(
                    div,
                    '"\n            >\n                <a\n                    href="#home"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-home"\n                >\n                    Home\n                </a>\n\n                <a\n                    href="#contact"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-contact"\n                >\n                    Contact\n                </a>\n\n                <a\n                    href="#about"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-about"\n                >\n                    About\n                </a>\n\n                <a\n                    href="#pricing"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-pricing"\n                >\n                    Pricing\n                </a>\n\n                <a\n                    href="#blog"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-blog"\n                >\n                    Blog\n                </a>\n\n                <a\n                    href="#albums"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-albums"\n                >\n                    Albums\n                </a>\n            </div>\n\n            <div\n                class="navbar-logo-container"\n                id="hamburger-navbar-logo-container-for-',
                )
                .concat(
                    div,
                    '"\n            >\n                <a href="#home">\n                    <img\n                        src="',
                )
                .concat(
                    dynamiclink,
                    ':8092/?type=logo"\n                        class="navbar-logo-phone"\n                    />\n                </a>\n            </div>\n        ',
                ),
        );
        $("#inside-hamburger-wrapper-for-".concat(div)).hide();
        if (div === "navbar-div-phone") {
            $("#".concat(div)).append(
                /* HTML */ "\n                <br />\n                <br />\n                <br />\n                <br />\n                <br />\n                <br />\n            ",
            );
        }
    } catch (e) {
        console.error(e);
    }
}
function makeFooter(dynamiclink) {
    try {
        $("#footer-div")
            .show()
            .append(
                /* HTML */ '\n                <footer>\n                    <a href="https://www.facebook.com">\n                        <img\n                            src="'
                    .concat(
                        dynamiclink,
                        ':8092/?type=icons&img=facebook"\n                            alt="Facebook"\n                            class="SocialMediaIcon"\n                        />\n                    </a>\n                    <a href="https://www.flickr.com">\n                        <img\n                            src="',
                    )
                    .concat(
                        dynamiclink,
                        ':8092/?type=icons&img=flickr"\n                            alt="Flickr"\n                            class="SocialMediaIcon"\n                        />\n                    </a>\n                    <a href="https://www.instagram.com">\n                        <img\n                            src="',
                    )
                    .concat(
                        dynamiclink,
                        ':8092/?type=icons&img=instagram"\n                            alt="Instagram"\n                            class="SocialMediaIcon"\n                        />\n                    </a>\n                    <a href="https://www.pinterest.com">\n                        <img\n                            src="',
                    )
                    .concat(
                        dynamiclink,
                        ':8092/?type=icons&img=pinterest"\n                            alt="Pinterest"\n                            class="SocialMediaIcon"\n                        />\n                    </a>\n                    <a href="https://www.youtube.com">\n                        <img\n                            src="',
                    )
                    .concat(
                        dynamiclink,
                        ':8092/?type=icons&img=youtube"\n                            alt="YouTube"\n                            class="SocialMediaIcon"\n                        />\n                    </a>\n\n                    <br />\n                    <br />\n\n                    <div>\n                        <p>\n                            <a\n                                href="#contact"\n                                class="contact-link"\n                            >\n                                Contact Me\n                            </a>\n                        </p>\n                        <p>\n                            <a\n                                href="#home"\n                                class="contact-link"\n                            >\n                                Home\n                            </a>\n                        </p>\n                    </div>\n                </footer>\n\n                <br />\n                <br />\n            ',
                    ),
            );
    } catch (e) {
        console.error(e);
    }
}
function buildComponent(component, dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, componentDiv, _a, _b, e_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _default = null;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = $("#" + (component ? component : "ERROR"))).html;
                    return [4 /*yield*/, fetchComponent(component, dynamiclink)];
                case 2:
                    componentDiv = _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, componentDiv];
                case 3:
                    e_5 = _c.sent();
                    console.error(e_5);
                    return [2 /*return*/, _default];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
// --------------------------------------------------------------------------------------- Event functions:
function hashchange() {
    updateApp();
    if (inPhoneMode()) {
        hideDiv("navbar-div");
        if (getPage() !== "home") {
            hideDiv("homepage-navbar-div");
            /*
                navbar-div-phone", "homepage-navbar-div-phone"
                hideDiv("hamburger-navbar-logo-container-for-homepage-navbar-div-phone");
                */
        } else {
            showDiv("homepage-navbar-div");
            // showDiv("hamburger-navbar-logo-container-for-homepage-navbar-div-phone");
            $("#app").css("margin-top", "100px");
        }
    } else {
        if (getPage() === "home") {
            showDiv("homepagenavbar-container");
        } else {
            showDiv("navbar-div");
        }
        $("#app").css("margin-top", "0px");
    }
    previousPage = getPage();
}
function nextHomepageImage() {
    return __awaiter(this, void 0, void 0, function () {
        var images, homepage_navbar_div, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getHomepageCoverImagesURLs("@dynamiclink")];
                case 1:
                    images = _a.sent().map(function (url) {
                        return url.toString();
                    });
                    homepage_navbar_div = document.querySelector("#homepage-navbar-div");
                    if (homepage_navbar_div == null) {
                        return [2 /*return*/];
                    }
                    if (iterated === images.length) {
                        iterated = 0;
                        homepage_navbar_div.style.backgroundImage = "url(".concat(images[iterated++], ")");
                    } else {
                        homepage_navbar_div.style.backgroundImage = "url(".concat(images[iterated++], ")");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    console.error(e_6);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function windowSizeCheck() {
    var _default = false;
    try {
        if (window.innerWidth <= 768) {
            changeNavbarForSmallDisplays();
            return true;
        }
        $("#homepage-navbar-div").css("height", "100%").css("margin-top", "0%");
        hideDiv("navbar-div-phone");
        hideDiv("homepage-navbar-div-phone");
        if (getPage() === "home") {
            showDiv("homepagenavbar-container");
            showDiv("homepage-navbar-div");
            showDiv("homepage-navbar-logo-container");
        } else {
            showDiv("navbar-div");
        }
        $("#app").css("margin-top", "0px");
        return false;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function toggleCurrentHamburgerNavbar(currentNavbarID) {
    try {
        var $navbarDiv = $("#".concat(currentNavbarID));
        var isHidden = $navbarDiv.is(":hidden");
        if (isHidden) {
            $navbarDiv.css("margin-top", "40px").slideDown("fast");
        } else {
            $navbarDiv.css("margin-top", "0").toggle();
        }
    } catch (e) {
        console.error(e);
    }
}
function changeNavbarForSmallDisplays() {
    try {
        $("#navbar-div").hide();
        if (getPage() === "home") {
            hideDiv("navbar-div-phone");
            showDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            showDiv("homepage-navbar-div");
            $("#homepage-navbar-div").css("height", "200px").css("margin-top", "100px");
        } else {
            showDiv("navbar-div-phone");
            hideDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            hideDiv("homepage-navbar-div");
            $("#app").css("margin-top", "100px");
        }
        hideDiv("homepage-navbar-logo-container");
    } catch (e) {
        console.error(e);
    }
}
function hamburgerClick(from) {
    try {
        var currentNavbarID = "hamburger-navbar-for-".concat(from);
        toggleCurrentHamburgerNavbar(currentNavbarID);
        if (!$("#".concat(currentNavbarID)).is(":hidden")) {
            $("#homepage-navbar-div").css("margin-top", "300px");
            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                $("#app").css("margin-top", "300px");
            }
        } else {
            $("#homepage-navbar-div").css("margin-top", "100px");
            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                $("#".concat(getPage())).css("margin-top", "100px");
            }
        }
        if (getPage() !== "home") {
            $("#app").css("margin-top", "100px");
        }
    } catch (e) {
        console.error(e);
    }
}
// --------------------------------------------------------------------------------------- Helper functions:
function inPhoneMode() {
    var _default = false;
    try {
        if (window.innerWidth <= 768) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function hideDiv(div) {
    var _default = $();
    try {
        return $("#".concat(div)).hide();
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function showDiv(div) {
    var _default = $();
    try {
        return $("#".concat(div)).show();
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function updateApp() {
    return __awaiter(this, void 0, void 0, function () {
        var currentPage, i, type_, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    updateNavbar(true);
                    currentPage = pages.length > 0 && pages.includes(getPage()) ? getPage() : "home";
                    for (i = 0; i < pages.length; i++) {
                        if (currentPage === pages[i]) {
                            showDiv(pages[i]);
                        } else {
                            hideDiv(pages[i]);
                        }
                    }
                    if (
                        !loadedGalleryAndSessionPages.includes(currentPage) &&
                        !currentPage.startsWith("album_") &&
                        !currentPage.startsWith("gallery_") &&
                        !currentPage.split("").includes("_")
                    ) {
                        return [2 /*return*/];
                    }
                    type_ = currentPage.split("_")[0];
                    if (!(type_ === "album")) return [3 /*break*/, 2];
                    return [4 /*yield*/, buildAlbum("@dynamiclink", currentPage.split("_")[1], currentPage)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    return [
                        4 /*yield*/,
                        buildGallery("@dynamiclink", currentPage.split("_")[1], currentPage),
                    ];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    loadedGalleryAndSessionPages.push(currentPage);
                    return [3 /*break*/, 6];
                case 5:
                    e_7 = _a.sent();
                    console.error(e_7);
                    return [3 /*break*/, 6];
                case 6:
                    return [2 /*return*/];
            }
        });
    });
}
function buildAlbum(dynamiclink, album, currentPage) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, e_8;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = $("#".concat(currentPage))).html;
                    return [4 /*yield*/, getCategorySessions(dynamiclink, album)];
                case 1:
                    _b.apply(_a, [
                        _c
                            .sent()
                            .map(function (session) {
                                return session.UID;
                            })
                            .map(function (uid, i) {
                                /* HTML */ return '\n                        <a href="#gallery_'
                                    .concat(
                                        uid,
                                        '">\n                            <img\n                                id="',
                                    )
                                    .concat(
                                        uid,
                                        '"\n                                class="albumImage"\n                                src="',
                                    )
                                    .concat(
                                        createURL("".concat(dynamiclink, ":8092/"), {
                                            type: "img",
                                            img: uid.toString(),
                                        }).toString(),
                                        '"\n                            />\n                        </a>\n                    ',
                                    );
                            })
                            .map(function (el, i) {
                                if ((i + 1) % 3 === 0) {
                                    return /* HTML */ "".concat(el, " <br />");
                                }
                                return el;
                            })
                            .join(""),
                    ]);
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _c.sent();
                    console.error(e_8);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function buildGallery(dynamiclink, gallery, currentPage) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, e_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = $("#".concat(currentPage))).html;
                    return [4 /*yield*/, getSessionImages(dynamiclink, gallery)];
                case 1:
                    _b.apply(_a, [
                        _c
                            .sent()
                            .map(function (still) {
                                return still.UID;
                            })
                            .map(function (uid, i) {
                                /* HTML */ return '\n                        <img\n                            id="'
                                    .concat(
                                        uid,
                                        '"\n                            class="albumImage"\n                            src="',
                                    )
                                    .concat(
                                        createURL("".concat(dynamiclink, ":8092/"), {
                                            type: "img",
                                            img: uid.toString(),
                                        }).toString(),
                                        '"\n                        />\n                    ',
                                    );
                            })
                            .join(""),
                    ]);
                    return [3 /*break*/, 3];
                case 2:
                    e_9 = _c.sent();
                    console.error(e_9);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function createURL(link, params) {
    var _default = "";
    try {
        var url = new URL("".concat(link));
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                url.searchParams.set(key, params[key]);
            }
        }
        return url;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function getLang(lang) {
    var _default = "en";
    try {
        return lang === "ru" ? lang : lang === "ge" ? lang : "en";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
function changeLang(lang) {
    var _default = false;
    try {
        return true;
    } catch (e) {
        console.error(e);
        return _default;
    }
}
// --------------------------------------------------------------------------------------- Data fetching functions:
function fetchComponent(component, dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _default = "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8095/"));
                    url.searchParams.set("c", component);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    e_10 = _a.sent();
                    console.error("Error:", e_10);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function fetchSessions(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, _a, _b, _c, _d, e_11;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _default = [
                        {
                            UID: 1,
                            CUSTOMER_UID: 1,
                            CATEGORY_UID: 4,
                            COVER_STILL_UID: 65,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 2,
                            CUSTOMER_UID: 2,
                            CATEGORY_UID: 3,
                            COVER_STILL_UID: 11,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 3,
                            CUSTOMER_UID: 2,
                            CATEGORY_UID: 1,
                            COVER_STILL_UID: 1,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 4,
                            CUSTOMER_UID: 3,
                            CATEGORY_UID: 6,
                            COVER_STILL_UID: 58,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 5,
                            CUSTOMER_UID: 1,
                            CATEGORY_UID: 2,
                            COVER_STILL_UID: 2,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 6,
                            CUSTOMER_UID: 2,
                            CATEGORY_UID: 3,
                            COVER_STILL_UID: 16,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 7,
                            CUSTOMER_UID: 2,
                            CATEGORY_UID: 5,
                            COVER_STILL_UID: 22,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 8,
                            CUSTOMER_UID: 3,
                            CATEGORY_UID: 3,
                            COVER_STILL_UID: 53,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 9,
                            CUSTOMER_UID: 3,
                            CATEGORY_UID: 3,
                            COVER_STILL_UID: 50,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 10,
                            CUSTOMER_UID: 1,
                            CATEGORY_UID: 6,
                            COVER_STILL_UID: 77,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 11,
                            CUSTOMER_UID: 2,
                            CATEGORY_UID: 4,
                            COVER_STILL_UID: 89,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                        {
                            UID: 12,
                            CUSTOMER_UID: 3,
                            CATEGORY_UID: 1,
                            COVER_STILL_UID: 7,
                            DESCRIPTION: "",
                            SESSION_DATE: "some_date",
                        },
                    ];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "sessions");
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    if (typeof data === "string") {
                        return [2 /*return*/, JSON.parse(data)];
                    }
                    return [2 /*return*/, data];
                case 4:
                    e_11 = _e.sent();
                    console.error("An error occurred while fetching dynamic categories/albums data:", e_11);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function fetchCategories(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, _a, _b, _c, _d, e_12;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _default = [
                        {
                            UID: 1,
                            NAME: "newborns",
                            COVER_STILL_UID: 48,
                            DESCRIPTION: "",
                        },
                        {
                            UID: 2,
                            NAME: "families",
                            COVER_STILL_UID: 2,
                            DESCRIPTION: "",
                        },
                        {
                            UID: 3,
                            NAME: "advertisements",
                            COVER_STILL_UID: 83,
                            DESCRIPTION: "",
                        },
                        {
                            UID: 4,
                            NAME: "portraits",
                            COVER_STILL_UID: 76,
                            DESCRIPTION: "",
                        },
                        {
                            UID: 5,
                            NAME: "weddings",
                            COVER_STILL_UID: 22,
                            DESCRIPTION: "",
                        },
                        {
                            UID: 6,
                            NAME: "business",
                            COVER_STILL_UID: 82,
                            DESCRIPTION: "",
                        },
                    ];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "categories");
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    if (typeof data === "string") {
                        return [2 /*return*/, JSON.parse(data)];
                    }
                    return [2 /*return*/, data];
                case 4:
                    e_12 = _e.sent();
                    console.error("An error occurred while fetching dynamic categories/albums data:", e_12);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function getHomepageCoverStills(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, _a, _b, _c, _d, e_13;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _default = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "frontPageCoverImageData");
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    return [2 /*return*/, data];
                case 4:
                    e_13 = _e.sent();
                    console.error(
                        "An error occurred while trying to fetch dynamic front page cover images data:",
                        e_13,
                    );
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function getHomepageCoverImagesURLs(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, _a, e_14;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _default = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = function (arr) {
                        return arr.length < 2
                            ? arr
                            : __spreadArray(
                                  __spreadArray([arr[arr.length - 1]], arr.slice(1, arr.length - 1), true),
                                  [arr[0]],
                                  false,
                              );
                    };
                    return [4 /*yield*/, getHomepageCoverStills(dynamiclink)];
                case 2:
                    return [
                        2 /*return*/,
                        _a.apply(void 0, [
                            _b.sent().map(function (_, i) {
                                var url = new URL("".concat(dynamiclink, ":8092/"));
                                url.searchParams.set("type", "frontPageCoverImage");
                                url.searchParams.set("img", "".concat(i));
                                return url;
                            }),
                        ]),
                    ];
                case 3:
                    e_14 = _b.sent();
                    console.error(e_14);
                    return [2 /*return*/, _default];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
function getSessionImages(dynamiclink, session) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, _a, _b, _c, _d, e_15;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _default = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "sessionImages");
                    url.searchParams.set("session", session);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    if (typeof data === "string") {
                        return [2 /*return*/, JSON.parse(data)];
                    }
                    return [2 /*return*/, data];
                case 4:
                    e_15 = _e.sent();
                    console.error(e_15);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function getCategorySessions(dynamiclink, category) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, _a, _b, _c, _d, e_16;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _default = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    console.log(dynamiclink);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "categorySessions");
                    url.searchParams.set("category", category);
                    console.log(url.toString());
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    _b = (_a = JSON).parse;
                    _d = (_c = JSON).stringify;
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                    if (typeof data === "string") {
                        return [2 /*return*/, JSON.parse(data)];
                    }
                    return [2 /*return*/, data];
                case 4:
                    e_16 = _e.sent();
                    console.error(e_16);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function getPages(dynamiclink) {
    return __awaiter(this, void 0, void 0, function () {
        var _default, url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _default = [
                        {
                            type: "page",
                            page: "home",
                            display: "Home",
                            subpages: [],
                            components: [],
                        },
                        {
                            type: "page",
                            page: "contact",
                            display: "Contact",
                            subpages: [],
                            components: [],
                        },
                        {
                            type: "page",
                            page: "pricing",
                            display: "Pricing",
                            subpages: [],
                            components: [],
                        },
                        {
                            type: "page",
                            page: "about",
                            display: "About",
                            subpages: [],
                            components: [],
                        },
                        {
                            type: "page",
                            page: "blog",
                            display: "Blog",
                            subpages: [],
                            components: [],
                        },
                        {
                            type: "page",
                            page: "albums",
                            display: "Albums",
                            subpages: [],
                            components: [],
                        },
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = new URL("".concat(dynamiclink, ":8094/"));
                    url.searchParams.set("data", "pages");
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.error("An error occurred while fetching dynamic page information data:", error_1);
                    return [2 /*return*/, _default];
                case 5:
                    return [2 /*return*/];
            }
        });
    });
}
function getPage() {
    var _default = "home";
    try {
        var page = window.location.hash.slice(1);
        return page != "" &&
            page != null &&
            typeof page != "undefined" &&
            page != undefined &&
            pages.includes(page)
            ? page
            : "home";
    } catch (e) {
        console.error(e);
        return _default;
    }
}
// --------------------------------------------------------------------------------------- Events:
window.addEventListener("hashchange", hashchange);
setInterval(function () {
    if (getPage() === "home") {
        nextHomepageImage();
    }
}, 10000);
window.addEventListener("resize", windowSizeCheck);
// --------------------------------------------------------------------------------------- ARCHIVE:
/*

function toggleCurrentHamburgerNavbar(currentNavbarID) {
    const $navbarDiv = $(`#${currentNavbarID}`);
    const isHidden = $navbarDiv.is(":hidden");

    if (isHidden) {
        $navbarDiv.css("margin-top", "40px");
        // Slide down the navbar with animation and set margin-top
        $navbarDiv.slideDown("fast", function () {
            //
        });
    } else {
        $navbarDiv.css("margin-top", "0");
        // Slide up the navbar with animation and reset margin-top
        $navbarDiv.slideUp("fast", function () {});
    }
}

*/
