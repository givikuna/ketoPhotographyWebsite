import {
    Unpromisify,
    CATEGORY,
    STILL,
    SESSION,
    FixedArray,
    SelectRequestOption,
    URLParams,
} from "../types/types";

type PageData = {
    type: string;
    page: string;
    display: string;
    subpages: (PageData[] | Readonly<Readonly<PageData>[]>) | (string[] | ReadonlyArray<string>);
    components: string[] | ReadonlyArray<string>;
};

const pages: string[] = [];
const loadedGalleryAndSessionPages: string[] = [];
const builtAlbums: string[] = [];
let iterated: number = 0;
let previousPage: string = "";

async function main(
    d: string | null = null,
    l: string | null = null,
    c: string | null = null,
): Promise<void> {
    const dynamiclink: typeof d = d ? d : "ketojibladze.com";
    const language: typeof l = l ? getLang(l) : "en";
    // @ts-ignore
    const contactemail: typeof c = c ? c : "givitsvariani@proton.me";
    console.log(contactemail);

    try {
        previousPage = getPage();

        changeLang(language);
        updateNavbar();

        $(`#back-to-albums-div`).toggle();

        await buildNavBar(dynamiclink)
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
                const navbars: FixedArray<string, 2> = ["navbar-div-phone", "homepage-navbar-div-phone"];

                for (let i: number = 0; i < navbars.length; i++) {
                    buildHamburger(navbars[i], dynamiclink);
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
            })
            .then((): void => {
                addCategoriesAndSessionsAsPages(dynamiclink);
            });

        console.log("all loaded properly");
    } catch (e: unknown) {
        console.error(e);
    }
}

// --------------------------------------------------------------------------------------- Build functions:

async function addCategoriesAndSessionsAsPages(dynamiclink: string): Promise<void> {
    const categories: Readonly<Readonly<CATEGORY>[]> = await fetchCategories(dynamiclink);
    const sessions: Readonly<Readonly<SESSION>[]> = await fetchSessions(dynamiclink);

    try {
        for (let i: number = 0; i < categories.length; i++) {
            $("#app").append(
                $(/* HTML */ `<div></div>`)
                    .attr("id", categories[i].NAME ? `album_${categories[i].NAME}` : "ERROR")
                    .css("text-align", "center")
                    .addClass("albumPage")
                    .hide(),
            );

            pages.push(`album_${categories[i].NAME}`);
        }
    } catch (e: unknown) {
        console.error(e);
    }

    try {
        for (let i: number = 0; i < sessions.length; i++) {
            $("#app").append(
                $(/* HTML */ `<div></div>`)
                    .attr("id", sessions[i].UID ? `gallery_${sessions[i].UID}` : "ERROR")
                    .css("text-align", "center")
                    .addClass("galleryPage")
                    .hide(),
            );

            pages.push(`gallery_${sessions[i].UID}`);
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildApp(dynamiclink: string): Promise<boolean> {
    const _default: Unpromisify<ReturnType<typeof buildApp>> = false;

    try {
        const data: Readonly<Readonly<PageData>[]> = await (async (
            _dynamiclink: string,
        ): Promise<Readonly<Readonly<PageData>[]>> => {
            const _data: Readonly<Readonly<PageData>[]> = (await getPages(_dynamiclink)) as Readonly<
                Readonly<PageData>[]
            >;

            if (typeof _data === "string") {
                return JSON.parse(_data);
            }

            return _data;
        })(dynamiclink);

        for (let i: number = 0; i < data.length; i++) {
            const pageDiv: JQuery<HTMLElement> = $(/* HTML */ `<div></div>`)
                .attr("id", data[i].page ? data[i].page : "ERROR")
                .addClass(data[i].page && data[i].page.startsWith("album_") ? "albumPage" : "webPage");

            $("#app").append(pageDiv);

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
                /*
                const categories: Immutable2DArray<CATEGORY> = ((
                    data: string,
                ): Immutable2DArray<CATEGORY> => {
                    return JSON.parse(data) as Immutable2DArray<CATEGORY>;
                })(
                    JSON.parse(
                        JSON.stringify((await fetchCategories(dynamiclink)) as Immutable2DArray<CATEGORY>),
                    ),
                );
                */
                const categories: Readonly<Readonly<CATEGORY>[]> = await fetchCategories(dynamiclink);

                // ${dynamiclink}:8092/?type=cover&album=${categories[i].NAME}
                for (let i: number = 0; i < categories.length; i++) {
                    const element: string = /* HTML */ `
                        <div class="imageContainer">
                            <img
                                src="${((_dynamiclink: string, category: string): string => {
                                    let url: URL = new URL(`${_dynamiclink}:8092/`);
                                    url.searchParams.set("type", "cover");
                                    url.searchParams.set("album", category);

                                    return url.toString();
                                })(dynamiclink, categories[i].NAME)}"
                                onclick="window.location.href='#album_${categories[i].NAME}'"
                                class="albumCoverImage"
                                alt="Image ${i}"
                                id="${categories[i].NAME}AlbumCoverForHome"
                            />

                            <span
                                id="${categories[i].NAME}AlbumCoverForHomeSpan"
                                onclick="window.location.href='#album_${categories[i].NAME}'"
                            >
                                ${categories[i].NAME}
                            </span>
                        </div>
                    `;

                    $("#album-gallery").append(element);
                }
                break;
            case "albums":
                await buildAlbumsPage(dynamiclink);
                break;
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildAlbumsPage(dynamiclink: string): Promise<void> {
    try {
        $("#albums").html(/* HTML */ `
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        `);

        const categories: Readonly<Readonly<CATEGORY>[]> = await fetchCategories(dynamiclink);

        $("#albums").append(
            $("<div>", {
                id: "albums-gallery-container",
            }),
        );

        // ${dynamiclink}:8092/?type=cover&album=${categories[i].NAME}
        for (let i: number = 0; i < categories.length; i++) {
            const element: string = /* HTML */ `
                <div class="imageContainer">
                    <img
                        src="${((_dynamiclink: string, category: string): string => {
                            let url: URL = new URL(`${_dynamiclink}:8092/`);
                            url.searchParams.set("type", "cover");
                            url.searchParams.set("album", category);

                            return url.toString();
                        })(dynamiclink, categories[i].NAME)}"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                        class="albumCoverImage"
                        alt="Image ${i}"
                        id="${categories[i].NAME}AlbumCoverForAlbums"
                    />

                    <span
                        id="${categories[i].NAME}AlbumCoverForAlbumsSpan"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                    >
                        ${categories[i].NAME}
                    </span>
                </div>
            `;

            $("#albums-gallery-container").append(element);
        }

        $("#albums").append(/* HTML */ `
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        `);
    } catch (e: unknown) {
        console.error(e);
    }
}

function splitArrayIntoParts<T, N extends number>(arr: ReadonlyArray<T>, x: N): FixedArray<T[], N> {
    try {
        if (x <= 0) {
            throw new Error("x should be greater than 0");
        }

        if (x >= arr.length) {
            throw new Error("x should be less than the length of the array");
        }

        const result: T[][] = [];
        const length: number = arr.length;
        const partSize: number = Math.ceil(length / x);

        for (let i: number = 0; i < length; i += partSize) {
            const part: T[] = arr.slice(i, i + partSize);
            result.push(part);
        }

        return result as FixedArray<T[], N>;
    } catch (e: unknown) {
        console.error(e);
        return [] as any;
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
        $(`#${div}`).append(/* HTML */ `
            <div
                class="hamburger-button"
                onclick="hamburgerClick('${div}')"
                id="inside-${div}"
            >
                &#9776;
            </div>
            <!-- Hamburger Navbar -->
            <div
                class="hamburger-navbar"
                id="hamburger-navbar-for-${div}"
            >
                <a
                    href="#home"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-home"
                >
                    Home
                </a>

                <a
                    href="#contact"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-contact"
                >
                    Contact
                </a>

                <a
                    href="#about"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-about"
                >
                    About
                </a>

                <a
                    href="#pricing"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-pricing"
                >
                    Pricing
                </a>

                <a
                    href="#blog"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-blog"
                >
                    Blog
                </a>

                <a
                    href="#albums"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-albums"
                >
                    Albums
                </a>
            </div>

            <div
                class="navbar-logo-container"
                id="hamburger-navbar-logo-container-for-${div}"
            >
                <a href="#home">
                    <img
                        src="${dynamiclink}:8092/?type=logo"
                        class="navbar-logo-phone"
                    />
                </a>
            </div>
        `);

        $(`#inside-hamburger-wrapper-for-${div}`).hide();

        if (div === "navbar-div-phone") {
            $(`#${div}`).append(/* HTML */ `
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            `);
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

function makeFooter(dynamiclink: string): void {
    try {
        $("#footer-div")
            .show()
            .append(/* HTML */ `
                <footer>
                    <a href="https://www.facebook.com">
                        <img
                            src="${dynamiclink}:8092/?type=icons&img=facebook"
                            alt="Facebook"
                            class="SocialMediaIcon"
                        />
                    </a>
                    <a href="https://www.flickr.com">
                        <img
                            src="${dynamiclink}:8092/?type=icons&img=flickr"
                            alt="Flickr"
                            class="SocialMediaIcon"
                        />
                    </a>
                    <a href="https://www.instagram.com">
                        <img
                            src="${dynamiclink}:8092/?type=icons&img=instagram"
                            alt="Instagram"
                            class="SocialMediaIcon"
                        />
                    </a>
                    <a href="https://www.pinterest.com">
                        <img
                            src="${dynamiclink}:8092/?type=icons&img=pinterest"
                            alt="Pinterest"
                            class="SocialMediaIcon"
                        />
                    </a>
                    <a href="https://www.youtube.com">
                        <img
                            src="${dynamiclink}:8092/?type=icons&img=youtube"
                            alt="YouTube"
                            class="SocialMediaIcon"
                        />
                    </a>

                    <br />
                    <br />

                    <div>
                        <p>
                            <a
                                href="#contact"
                                class="contact-link"
                            >
                                Contact Me
                            </a>
                        </p>
                        <p>
                            <a
                                href="#home"
                                class="contact-link"
                            >
                                Home
                            </a>
                        </p>
                    </div>
                </footer>

                <br />
                <br />
            `);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildComponent(component: string, dynamiclink: string): Promise<JQuery<HTMLElement> | null> {
    const _default: Unpromisify<ReturnType<typeof buildComponent>> = null;

    try {
        /*
            let componentDiv: HTMLElement | null = document.getElementById(component ? component : "ERROR");

            if (componentDiv !== null) {
                componentDiv.innerHTML = await fetchComponent(component);
            }

            return componentDiv as HTMLElement;
        */
        let componentDiv = $("#" + (component ? component : "ERROR")).html(
            await fetchComponent(component, dynamiclink),
        );

        return componentDiv;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function buildAlbum(dynamiclink: string, album: string, currentPage: string): Promise<void> {
    try {
        if (builtAlbums.includes(album)) {
            return;
        }

        const componentArray: ReadonlyArray<ReadonlyArray<string>> = splitArrayIntoParts(
            ((await getCategoryStills(dynamiclink, album)) as Readonly<Readonly<STILL>[]>).map(
                (still: Readonly<STILL>): string => /* HTML */ `
                    <img
                        id="still_${still.UID as number}"
                        src="${String(
                            createURL(`${dynamiclink}:8092/`, {
                                type: "img",
                                img: (still.UID as number).toString(),
                            } as URLParams),
                        )}"
                        class="albumImage"
                    />
                    <br />
                `,
            ),
            getRowCount(),
        ) as string[][];

        for (let i: number = 0; i < componentArray.length; i++) {
            $(`#${currentPage}`).append(
                $("<div>", {
                    class: `within-div-${i + 1}`,
                    id: `${currentPage}-within-div-${i + 1}`,
                })
                    .html(componentArray[i].join(/* HTML */ `<br />`))
                    .css({
                        flex: "1",
                        padding: "0px",
                        margin: "3px 2px 2px",
                    }),
            );
        }

        $(`#${currentPage}`).css({
            display: "flex",
            marginLeft: "10px",
            marginRight: "10px",
        });

        builtAlbums.push(album);
        // $(`#${currentPage}`).html("");
    } catch (e: unknown) {
        console.error(e);
    }
}

function getRowCount(): number {
    const screenWidth: number = window.innerWidth;

    if (screenWidth >= 1200) {
        return 5; // Desktop
    } else if (screenWidth >= 992) {
        return 4; // Laptop
    } else if (screenWidth >= 768) {
        return 3; // Smaller Laptop
    } else {
        return 1; // Anything less
    }
}

/*

async function buildAlbum(dynamiclink: string, album: string, currentPage: string): Promise<void> {
    try {
        $(`#${currentPage}`).html(
            ((await getCategorySessions(dynamiclink, album)) as Immutable2DArray<SESSION>)
                .map(
                    (session: Readonly<SESSION>): string => `
                        <div class="sessionContainer">
                            <img
                                id="session_${session.UID as number}"
                                src="${createURL(`${dynamiclink}:8092/`, {
                                    type: "img",
                                    img: (session.UID as number).toString(),
                                } as URLParams).toString()}"
                                class="sessionImage"
                                onclick="sessionClicked('${session.UID}')"
                            />

                            <span id="SessionNameSpan"> ${session.SESSION_DATE as string} </span>

                            <div id="session_${session.UID as number}-flyout-menu">
                                <!-- / -->
                            </div>
                        </div>
                    `,
                )
                .join(""),
        );
    } catch (e: unknown) {
        console.error(e);
    }
}

*/

/*

async function sessionClicked(sessionUID: string): Promise<void> {
    // window.location.href = `#gallery_${(session.UID as number).toString()}`;

    try {
        if (getPage().split("_")[0] !== "album") {
            return;
        }

        const dynamiclink: string = "@dynamiclink";

        const session: Readonly<SESSION> | undefined = (
            (await fetchSessions(dynamiclink)) satisfies Immutable2DArray<SESSION>
        ).find((session_: Readonly<SESSION>): boolean => session_.UID === parseInt(sessionUID));

        if (session == null || !session || session == undefined || typeof session !== "object") {
            return;
        }

        const stills: Immutable2DArray<STILL> = await (async (
            dynamiclink_: string,
            uid: number,
        ): Promise<Immutable2DArray<STILL>> => {
            const m_stills: Immutable2DArray<STILL> = (await getSessionImages(
                dynamiclink_,
                uid,
            )) as Immutable2DArray<STILL>;

            if (m_stills.length <= 4) {
                return m_stills;
            }

            return m_stills.slice(0, 4);
        })(dynamiclink, session.UID);


        const sessionUIDs: ReadonlyArray<number> = (
            await getCategorySessions(dynamiclink, getPage().split("_")[1])
        ).map((session_: Readonly<SESSION>): number => session_.UID);

        const previousSessionUID: number = ((
            sessionUIDs_: ReadonlyArray<number>,
            sessionUID_: number,
        ): number => {
            const index: number = sessionUIDs_.findIndex((val: number): boolean => val === sessionUID_);

            if (index === -1 || index > sessionUIDs_.length || index === 0) {
                return -1;
            }

            return sessionUIDs_[index - 1];
        })(sessionUIDs, parseInt(sessionUID));

        const followingSessionUID: number = ((
            sessionUIDs_: ReadonlyArray<number>,
            sessionUID_: number,
        ): number => {
            const index: number = sessionUIDs_.findIndex((val: number): boolean => val === sessionUID_);

            if (index === -1 || index + 1 === sessionUIDs_.length || index > sessionUIDs_.length) {
                return -1;
            }

            return sessionUIDs_[index + 1];
        })(sessionUIDs, parseInt(sessionUID));

    } catch (e: unknown) {
        console.error(e);
    }
}

*/

/*

async function buildGallery(dynamiclink: string, gallery: number, currentPage: string): Promise<void> {
    try {
        $(`#${currentPage}`).html(
            ((await getSessionImages(dynamiclink, gallery)) as Immutable2DArray<STILL>)
                .map(
                    (still: Readonly<STILL>): string => `
                        <img
                            id="${still.UID as number}"
                            src="${createURL(`${dynamiclink}:8092/`, {
                                type: "img",
                                img: (still.UID as number).toString(),
                            } as URLParams).toString()}"
                            class="albumImage"
                        />
                    `,
                )
                .join(""),
        );
    } catch (e: unknown) {
        console.error(e);
    }
}

*/

// --------------------------------------------------------------------------------------- Event functions:

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
            $("#homepage-navbar-div").css("height", "200px").css("margin-top", "100px");
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
    const _default: ReturnType<typeof hideDiv> = $();

    try {
        return $(`#${div}`).hide();
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function showDiv(div: string): JQuery<HTMLElement> {
    const _default: ReturnType<typeof showDiv> = $();

    try {
        return $(`#${div}`).show();
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
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

        if (
            !loadedGalleryAndSessionPages.includes(currentPage) &&
            !currentPage.startsWith("album_") &&
            !currentPage.startsWith("gallery_") &&
            !currentPage.split("").includes("_")
        ) {
            hideDiv("back-to-albums-div");

            return;
        }

        showDiv("back-to-albums-div");

        /*
        const imageUIDs: ReadonlyArray<number> = (await getSessionImages("@dynamiclink")).map(
            (still: Readonly<STILL>): number => still.UID,
        );
        */

        const type_: string = currentPage.split("_")[0];

        if (builtAlbums.includes(currentPage.split("_")[1])) {
            return;
        }

        if (type_ === "album") {
            await buildAlbum("@dynamiclink", currentPage.split("_")[1], currentPage);
        } else {
            // await buildGallery("@dynamiclink", parseInt(currentPage.split("_")[1]), currentPage);
        }

        loadedGalleryAndSessionPages.push(currentPage);
    } catch (e: unknown) {
        console.error(e);
    }
}

function createURL(link: string, params: URLParams): URL | undefined {
    const _default: ReturnType<typeof createURL> = undefined;

    try {
        const url: URL = new URL(`${link}`);

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                url.searchParams.set(key, params[key]);
            }
        }

        return url;
    } catch (e: unknown) {
        console.error(e);
        return _default;
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
        console.log(`changing to ${getLang(lang)}`);
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
        const url: URL = new URL(`${dynamiclink}:8095/`);
        url.searchParams.set("c", component);

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

async function fetchSessions(dynamiclink: string): Promise<Readonly<Readonly<SESSION>[]>> {
    const _default: Unpromisify<ReturnType<typeof fetchSessions>> = [] as Readonly<Readonly<SESSION>[]>;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "sessions" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<Readonly<SESSION>[]> = JSON.parse(
            JSON.stringify(await response.json()),
        ) satisfies Readonly<SESSION>[];

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic categories/albums data:", e);
        return _default;
    }
}

async function getCategoryStills(
    dynamiclink: string,
    category: string | number,
): Promise<Readonly<Readonly<STILL>[]>> {
    const _default: Unpromisify<ReturnType<typeof getCategoryStills>> = [] satisfies Readonly<
        Readonly<STILL>[]
    >;
    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "categoryImages" satisfies SelectRequestOption);
        url.searchParams.set("category", String(category));

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<STILL>[] = JSON.parse(
            JSON.stringify(await response.json()),
        ) as Readonly<STILL>[];

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic categories/albums data:", e);
        return _default;
    }
}

async function fetchCategories(dynamiclink: string): Promise<Readonly<CATEGORY>[]> {
    const _default: Unpromisify<ReturnType<typeof fetchCategories>> = [];

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "categories" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<CATEGORY>[] = JSON.parse(
            JSON.stringify(await response.json()),
        ) as Readonly<CATEGORY>[];

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic categories/albums data:", e);
        return _default;
    }
}

async function getHomepageCoverStills(dynamiclink: string): Promise<Readonly<Readonly<STILL>[]>> {
    const _default: Unpromisify<ReturnType<typeof getHomepageCoverStills>> = [];

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "frontPageCoverImageData" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: ReadonlyArray<STILL> = JSON.parse(
            JSON.stringify((await response.json()) as ReadonlyArray<STILL>),
        );

        return data;
    } catch (e: unknown) {
        console.error("An error occurred while trying to fetch dynamic front page cover images data:", e);
        return _default;
    }
}

async function getHomepageCoverImagesURLs(dynamiclink: string): Promise<ReadonlyArray<URL>> {
    const _default: Unpromisify<ReturnType<typeof getHomepageCoverImagesURLs>> = [];

    try {
        return ((arr: ReadonlyArray<URL>): ReadonlyArray<URL> => {
            return arr.length < 2 ? arr : [arr[arr.length - 1], ...arr.slice(1, arr.length - 1), arr[0]];
        })(
            (await getHomepageCoverStills(dynamiclink)).map((_: Readonly<STILL>, i: number): URL => {
                const url = new URL(`${dynamiclink}:8092/`);
                url.searchParams.set("type", "frontPageCoverImage");
                url.searchParams.set("img", `${i}`);

                return url;
            }),
        );
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function getSessionImages(dynamiclink: string, sessionUID: number): Promise<ReadonlyArray<STILL>> {
    const _default: Unpromisify<ReturnType<typeof getSessionImages>> = [] as ReadonlyArray<STILL>;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "sessionImages" satisfies SelectRequestOption);
        url.searchParams.set("session", sessionUID.toString());

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: ReadonlyArray<STILL> = JSON.parse(
            JSON.stringify(await response.json()),
        ) as ReadonlyArray<STILL>;

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function getCategorySessions(dynamiclink: string, category: string): Promise<ReadonlyArray<SESSION>> {
    const _default: Unpromisify<ReturnType<typeof getCategorySessions>> = [] as ReadonlyArray<SESSION>;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "categorySessions" satisfies SelectRequestOption);
        url.searchParams.set("category", category);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: ReadonlyArray<SESSION> = JSON.parse(
            JSON.stringify(await response.json()),
        ) as ReadonlyArray<SESSION>;

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function getPages(dynamiclink: string): Promise<ReadonlyArray<PageData>> {
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
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "pages" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: ReadonlyArray<PageData> = (await response.json()) as ReadonlyArray<PageData>;
        return data;
    } catch (error: unknown) {
        console.error("An error occurred while fetching dynamic page information data:", error);
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
