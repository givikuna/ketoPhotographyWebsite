type Immutable2DArray<T> = Readonly<Readonly<T>[]>;

type Unreadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

type Unpromisify<T> = T extends Promise<infer U> ? U : T;

type CATEGORY = {
    UID: number;
    NAME: string;
    COVER_STILL_UID: number;
    DESCRIPTION: string;
};

type FrontPageCoverImage = {
    img: string;
    extension: string;
};

type PageData = {
    type: string;
    page: string;
    display: string;
    subpages: (PageData[] | Immutable2DArray<PageData>) | (string[] | Immutable2DArray<string>);
    components: string[] | Immutable2DArray<string>;
};

const pages: string[] = [];
let iterated: number = 0;
let previousPage: string = "";

async function main(
    d: string | null = null,
    l: string | null = null,
    c: string | null = null,
): Promise<void> {
    const dynamiclink: typeof d = d ? d : "ketojibladze.com";
    const language: typeof l = l ? getLang(l) : "en";
    const contactemail: typeof c = c ? c : "givitsvariani@proton.me";
    try {
        previousPage = getPage();

        changeLang(language);
        updateNavbar();

        let _: void = await buildNavBar(dynamiclink)
            .then((): void => {
                buildApp(dynamiclink);
            })
            .then(updateApp)
            .then((): void => {
                makeFooter(dynamiclink);
            })
            .then((): void => {
                updateNavbar();
                // keep this like this
                // it'll throw an error if you pass it in as as a variable directly because parameters
                // - me to future me
            })
            .then(updateApp)
            .then((): void => {
                const navbars: Immutable2DArray<string> = ["navbar-div-phone", "homepage-navbar-div-phone"];

                for (let i: number = 0; i < navbars.length; i++) {
                    let _: void = buildHamburger(navbars[i], dynamiclink);
                }
            })
            .then((): void => {
                if (inPhoneMode()) {
                    hideDiv("navbar-div");
                    hideDiv("homepagenavbar-container");
                    if (getPage() === "home") {
                        showDiv("homepage-navbar-div");
                    } else {
                        hideDiv("homepage-navbar-div");
                    }
                }
            });

        console.log("all loaded properly");
    } catch (e: unknown) {
        console.error(e);
    }
}

// --------------------------------------------------------------------------------------- Build functions:

async function createAlbum(album: string, dynamiclink: string): Promise<void> {
    try {
        const albumDiv: JQuery<Element> = $(/*HTML*/ `<div>`)
            .attr("id", `album_${album}`)
            .append(await fetchComponent("inAlbum", dynamiclink)).append(/*HTML*/ `
                <div
                    class="inAlbumImages"
                    id="${album}Gallery"
                > </div>
            `);

        $("#app").append(albumDiv);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildApp(dynamiclink: string): Promise<boolean> {
    const _default: Unpromisify<ReturnType<typeof buildApp>> = false;

    try {
        const data: Immutable2DArray<PageData> = await (async (
            _dynamiclink: typeof dynamiclink,
        ): Promise<Immutable2DArray<PageData>> => {
            const _data: Immutable2DArray<PageData> = (await getPages(
                _dynamiclink,
            )) as Immutable2DArray<PageData>;

            if (typeof _data === "string") {
                return JSON.parse(_data);
            }

            return _data;
        })(dynamiclink);

        for (let i: number = 0; i < data.length; i++) {
            const pageDiv: JQuery<HTMLElement> = $(/*HTML*/ `<div></div>`)
                .attr("id", data[i].page ? data[i].page : "ERROR")
                .addClass(data[i].page && data[i].page.startsWith("album_") ? "albumPage" : "webPage");
            alert(data[i].page);

            pages.push(data[i].page);

            await buildComponent(
                ((div_id: string | undefined): string => {
                    if (div_id == undefined && typeof div_id !== "undefined") {
                        return "";
                    }
                    return pageDiv.attr("id") as string;
                })(pageDiv.attr("id")),
                dynamiclink,
            );

            updateApp();
        }

        for (let i: number = 0; i < data.length; i++) {
            await buildPage(data[i].page, dynamiclink);
        }

        return true;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function buildPage(page: string, dynamiclink: string): Promise<void> {
    try {
        switch (page) {
            case "home":
                const categories: Immutable2DArray<CATEGORY> = (await fetchCategories(
                    dynamiclink,
                )) as Immutable2DArray<CATEGORY>;

                for (let i: number = 0; i < categories.length; i++) {
                    const element: string = /*HTML*/ `
                        <div class="imageContainer">
                            <img
                                src="${dynamiclink}:8092/?type=cover&album=${categories[i].NAME}"
                                onclick="window.location.href='#album_${categories[i].NAME}'"
                                class="albumCoverImage"
                                alt="Image ${i}"
                                id="${categories[i].NAME}AlbumCoverForHome"
                            >
                            <span id="${categories[i].NAME}AlbumCoverForHomeSpan">
                                ${categories[i].NAME}
                            </span>
                        </div>
                    `;

                    $("#album-gallery").append(element);

                    await createAlbum(categories[i].NAME, dynamiclink);

                    pages.push(`album_${categories[i].NAME}`);
                }

                break;
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

async function getHomepageCoverImages(dynamiclink: string): Promise<Immutable2DArray<string>> {
    const _default: Unpromisify<ReturnType<typeof getHomepageCoverImages>> = [];

    try {
        const m_images: string[] = [];
        const gottenImages: Immutable2DArray<FrontPageCoverImage> = (await (async (
            _dynamiclink: typeof dynamiclink,
        ): Promise<Immutable2DArray<FrontPageCoverImage>> => {
            // fetchWelcomeImageData()
            const _default2: Immutable2DArray<FrontPageCoverImage> = [
                {
                    img: "1.jpeg",
                    extension: "jpeg",
                },
                {
                    img: "2.jpeg",
                    extension: "jpeg",
                },
                {
                    img: "3.jpeg",
                    extension: "jpeg",
                },
                {
                    img: "4.jpeg",
                    extension: "jpeg",
                },
                {
                    img: "5.jpeg",
                    extension: "jpeg",
                },
            ] as const;

            try {
                const url: string = `${_dynamiclink}:8094/?data=frontPageCoverImageData`;
                const response: Readonly<Response> = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data: Immutable2DArray<FrontPageCoverImage> =
                    (await response.json()) as Immutable2DArray<FrontPageCoverImage>;

                return data;
            } catch (e2: unknown) {
                console.error("An error occurred while fetching dynamic data:", e2);
                return _default2;
            }
        })(dynamiclink)) as Immutable2DArray<FrontPageCoverImage>;

        for (let i: number = 1; i <= gottenImages?.length; i++) {
            if (i === 3) {
                [m_images[0], m_images[1]] = [m_images[1], m_images[0]];
            }
            m_images.push(`${dynamiclink}:8092/?type=frontPageCoverImageData&img=${i}`);
        }

        return m_images;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function buildNavBar(dynamiclink: string): Promise<void> {
    try {
        const navbar_div: HTMLElement | null = document.getElementById("navbar-div");
        const homepage_navbar_div: HTMLElement | null = document.getElementById("homepage-navbar-div");

        if (navbar_div == null || homepage_navbar_div == null) {
            return;
        }

        navbar_div.innerHTML += await fetchComponent("navbar", dynamiclink);
        homepage_navbar_div.innerHTML += await fetchComponent("homepagenavbar", dynamiclink);
    } catch (e: unknown) {
        console.error(e);
    }
}

function updateNavbar(callingFromWindowSizeCheck: boolean = false): void {
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
    } catch (e: unknown) {
        console.error(e);
    }
}

function buildHamburger(div: string, dynamiclink: string): void {
    try {
        const newNavbar: string = /*HTML*/ `
            <div class="hamburger-button" onclick="hamburgerClick('${div}')" id="inside-${div}">
                &#9776;
            </div>
            <!-- Hamburger Navbar -->
            <div class="hamburger-navbar" id="hamburger-navbar-for-${div}">
                <a href="#home" class="hamburger-navbar-option" id="hamburger-navbar-option-home">
                    Home
                </a>

                <a href="#contact" class="hamburger-navbar-option" id="hamburger-navbar-option-contact">
                    Contact
                </a>

                <a href="#about" class="hamburger-navbar-option" id="hamburger-navbar-option-about">
                    About
                </a>

                <a href="#pricing" class="hamburger-navbar-option" id="hamburger-navbar-option-pricing">
                    Pricing
                </a>

                <a href="#blog" class="hamburger-navbar-option" id="hamburger-navbar-option-blog">
                    Blog
                </a>

                <a href="#albums" class="hamburger-navbar-option" id="hamburger-navbar-option-albums">
                    Albums
                </a>
            </div>
            <div class="navbar-logo-container" id="hamburger-navbar-logo-container-for-${div}">
                <a href="#home">
                    <img src="${dynamiclink}:8092/?type=logo" class="navbar-logo-phone" />
                </a>
            </div>
        `;

        $(`#${div}`).append(newNavbar);
        $(`#inside-hamburger-wrapper-for-${div}`).hide();

        if (div === "navbar-div-phone") {
            $(`#${div}`).append(/*HTML*/ `
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            `);
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

function makeFooter(dynamiclink: string): void {
    try {
        $("#footer-div").show().append(/*HTML*/ `
            <footer>
                <a href="https://www.facebook.com"><img src="${dynamiclink}:8092/?type=icons&img=facebook" alt="Facebook"
                        class="SocialMediaIcon"></a>
                <a href="https://www.flickr.com"><img src="${dynamiclink}:8092/?type=icons&img=flickr" alt="Flickr"
                        class="SocialMediaIcon"></a>
                <a href="https://www.instagram.com"><img src="${dynamiclink}:8092/?type=icons&img=instagram" alt="Instagram"
                        class="SocialMediaIcon"></a>
                <a href="https://www.pinterest.com"><img src="${dynamiclink}:8092/?type=icons&img=pinterest" alt="Pinterest"
                        class="SocialMediaIcon"></a>
                <a href="https://www.youtube.com"><img src="${dynamiclink}:8092/?type=icons&img=youtube" alt="YouTube"
                        class="SocialMediaIcon"></a>

                <br>
                <br>

                <div>
                    <p>
                        <a href="#contact" class="contact-link">
                            Contact Me
                        </a>
                    </p>
                    <p>
                    <a href="#home" class="contact-link">
                        Home
                    </a>
                </p>
                </div>
            </footer>

            <br>
            <br>
        `);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildComponent(component: string, dynamiclink: string): Promise<HTMLElement | null> {
    const _default: Unpromisify<ReturnType<typeof buildComponent>> = null;

    try {
        /*
            let componentDiv: HTMLElement | null = document.getElementById(component ? component : "ERROR");

            if (componentDiv !== null) {
                componentDiv.innerHTML = await fetchComponent(component);
            }

            return componentDiv as HTMLElement;
        */
        let componentDiv: HTMLElement | null = $("#" + (component ? component : "ERROR"))[0];

        if (componentDiv !== null) {
            const componentHTML = await fetchComponent(component, dynamiclink);
            $(componentDiv).html(componentHTML);
        }

        return componentDiv as HTMLElement;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

// --------------------------------------------------------------------------------------- Event-based functions:

function hashchange(): void {
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

async function nextHomepageImage(): Promise<void> {
    try {
        const images: Immutable2DArray<string> = await getHomepageCoverImages("@dynamiclink");
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
        console.error(e);
    }
}

function windowSizeCheck(): boolean {
    const _default: ReturnType<typeof windowSizeCheck> = false;

    try {
        if (window.innerWidth <= 768) {
            changeNavbarForSmallDisplays();
            return true;
        }

        $("#homepage-navbar-div").css("height", "100%");
        $("#homepage-navbar-div").css("margin-top", "0%");
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
    } catch (e: unknown) {
        console.error(e);
        return _default;
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
        console.error(e);
    }
}

function changeNavbarForSmallDisplays(): void {
    try {
        $("#navbar-div").hide();

        if (getPage() === "home") {
            hideDiv("navbar-div-phone");
            showDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            showDiv("homepage-navbar-div");
            $("#homepage-navbar-div").css("height", "200px");
            $("#homepage-navbar-div").css("margin-top", "100px");
        } else {
            showDiv("navbar-div-phone");
            hideDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            hideDiv("homepage-navbar-div");
            $("#app").css("margin-top", "100px");
        }
        hideDiv("homepage-navbar-logo-container");
    } catch (e: unknown) {
        console.error(e);
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
        console.error(e);
    }
}

// --------------------------------------------------------------------------------------- Helper functions:

function inPhoneMode(): boolean {
    const _default: ReturnType<typeof inPhoneMode> = false;
    try {
        if (window.innerWidth <= 768) {
            return true;
        }

        return false;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function hideDiv(div: string): JQuery<HTMLElement> {
    return $(`#${div}`).hide();
}

function showDiv(div: string): JQuery<HTMLElement> {
    return $(`#${div}`).show();
}
async function updateApp(): Promise<void> {
    try {
        updateNavbar(true);

        const currentPage: string = pages.length > 0 && pages.includes(getPage()) ? getPage() : "home";

        for (let i: number = 0; i < pages.length; i++) {
            if (currentPage === pages[i]) {
                showDiv(pages[i]);
            } else {
                hideDiv(pages[i]);
            }
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

function getLang(lang: string): string {
    const _default: ReturnType<typeof getLang> = "en";

    try {
        return lang === "ru" ? lang : lang === "ge" ? lang : "en";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function changeLang(lang: string): boolean {
    const _default: ReturnType<typeof changeLang> = false;

    try {
        return true;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

// --------------------------------------------------------------------------------------- Data fetching functions:

async function fetchComponent(component: string, dynamiclink: string): Promise<string> {
    const _default: Unpromisify<ReturnType<typeof fetchComponent>> = "";

    try {
        const url: string = `${dynamiclink}:8095/?c=${component}`;
        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: string = await response.text();
        return data;
    } catch (e: unknown) {
        console.error("Error:", e);
        return _default;
    }
}

async function fetchCategories(dynamiclink: string): Promise<Immutable2DArray<CATEGORY>> {
    const _default: Unpromisify<ReturnType<typeof fetchCategories>> = [
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
    ] as const;

    try {
        const url: string = `${dynamiclink}:8094/?data=categories`;
        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Immutable2DArray<CATEGORY> = (await response.json()) as Immutable2DArray<CATEGORY>;
        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic data:", e);
        return _default;
    }
}

async function getPages(dynamiclink: string): Promise<Immutable2DArray<PageData>> {
    const _default: Unpromisify<ReturnType<typeof getPages>> = [
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
    ] as const;

    try {
        const url = `${dynamiclink}:8094/?data=pages`;
        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Immutable2DArray<PageData> = (await response.json()) as Immutable2DArray<PageData>;
        return data;
    } catch (error: unknown) {
        console.error("An error occurred while fetching dynamic data:", error);
        return _default;
    }
}

function getPage(): string {
    const _default: ReturnType<typeof getPage> = "home";

    try {
        const page: string = window.location.hash.slice(1);
        return page != "" &&
            page != null &&
            typeof page != "undefined" &&
            page != undefined &&
            pages.includes(page)
            ? page
            : "home";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

// --------------------------------------------------------------------------------------- Events:

window.addEventListener("hashchange", hashchange);

setInterval(function (): void {
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
