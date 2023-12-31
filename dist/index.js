(() => {
    "use strict";
    var n = {
            313: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.getHomepageCoverStills =
                        a.getHomepageCoverImagesURLs =
                        a.getCategoryStills =
                        a.fetchCategories =
                            void 0);
                const r = e(64),
                    o = "./api.ts";
                async function t(n) {
                    const a = [];
                    try {
                        const a = new URL(`${n}:8094/`);
                        a.searchParams.set("data", "frontPageCoverImageData");
                        const e = await fetch(a);
                        if (!e.ok) throw new Error(`Error: ${e.status} ${e.statusText}`);
                        return JSON.parse(JSON.stringify(await e.json()));
                    } catch (n) {
                        return (
                            console.error(
                                `Error at getHomepageCoverStills(dynamiclink: string): Promise<Readonly<Readonly<STILL>[]>> in ${o}`,
                                n,
                            ),
                            a
                        );
                    }
                }
                (a.fetchCategories = async function (n) {
                    const a = [];
                    try {
                        const a = new URL(`${n}:8094/`);
                        a.searchParams.set("data", "categories");
                        const e = await fetch(a);
                        if (!e.ok) throw new Error(`Error: ${e.status} ${e.statusText}`);
                        const r = JSON.parse(JSON.stringify(await e.json()));
                        return "string" == typeof r ? JSON.parse(r) : r;
                    } catch (n) {
                        return (
                            console.error(
                                `Error at fetchCategories(dynamiclink: string): Promise<Readonly<Readonly<CATEGORY>[]>> in ${o}`,
                                n,
                            ),
                            a
                        );
                    }
                }),
                    (a.getCategoryStills = async function (n, a) {
                        const e = [];
                        try {
                            const e = new URL(`${n}:8094/`);
                            e.searchParams.set("data", "categoryImages"),
                                e.searchParams.set("category", String(a));
                            const r = await fetch(e);
                            if (!r.ok) throw new Error(`Error: ${r.status} ${r.statusText}`);
                            const o = JSON.parse(JSON.stringify(await r.json()));
                            return "string" == typeof o ? JSON.parse(o) : o;
                        } catch (n) {
                            return (
                                console.error(
                                    `Error at getCategoryStills(dynamiclink: string, category: string | number): Promise<Readonly<Readonly<STILL>[]>> in ${o}`,
                                    n,
                                ),
                                e
                            );
                        }
                    }),
                    (a.getHomepageCoverImagesURLs = async function (n) {
                        const a = [];
                        try {
                            return (e = (await t(n)).map((a, e) =>
                                (0, r.createURL)(`${n}:8092/`, {
                                    type: "frontPageCoverImage",
                                    img: e.toString(),
                                }),
                            )).length < 2
                                ? e
                                : [e[e.length - 1], ...e.slice(1, e.length - 1), e[0]];
                        } catch (n) {
                            return (
                                console.error(
                                    `Error at getHomepageCoverImagesURLs(dynamiclink: string): Promise<ReadonlyArray<URL>> in ${o}`,
                                    n,
                                ),
                                a
                            );
                        }
                        var e;
                    }),
                    (a.getHomepageCoverStills = t);
            },
            185: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.hashchangeEvent =
                        a.nextHomepageImage =
                        a.getPage =
                        a.windowSizeCheck =
                        a.main =
                        a.loadedCategories =
                            void 0);
                const r = e(446),
                    o = e(848),
                    t = e(987),
                    i = e(277),
                    s = e(111),
                    l = e(430),
                    c = e(802),
                    m = e(254),
                    b = e(619),
                    d = e(600),
                    h = e(294),
                    g = e(941);
                e(829);
                const p = e(313),
                    u = "./app.ts";
                let v = 0;
                const f = [
                    { pageName: "home", get: i.html, onload: i.onload },
                    { pageName: "contact", get: l.html, onload: l.onload },
                    { pageName: "about", get: r.html, onload: r.onload },
                    { pageName: "pricing", get: s.html, onload: s.onload },
                    { pageName: "albums", get: o.html, onload: o.onload },
                    { pageName: "blog", get: t.html, onload: t.onload },
                ];
                function y() {
                    try {
                        const n = window.location.hash.slice(1);
                        return "" != n && null != n && void 0 !== n && null != n ? n : "home";
                    } catch (n) {
                        return console.error(`Error at getPage(): string in ${u}`, n), "home";
                    }
                }
                function w() {
                    try {
                        const n = (n) => {
                            [
                                "homepage-navbar-div-phone",
                                "navbar-div-phone",
                                "navbar-div",
                                "homepage-navbar-div",
                            ].forEach((n) => {
                                $(`#${n}`).hide();
                            }),
                                $(`#${n}`).show();
                        };
                        "phone" ===
                        (function () {
                            try {
                                return (n = window.innerWidth) >= 1200
                                    ? "desktop"
                                    : n >= 992
                                    ? "laptop"
                                    : n > 768
                                    ? "smaller_laptop"
                                    : "phone";
                            } catch (n) {
                                return (
                                    console.error(`Error at getCurrentMode(): string in ${u}`, n), "laptop"
                                );
                            }
                            var n;
                        })()
                            ? "home" === y()
                                ? (n("homepage-navbar-div-phone"), $("#app").css("margin-top", "100px"))
                                : n("navbar-div-phone")
                            : ("home" === y() ? n("homepage-navbar-div") : n("navbar-div"),
                              $("#app").css("margin-top", "0px"));
                    } catch (n) {
                        console.error(`Error in updateNavbar(): void in ${u}`, n);
                    }
                }
                (a.loadedCategories = []),
                    (a.main = async function (
                        n = "ketojibladze.com",
                        e = "en",
                        r = "givitsvariani@proton.me",
                    ) {
                        try {
                            w(),
                                $("#back-to-albums-div").hide(),
                                $("#homepage-navbar-div").html(d.html(n)),
                                $("#navbar-div").html(b.html(n)),
                                $("#navbar-div-phone").html(c.html(n)),
                                $("#homepage-navbar-div-phone").html(m.html(n)),
                                f.forEach(async (a) => {
                                    var o;
                                    $("#app").append(
                                        $("<div></div>")
                                            .attr("id", a.pageName ? a.pageName : "ERROR")
                                            .addClass(
                                                a.pageName && a.pageName.startsWith("album_")
                                                    ? "albumPage"
                                                    : "webPage",
                                            )
                                            .html(a.get().html)
                                            .hide(),
                                    ),
                                        await a.onload({
                                            dynamiclink: n,
                                            language:
                                                ((o = e),
                                                "eng" === o
                                                    ? o
                                                    : (function (n) {
                                                          try {
                                                              return "ru" === n || "ge" === n ? n : "en";
                                                          } catch (n) {
                                                              return (
                                                                  console.error(
                                                                      `Error at languagize(l: string): string in ${u}`,
                                                                      n,
                                                                  ),
                                                                  "en"
                                                              );
                                                          }
                                                      })(o)),
                                            contactEmail: r,
                                        });
                                }),
                                y().split("").includes("_") &&
                                    "album" === y().split("_")[0] &&
                                    (g.onload(n, y().split("_")[1]),
                                    a.loadedCategories.push(
                                        (await (0, p.fetchCategories)(n)).filter(
                                            (n) => n.NAME === y().split("_")[1],
                                        )[0],
                                    )),
                                $(`#${y()}`).show(),
                                $("#footer-div").show().html(h.html(n)),
                                y().split("").includes("_") &&
                                    ["album_", "gallery_"].includes(y().split("_")[0]) &&
                                    $("#back-to-albums-div").show();
                        } catch (n) {
                            console.error(
                                `Error at main(d: string | null, l: string | null, c: string | null): Promise<void> in ${u}`,
                                n,
                            );
                        }
                    }),
                    (a.getPage = y),
                    (a.windowSizeCheck = function () {
                        try {
                            return window.innerWidth <= 768
                                ? ((function () {
                                      try {
                                          $("#navbar-div").hide(),
                                              "home" === y()
                                                  ? ($("#navbar-div-phone").hide(),
                                                    $("#homepage-navbar-div-phone").show(),
                                                    $("#homepagenavbar-container").hide(),
                                                    $("homepage-navbar-div").show(),
                                                    $("#homepage-navbar-div")
                                                        .css("height", "200px")
                                                        .css("margin-top", "100px"))
                                                  : ($("#navbar-div-phone").show(),
                                                    $("#homepage-navbar-div-phone").hide(),
                                                    $("#homepagenavbar-container").hide(),
                                                    $("#homepage-navbar-div").hide(),
                                                    $("#app").css("margin-top", "100px")),
                                              $("#homepage-navbar-logo-container").hide();
                                      } catch (n) {
                                          console.error(
                                              `Error in changeNavbarForSmallDisplays(): void in ${u}`,
                                              n,
                                          );
                                      }
                                  })(),
                                  !0)
                                : ($("#homepage-navbar-div").css("height", "100%").css("margin-top", "0%"),
                                  $("#navbar-div-phone").hide(),
                                  $("#homepage-navbar-div-phone").hide(),
                                  "home" === y()
                                      ? ($("#homepagenavbar-container").show(),
                                        $("homepage-navbar-div").show(),
                                        $("homepage-navbar-logo-container").show())
                                      : $("navbar-div").show(),
                                  $("#app").css("margin-top", "0px"),
                                  !1);
                        } catch (n) {
                            return console.error(`Error at windowSizeCheck(): boolean in ${u}`, n), !1;
                        }
                    }),
                    (a.nextHomepageImage = async function () {
                        try {
                            const n = (await (0, p.getHomepageCoverImagesURLs)("@dynamiclink")).map((n) =>
                                    n.toString(),
                                ),
                                a = document.querySelector("#homepage-navbar-div");
                            if (null == a) return;
                            v === n.length
                                ? ((v = 0), (a.style.backgroundImage = `url(${n[v++]})`))
                                : (a.style.backgroundImage = `url(${n[v++]})`);
                        } catch (n) {
                            console.error("Error in nextHomepageImage(): void: ", n);
                        }
                    }),
                    (a.hashchangeEvent = async function () {
                        try {
                            (await (async function (n) {
                                try {
                                    return (
                                        "album" === y().split("_")[0] &&
                                        (await (0, p.fetchCategories)("@dynamiclink"))
                                            .map((n) => n.NAME)
                                            .includes(n)
                                    );
                                } catch (n) {
                                    return (
                                        console.error(`Error at needsToLoadNewAlbum(): boolean in ${u}`, n),
                                        !1
                                    );
                                }
                            })(y().split("_")[1])) &&
                                (g.onload("@dynamiclink", y().split("_")[1]),
                                a.loadedCategories.push(
                                    (await (0, p.fetchCategories)("@dynamiclink")).filter(
                                        (n) => n.NAME === y().split("_")[1],
                                    )[0],
                                ));
                            const n =
                                a.loadedCategories.length > 0
                                    ? [
                                          ...f.map((n) => n.pageName),
                                          ...a.loadedCategories.map((n) => `album_${n.NAME}`),
                                      ]
                                    : f.map((n) => n.pageName);
                            n.includes(y()) &&
                                n.forEach((n) => {
                                    $(`#${n}`).hide(), n === y() && $(`#${n}`).show();
                                }),
                                w();
                        } catch (n) {
                            console.error(`Error at hashchangeEvent(): void ${u}`, n);
                        }
                    }),
                    (e.g.hamburgerClick = function (n) {
                        try {
                            const a = `hamburger-navbar-for-${n}`;
                            !(function (n) {
                                try {
                                    const a = $(`#${n}`);
                                    a.is(":hidden")
                                        ? a.css("margin-top", "40px").slideDown("fast")
                                        : a.css("margin-top", "0").toggle();
                                } catch (n) {
                                    console.error(`Error at toggleCurrentHamburgerNavbar(): void in ${u}`, n);
                                }
                            })(a),
                                $(`#${a}`).is(":hidden")
                                    ? ($("#homepage-navbar-div").css("margin-top", "100px"),
                                      "hamburger-navbar-for-navbar-div-phone" === a &&
                                          $(`#${y()}`).css("margin-top", "100px"))
                                    : ($("#homepage-navbar-div").css("margin-top", "300px"),
                                      "hamburger-navbar-for-navbar-div-phone" === a &&
                                          $("#app").css("margin-top", "300px")),
                                "home" !== y() && $("#app").css("margin-top", "100px");
                        } catch (n) {
                            console.error(`Error at hamburgerClick(): void in ${u}`, n);
                        }
                    });
            },
            294: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.html = void 0),
                    (a.html = function (n) {
                        try {
                            return `\n            <footer>\n                <a href="https://www.facebook.com">\n                    <img\n                        src="${n}:8092/?type=icons&img=facebook"\n                        alt="Facebook"\n                        class="SocialMediaIcon"\n                    />\n                </a>\n                <a href="https://www.flickr.com">\n                    <img\n                        src="${n}:8092/?type=icons&img=flickr"\n                        alt="Flickr"\n                        class="SocialMediaIcon"\n                    />\n                </a>\n                <a href="https://www.instagram.com">\n                    <img\n                        src="${n}:8092/?type=icons&img=instagram"\n                        alt="Instagram"\n                        class="SocialMediaIcon"\n                    />\n                </a>\n                <a href="https://www.pinterest.com">\n                    <img\n                        src="${n}:8092/?type=icons&img=pinterest"\n                        alt="Pinterest"\n                        class="SocialMediaIcon"\n                    />\n                </a>\n                <a href="https://www.youtube.com">\n                    <img\n                        src="${n}:8092/?type=icons&img=youtube"\n                        alt="YouTube"\n                        class="SocialMediaIcon"\n                    />\n                </a>\n\n                <br />\n                <br />\n\n                <div>\n                    <p>\n                        <a\n                            href="#contact"\n                            class="contact-link"\n                        >\n                            Contact Me\n                        </a>\n                    </p>\n                    <p>\n                        <a\n                            href="#home"\n                            class="contact-link"\n                        >\n                            Home\n                        </a>\n                    </p>\n                </div>\n            </footer>\n\n            <br />\n            <br />\n        `;
                        } catch (n) {
                            return (
                                console.error(
                                    "Error at html(dynamiclink: string): string in ./components/footer.ts",
                                    n,
                                ),
                                ""
                            );
                        }
                    });
            },
            802: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.html = void 0),
                    (a.html = function (n) {
                        try {
                            return `\n            <div\n                class="hamburger-button"\n                onclick="hamburgerClick('navbar-div-phone')"\n                id="inside-navbar-div-phone"\n            >\n                &#9776;\n            </div>\n            \x3c!-- Hamburger Navbar --\x3e\n            <div\n                class="hamburger-navbar"\n                id="hamburger-navbar-for-navbar-div-phone"\n            >\n                <a\n                    href="#home"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-home"\n                >\n                    Home\n                </a>\n\n                <a\n                    href="#contact"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-contact"\n                >\n                    Contact\n                </a>\n\n                <a\n                    href="#about"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-about"\n                >\n                    About\n                </a>\n\n                <a\n                    href="#pricing"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-pricing"\n                >\n                    Pricing\n                </a>\n\n                <a\n                    href="#blog"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-blog"\n                >\n                    Blog\n                </a>\n\n                <a\n                    href="#albums"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-albums"\n                >\n                    Albums\n                </a>\n            </div>\n\n            <div\n                class="navbar-logo-container"\n                id="hamburger-navbar-logo-container-for-navbar-div-phone"\n            >\n                <a href="#home">\n                    <img\n                        src="${n}:8092/?type=logo"\n                        class="navbar-logo-phone"\n                    />\n                </a>\n            </div>\n        `;
                        } catch (n) {
                            return (
                                console.error(
                                    "Error at html(dynamiclink: string): string in ./components/hamburgerNavbar.ts",
                                    n,
                                ),
                                ""
                            );
                        }
                    });
            },
            254: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.html = void 0),
                    (a.html = function (n) {
                        try {
                            return ` <div\n                class="hamburger-button"\n                onclick="hamburgerClick('homepage-navbar-div-phone')"\n                id="inside-homepage-navbar-div-phone"\n            >\n                &#9776;\n            </div>\n            \x3c!-- Hamburger Navbar --\x3e\n            <div\n                class="hamburger-navbar"\n                id="hamburger-navbar-for-homepage-navbar-div-phone"\n            >\n                <a\n                    href="#home"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-home"\n                >\n                    Home\n                </a>\n\n                <a\n                    href="#contact"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-contact"\n                >\n                    Contact\n                </a>\n\n                <a\n                    href="#about"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-about"\n                >\n                    About\n                </a>\n\n                <a\n                    href="#pricing"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-pricing"\n                >\n                    Pricing\n                </a>\n\n                <a\n                    href="#blog"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-blog"\n                >\n                    Blog\n                </a>\n\n                <a\n                    href="#albums"\n                    class="hamburger-navbar-option"\n                    id="hamburger-navbar-option-albums"\n                >\n                    Albums\n                </a>\n            </div>\n\n            <div\n                class="navbar-logo-container"\n                id="hamburger-navbar-logo-container-for-homepage-navbar-div-phone"\n            >\n                <a href="#home">\n                    <img\n                        src="${n}:8092/?type=logo"\n                        class="navbar-logo-phone"\n                    />\n                </a>\n            </div>`;
                        } catch (n) {
                            return (
                                console.error(
                                    "Error at html(dynamiclink: string): string in ./components/homepageHamburgerNavbar.ts",
                                    n,
                                ),
                                ""
                            );
                        }
                    });
            },
            600: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.html = void 0),
                    (a.html = function (n) {
                        try {
                            return `\n            <br />\n            <div\n                class="navbar-container"\n                id="homepagenavbar-container"\n            >\n                <div class="navbar homepage-navbar-div-options">\n                    <a\n                        id="navbar-home-option"\n                        href="#home"\n                    >\n                        Home\n                    </a>\n                    <a\n                        id="navbar-contact-option"\n                        href="#contact"\n                    >\n                        Contact\n                    </a>\n                    <a\n                        id="navbar-about-option"\n                        href="#about"\n                    >\n                        About\n                    </a>\n                    <a\n                        id="navbar-pricing-option"\n                        href="#pricing"\n                    >\n                        Pricing\n                    </a>\n                    <a\n                        id="navbar-blog-option"\n                        href="#blog"\n                    >\n                        Blog\n                    </a>\n                    <a\n                        id="navbar-albums-option"\n                        href="#albums"\n                    >\n                        Albums\n                    </a>\n                </div>\n            </div>\n            <div\n                id="homepage-navbar-logo-container"\n                class="navbar-logo-container"\n            >\n                <a href="#home">\n                    <img\n                        src="${n}:8092/?type=logo"\n                        class="navbar-logo"\n                    />\n                </a>\n            </div>\n        `;
                        } catch (n) {
                            return (
                                console.error(
                                    "Error at html(dynamiclink: string): string in ./components/homepagenavbar.ts",
                                    n,
                                ),
                                ""
                            );
                        }
                    });
            },
            619: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.html = void 0),
                    (a.html = function (n) {
                        try {
                            return `\n            <br />\n\n            <div class="navbar-container">\n                <div class="navbar generic-navbar">\n                    <a\n                        id="navbar-home-option"\n                        href="#home"\n                    >\n                        Home\n                    </a>\n                    <a\n                        id="navbar-contact-option"\n                        href="#contact"\n                    >\n                        Contact\n                    </a>\n                    <a\n                        id="navbar-about-option"\n                        href="#about"\n                    >\n                        About\n                    </a>\n                    <a\n                        id="navbar-pricing-option"\n                        href="#pricing"\n                    >\n                        Pricing\n                    </a>\n                    <a\n                        id="navbar-blog-option"\n                        href="#blog"\n                    >\n                        Blog\n                    </a>\n                    <a\n                        id="navbar-albums-option"\n                        href="#albums"\n                    >\n                        Albums\n                    </a>\n                </div>\n            </div>\n            <div class="navbar-logo-container">\n                <a href="#home">\n                    <img\n                        src="${n}:8092/?type=logo"\n                        class="navbar-logo"\n                    />\n                </a>\n            </div>\n\n            <br /><br /><br /><br />\n        `;
                        } catch (n) {
                            return (
                                console.error(
                                    "Error at html(dynamiclink: string): string in ./components/navbar.ts",
                                    n,
                                ),
                                ""
                            );
                        }
                    });
            },
            829: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 });
                const r = e(185);
                document.addEventListener("DOMContentLoaded", async () => {
                    await (0, r.main)("@dynamiclink", "@language", "@contactemail");
                }),
                    window.addEventListener("resize", r.windowSizeCheck),
                    setInterval(function () {
                        "home" === (0, r.getPage)() && (0, r.nextHomepageImage)();
                    }, 1e4),
                    window.addEventListener("hashchange", () => {
                        console.log(`changing page to ${(0, r.getPage)()}`), (0, r.hashchangeEvent)();
                    });
            },
            64: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.splitArrayIntoParts = a.createURL = void 0);
                const e = "./extension.ts";
                (a.createURL = function (n, a) {
                    try {
                        console.log(n);
                        const e = new URL(`${n}`);
                        for (const n in a) a.hasOwnProperty(n) && e.searchParams.set(n, a[n]);
                        return e;
                    } catch (n) {
                        return void console.error(
                            `Error at createURL(link: string, params: URLParams): URL | undefined in ${e}`,
                            n,
                        );
                    }
                }),
                    (a.splitArrayIntoParts = function (n, a) {
                        const r = [];
                        try {
                            if (a <= 0) throw new Error("x should be greater than 0");
                            if (a >= n.length)
                                throw new Error("x should be less than the length of the array");
                            const e = [],
                                r = n.length,
                                o = Math.ceil(r / a);
                            for (let a = 0; a < r; a += o) {
                                const r = n.slice(a, a + o);
                                e.push(r);
                            }
                            return e;
                        } catch (n) {
                            return (
                                console.error(
                                    `Error at splitArrayIntoParts(arr: ReadonlyArray<T>, x: N): FixedArray<T[], N> in ${e}`,
                                    n,
                                ),
                                r
                            );
                        }
                    });
            },
            446: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.onload = a.html = void 0),
                    (a.html = function () {
                        return { html: "<h1>About</h1>", pageName: "about" };
                    }),
                    (a.onload = async function (n) {});
            },
            848: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 }), (a.onload = a.html = void 0);
                const r = e(313);
                (a.html = function () {
                    return { html: "", pageName: "album" };
                }),
                    (a.onload = async function (n) {
                        try {
                            $("#albums").html(
                                "\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n        ",
                            );
                            const a = await (0, r.fetchCategories)(n.dynamiclink);
                            $("#albums").append($("<div>", { id: "albums-gallery-container" }));
                            for (let e = 0; e < a.length; e++) {
                                const r = `\n                <div class="imageContainer">\n                    <img\n                        src="${((
                                    n,
                                    a,
                                ) => {
                                    let e = new URL(`${n}:8092/`);
                                    return (
                                        e.searchParams.set("type", "cover"),
                                        e.searchParams.set("album", a),
                                        e.toString()
                                    );
                                })(
                                    n.dynamiclink,
                                    a[e].NAME,
                                )}"\n                        onclick="window.location.href='#album_${
                                    a[e].NAME
                                }'"\n                        class="albumCoverImage"\n                        alt="Image ${e}"\n                        id="${
                                    a[e].NAME
                                }AlbumCoverForAlbums"\n                    />\n\n                    <span\n                        id="${
                                    a[e].NAME
                                }AlbumCoverForAlbumsSpan"\n                        onclick="window.location.href='#album_${
                                    a[e].NAME
                                }'"\n                    >\n                        ${
                                    a[e].NAME
                                }\n                    </span>\n                </div>\n            `;
                                $("#albums-gallery-container").append(r);
                            }
                            $("#albums").append(
                                "\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n        ",
                            );
                        } catch (n) {
                            console.error(
                                "Error at onload(data: OnloadData): Promise<void> in ./pages/albums.ts",
                                n,
                            );
                        }
                    });
            },
            987: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.onload = a.html = void 0),
                    (a.html = function () {
                        return { html: "<h1>Blog</h1>", pageName: "blog" };
                    }),
                    (a.onload = async function (n) {});
            },
            430: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.onload = a.html = void 0),
                    (a.html = function () {
                        return {
                            html: '\n            <div class="contactFormDiv">\n                <form\n                    action="https://getform.io/f/31c88bef-faa3-495d-a1fd-0a8c8a7f7ad6"\n                    method="POST"\n                >\n                    <label\n                        id="first-name-label"\n                        class="contact-form-label"\n                        for="first-name"\n                    >\n                        First Name*:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="first-name-input"\n                        class="contact-form-input"\n                        name="first-name"\n                        title="First Name"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="middle-name-label"\n                        class="contact-form-label"\n                        for="middle-name"\n                    >\n                        Middle Name:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="middle-name-input"\n                        class="contact-form-input"\n                        name="middle-name"\n                        title="Middle Name"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="last-name-label"\n                        class="contact-form-label"\n                        for="last-name"\n                    >\n                        Last Name*:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="last-name-input"\n                        class="contact-form-input"\n                        name="last-name"\n                        title="Last Name"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="email-address-label"\n                        class="contact-form-label"\n                        for="email-address"\n                    >\n                        Email Address*:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="email-address-input"\n                        class="contact-form-input"\n                        name="email-address"\n                        title="Email Address"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="phone-number-label"\n                        class="contact-form-label"\n                        for="phone-number"\n                    >\n                        Phone Number*:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="phone-number-input"\n                        class="contact-form-input"\n                        name="phone-number"\n                        title="Phone Number"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="subject-label"\n                        class="contact-form-label"\n                        for="subject"\n                    >\n                        Subject*:\n                    </label>\n                    <br /><br />\n                    <input\n                        id="subject-input"\n                        class="contact-form-input"\n                        name="subject"\n                        title="Subject"\n                    />\n                    <br /><br /><br />\n\n                    <label\n                        id="message-label"\n                        class="contact-form-label"\n                        for="message"\n                    >\n                        Message*:\n                    </label>\n                    <br /><br />\n                    <textarea\n                        id="message-input"\n                        class="contact-form-large-input"\n                        name="message"\n                        title="Message"\n                    ></textarea>\n                    <br /><br /><br />\n\n                    <button\n                        type="submit"\n                        class="formSubmitButtonClass"\n                        id="formSubmitButtonID"\n                    >\n                        SEND\n                    </button>\n                </form>\n            </div>\n\n            <br /><br /><br />\n        ',
                            pageName: "contact",
                        };
                    }),
                    (a.onload = async function (n) {});
            },
            277: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 }), (a.onload = a.html = void 0);
                const r = e(313);
                (a.html = function () {
                    return {
                        html: '\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n\n            <div id="album-gallery"></div>\n\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n            <br />\n        ',
                        pageName: "home",
                    };
                }),
                    (a.onload = async function (n) {
                        try {
                            const a = await (0, r.fetchCategories)(n.dynamiclink);
                            for (let e = 0; e < a.length; e++) {
                                const r = `\n                <div class="imageContainer">\n                    <img\n                        src="${((
                                    n,
                                    a,
                                ) => {
                                    let e = new URL(`${n}:8092/`);
                                    return (
                                        e.searchParams.set("type", "cover"),
                                        e.searchParams.set("album", a),
                                        e.toString()
                                    );
                                })(
                                    n.dynamiclink,
                                    a[e].NAME,
                                )}"\n                        onclick="window.location.href='#album_${
                                    a[e].NAME
                                }'"\n                        class="albumCoverImage"\n                        alt="Image ${e}"\n                        id="${
                                    a[e].NAME
                                }AlbumCoverForHome"\n                    />\n\n                    <span\n                        id="${
                                    a[e].NAME
                                }AlbumCoverForHomeSpan"\n                        onclick="window.location.href='#album_${
                                    a[e].NAME
                                }'"\n                    >\n                        ${
                                    a[e].NAME
                                }\n                    </span>\n                </div>\n            `;
                                $("#album-gallery").append(r);
                            }
                        } catch (n) {
                            console.error(
                                "Error at onload(data: OnloadData): Promise<void> in ./pages/home.ts",
                                n,
                            );
                        }
                    });
            },
            941: (n, a, e) => {
                Object.defineProperty(a, "__esModule", { value: !0 }), (a.onload = a.html = void 0);
                const r = e(313),
                    o = e(64);
                (a.html = function () {
                    return { html: "<h1>Album</h1>", pageName: "album" };
                }),
                    (a.onload = async function (n, a) {
                        try {
                            const e = (0, o.splitArrayIntoParts)(
                                (await (0, r.getCategoryStills)(n, a)).map(
                                    (a) =>
                                        `\n                    <img\n                        id="still_${
                                            a.UID
                                        }"\n                        src="${String(
                                            (0, o.createURL)(`${n}:8092/`, {
                                                type: "img",
                                                img: a.UID.toString(),
                                            }),
                                        )}"\n                        class="albumImage"\n                    />\n                    <br />\n                `,
                                ),
                                (() => {
                                    const n = window.innerWidth;
                                    return n >= 1200 ? 5 : n >= 992 ? 4 : n >= 768 ? 3 : 1;
                                })(),
                            );
                            $("#app").append($("<div></div>").attr("id", `album_${a}`));
                            for (let n = 0; n < e.length; n++)
                                $(`#album_${a}`).append(
                                    $("<div></div>", {
                                        class: `within-div-${n + 1}`,
                                        id: `album_${a}-within-div-${n + 1}`,
                                    })
                                        .html(e[n].join("<br />"))
                                        .css({ flex: "1", padding: "0px", margin: "3px 2px 2px" }),
                                );
                            $(`#album_${a}`).css({
                                display: "flex",
                                marginLeft: "10px",
                                marginRight: "10px",
                            });
                        } catch (n) {
                            console.error(
                                "Error at onload(dynamiclink: string, album: string): Promise<void> in ./pages/inPage/album.ts",
                                n,
                            );
                        }
                    });
            },
            111: (n, a) => {
                Object.defineProperty(a, "__esModule", { value: !0 }),
                    (a.onload = a.html = void 0),
                    (a.html = function () {
                        return { html: " <h1>Pricing</h1> ", pageName: "pricing" };
                    }),
                    (a.onload = async function (n) {});
            },
        },
        a = {};
    function e(r) {
        var o = a[r];
        if (void 0 !== o) return o.exports;
        var t = (a[r] = { exports: {} });
        return n[r](t, t.exports, e), t.exports;
    }
    (e.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (n) {
            if ("object" == typeof window) return window;
        }
    })()),
        e(185);
})();
