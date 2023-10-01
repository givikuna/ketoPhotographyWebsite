import * as aboutComponent from "./pages/about";
import * as albumsComponent from "./pages/albums";
import * as blogComponent from "./pages/blog";
import * as homeComponent from "./pages/home";
import * as pricingComponent from "./pages/pricing";
import * as contactComponent from "./pages/contact";

import * as hamburgerNavbarComponent from "./components/hamburgerNavbar";
import * as homepageHamburgerNavbarComponent from "./components/homepageHamburgerNavbar";
import * as navbarComponent from "./components/navbar";
import * as homepagenavbarComponent from "./components/homepagenavbar";
import * as footerComponent from "./components/footer";

import * as albumComponent from "./pages/inPage/album";

import "./events";

import { FixedArray, PageInformation, OnloadData, WebsiteLanguage, CATEGORY } from "../types/types";
import { getHomepageCoverImagesURLs, fetchCategories } from "./api";
import { Unpromisify } from "../types/types";

const filename: string = "./app.ts";

let iterated: number = 0;

const pages: Readonly<Readonly<PageInformation>[]> = [
    {
        pageName: "home",
        get: homeComponent.html,
        onload: homeComponent.onload,
    },
    {
        pageName: "contact",
        get: contactComponent.html,
        onload: contactComponent.onload,
    },
    {
        pageName: "about",
        get: aboutComponent.html,
        onload: aboutComponent.onload,
    },
    {
        pageName: "pricing",
        get: pricingComponent.html,
        onload: pricingComponent.onload,
    },
    {
        pageName: "albums",
        get: albumsComponent.html,
        onload: albumsComponent.onload,
    },
    {
        pageName: "blog",
        get: blogComponent.html,
        onload: blogComponent.onload,
    },
];

async function main(
    d: string = "ketojibladze.com",
    l: string = "en",
    c: string = "givitsvariani@proton.me",
): Promise<void> {
    try {
        updateNavbar();

        $("#back-to-albums-div").hide();

        $("#homepage-navbar-div").html(homepagenavbarComponent.html(d));
        $("#navbar-div").html(navbarComponent.html(d));
        $("#navbar-div-phone").html(hamburgerNavbarComponent.html(d));
        $("#homepage-navbar-div-phone").html(homepageHamburgerNavbarComponent.html(d));

        pages.forEach(async (page: PageInformation): Promise<void> => {
            $("#app").append(
                $(/* HTML */ `<div></div>`)
                    .attr("id", page.pageName ? page.pageName : "ERROR")
                    .addClass(page.pageName && page.pageName.startsWith("album_") ? "albumPage" : "webPage")
                    .html(page.get().html)
                    .hide(),
            );

            await page.onload({
                dynamiclink: d,
                language: ((l_: string): string => (l_ === "eng" ? l_ : languagize(l_)))(
                    l,
                ) as WebsiteLanguage,
                contactEmail: c,
            } satisfies OnloadData);
        });

        $(`#${getPage()}`).show();

        $("#footer-div").show().html(footerComponent.html(d));

        if (
            getPage().split("").includes("_") &&
            (["album_", "gallery_"] satisfies ReadonlyArray<string>).includes(getPage().split("_")[0])
        ) {
            $("#back-to-albums-div").show();
        }
    } catch (e: unknown) {
        console.error(
            `Error at main(d: string | null, l: string | null, c: string | null): Promise<void> in ${filename}`,
            e,
        );
    }
}

function languagize(l: string | null): string {
    const _default: ReturnType<typeof languagize> = "en" satisfies string;

    try {
        return l === "ru" ? l : l === "ge" ? l : "en";
    } catch (e: unknown) {
        console.error(`Error at languagize(l: string): string in ${filename}`, e);
        return _default;
    }
}

function getCurrentMode(): string {
    const _default: ReturnType<typeof getCurrentMode> = "laptop" satisfies string;

    try {
        return ((screenWidth: number): string => {
            if (screenWidth >= 1200) return "desktop";
            if (screenWidth >= 992) return "laptop";
            if (screenWidth > 768) return "smaller_laptop";
            return "phone";
        })(window.innerWidth);
    } catch (e: unknown) {
        console.error(`Error at getCurrentMode(): string in ${filename}`, e);
        return _default;
    }
}

function getPage(): string {
    const _default: ReturnType<typeof getPage> = "home";

    try {
        const page: string = window.location.hash.slice(1);
        return page != "" && page != null && typeof page != "undefined" && page != undefined ? page : "home";
    } catch (e: unknown) {
        console.error(`Error at getPage(): string in ${filename}`, e);
        return _default;
    }
}

function updateNavbar(): void {
    try {
        const hideAllBut: (div: string) => void = (div: string): void => {
            (
                [
                    "homepage-navbar-div-phone",
                    "navbar-div-phone",
                    "navbar-div",
                    "homepage-navbar-div",
                ] as FixedArray<string, 4>
            ).forEach((div_: string): void => {
                $(`#${div_}`).hide();
            });

            $(`#${div}`).show();
        };

        if (getCurrentMode() === "phone") {
            if (getPage() === "home") {
                hideAllBut("homepage-navbar-div-phone");
                $("#app").css("margin-top", "100px");
            } else {
                hideAllBut("navbar-div-phone");
            }
        } else {
            if (getPage() === "home") {
                hideAllBut("homepage-navbar-div");
            } else {
                hideAllBut("navbar-div");
            }
            $("#app").css("margin-top", "0px");
        }
    } catch (e: unknown) {
        console.error(`Error in updateNavbar(): void in ${filename}`, e);
    }
}

function windowSizeCheck(): boolean {
    const _default: ReturnType<typeof windowSizeCheck> = false;

    try {
        if (window.innerWidth <= 768) {
            changeNavbarForSmallDisplays();
            return true;
        }

        $("#homepage-navbar-div").css("height", "100%").css("margin-top", "0%");
        $("#navbar-div-phone").hide();
        $("#homepage-navbar-div-phone").hide();

        if (getPage() === "home") {
            $("#homepagenavbar-container").show();
            $("homepage-navbar-div").show();
            $("homepage-navbar-logo-container").show();
        } else {
            $("navbar-div").show();
        }

        $("#app").css("margin-top", "0px");

        return false;
    } catch (e: unknown) {
        console.error(`Error at windowSizeCheck(): boolean in ${filename}`, e);
        return _default;
    }
}

function changeNavbarForSmallDisplays(): void {
    try {
        $("#navbar-div").hide();

        if (getPage() === "home") {
            $("#navbar-div-phone").hide();
            $("#homepage-navbar-div-phone").show();
            $("#homepagenavbar-container").hide();
            $("homepage-navbar-div").show();
            $("#homepage-navbar-div").css("height", "200px").css("margin-top", "100px");
        } else {
            $("#navbar-div-phone").show();
            $("#homepage-navbar-div-phone").hide();
            $("#homepagenavbar-container").hide();
            $("#homepage-navbar-div").hide();
            $("#app").css("margin-top", "100px");
        }
        $("#homepage-navbar-logo-container").hide();
    } catch (e: unknown) {
        console.error(`Error in changeNavbarForSmallDisplays(): void in ${filename}`, e);
    }
}

function toggleCurrentHamburgerNavbar(currentNavbarID: string): void {
    try {
        const $navbarDiv: JQuery<HTMLElement> = $(`#${currentNavbarID}`);
        const isHidden: boolean = $navbarDiv.is(":hidden");

        if (isHidden) {
            $navbarDiv.css("margin-top", "40px").slideDown("fast");
        } else {
            $navbarDiv.css("margin-top", "0").toggle();
        }
    } catch (e: unknown) {
        console.error(`Error at toggleCurrentHamburgerNavbar(): void in ${filename}`, e);
    }
}

async function nextHomepageImage(): Promise<void> {
    try {
        const images: ReadonlyArray<string> = (await getHomepageCoverImagesURLs("@dynamiclink")).map(
            (url: URL): string => url.toString(),
        );

        const homepage_navbar_div: HTMLDivElement | null = document.querySelector("#homepage-navbar-div");

        if (homepage_navbar_div == null) {
            return;
        }

        if (iterated === images.length) {
            iterated = 0;
            homepage_navbar_div.style.backgroundImage = `url(${images[iterated++]})`;
        } else {
            homepage_navbar_div.style.backgroundImage = `url(${images[iterated++]})`;
        }
    } catch (e: unknown) {
        console.error("Error in nextHomepageImage(): void: ", e);
    }
}

async function needsToLoadNewAlbum(albumName: string): Promise<boolean> {
    const _default: Unpromisify<ReturnType<typeof needsToLoadNewAlbum>> = false;

    try {
        return (
            getPage().split("_")[0] === "album_" &&
            (
                (await fetchCategories("@dynamiclink")).map(
                    (category: Readonly<CATEGORY>): string => category.NAME,
                ) satisfies ReadonlyArray<string>
            ).includes(albumName)
        );
    } catch (e: unknown) {
        console.error(`Error at needsToLoadNewAlbum(): boolean in ${filename}`, e);
        return _default;
    }
}

async function hashchangeEvent(): Promise<void> {
    try {
        console.log(getPage());

        const pageNames: ReadonlyArray<string> = pages.map((page: PageInformation): string => page.pageName);

        if (pageNames.includes(getPage())) {
            pageNames.forEach((el: string): void => {
                $(`#${el}`).hide();
                if (el === getPage()) $(`#${el}`).show();
            });
        }

        if (await needsToLoadNewAlbum(getPage().split("_")[1])) {
            albumComponent.onload("@dynamiclink", getPage().split("_")[1]);
        }

        updateNavbar();
    } catch (e: unknown) {
        console.error(`Error at hashchangeEvent(): void ${filename}`, e);
    }
}

function hamburgerClick(from: string): void {
    try {
        const currentNavbarID: string = `hamburger-navbar-for-${from}`;
        toggleCurrentHamburgerNavbar(currentNavbarID);

        if (!$(`#${currentNavbarID}`).is(":hidden")) {
            $("#homepage-navbar-div").css("margin-top", "300px");

            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                $(`#app`).css("margin-top", "300px");
            }
        } else {
            $("#homepage-navbar-div").css("margin-top", "100px");
            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                $(`#${getPage()}`).css("margin-top", "100px");
            }
        }

        if (getPage() !== "home") {
            $("#app").css("margin-top", "100px");
        }
    } catch (e: unknown) {
        console.error(`Error at hamburgerClick(): void in ${filename}`, e);
    }
}

// @ts-ignore
global["hamburgerClick"] = hamburgerClick;

export { main, windowSizeCheck, getPage, nextHomepageImage, hashchangeEvent };
