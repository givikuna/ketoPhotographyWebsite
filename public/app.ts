type FrontPageCoverImage = {
    img: string;
    extension: string;
};

type PageData = {
    type: string;
    page: string;
    display: string;
    subpages: (PageData | string)[];
    components: string[];
};

type AlbumData = {
    album: string;
    coverImage: string;
    images: string[];
    display: string;
};

type Unpromisify<T> = T extends Promise<infer U> ? U : T;

const pages: string[] = [];
const builtAlbums: string[] = [];
let iterated: number = 0;
let previousPage: string = "";

async function main(
    d: Readonly<string | null> = null,
    l: Readonly<string | null> = null,
    c: Readonly<string | null> = null,
): Promise<void> {
    const dynamiclink: Readonly<typeof d> = d ? d : "ketojibladze.com";
    const language: Readonly<typeof l> = l ? getLang(l) : "en";
    const contactemail: Readonly<typeof c> = c ? c : "givitsvariani@proton.me";
    try {
        previousPage = getPage();

        changeLang(language);
        navbar();

        let _: void = await buildNavBar()
            .then(buildApp)
            .then(updateApp)
            .then(makeFooter)
            .then(() => {
                navbar();
            })
            .then(updateApp)
            .then(() => {
                const navbars: string[] = ["navbar-div-phone", "homepage-navbar-div-phone"];
                for (let i: number = 0; i < navbars.length; i++) {
                    let _ = buildHamburger(navbars[i]);
                }
            })
            .then(() => {
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

async function populateHomepageWelcomeImages(): Promise<string[]> {
    const _default: Unpromisify<ReturnType<typeof populateHomepageWelcomeImages>> = [];
    try {
        const m_images: string[] = [];
        const gottenImages: FrontPageCoverImage[] = await fetchWelcomeImageData();
        for (let i = 1; i <= gottenImages.length; i++) {
            if (i === 3) {
                let temp: string = m_images[0];
                m_images[0] = m_images[1];
                m_images[1] = temp;
            }
            m_images.push(`@dynamiclink:8092/?type=welcome&img=${i}`);
        }
        return m_images;
    } catch (e) {
        console.error(e);
        return _default;
    }
}

async function fetchWelcomeImageData(): Promise<FrontPageCoverImage[]> {
    const _default: Unpromisify<ReturnType<typeof fetchWelcomeImageData>> = [
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
    ];
    try {
        const url: string = "@dynamiclink:8094/?data=welcome";
        const response: Response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: FrontPageCoverImage[] = (await response.json()) as FrontPageCoverImage[];
        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic data:", e);
        return _default;
    }
}

async function buildNavBar(): Promise<void> {
    const navbar_div: HTMLElement | null = document.getElementById("navbar-div");
    const homepage_navbar_div: HTMLElement | null = document.getElementById("homepage-navbar-div");

    if (navbar_div == null || homepage_navbar_div == null) {
        return;
    }

    navbar_div.innerHTML += await fetchComponent("navbar");
    homepage_navbar_div.innerHTML += await fetchComponent("homepagenavbar");
}

function navbar(callingFromWindowSizeCheck: boolean = false): void {
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
}

function getLang(lang: string): string {
    return lang === "ru" ? lang : lang === "ge" ? lang : "en";
}

async function nextHomepageImage(): Promise<void> {
    let images: string[] = await populateHomepageWelcomeImages();
    const homepage_navbar_div: HTMLDivElement | null =
        document.querySelector("#homepage-navbar-div");

    if (homepage_navbar_div == null) {
        return;
    }

    if (iterated === images.length) {
        iterated = 0;
        homepage_navbar_div.style.backgroundImage = `url(${images[iterated++]})`;
    } else {
        homepage_navbar_div.style.backgroundImage = `url(${images[iterated++]})`;
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

function makeFooter(): void {
    const footerHTML: string = /*HTML*/ `
        <footer>
            <a href="https://www.facebook.com"><img src="@dynamiclink:8092/?type=icons&img=facebook" alt="Facebook"
                    class="SocialMediaIcon"></a>
            <a href="https://www.flickr.com"><img src="@dynamiclink:8092/?type=icons&img=flickr" alt="Flickr"
                    class="SocialMediaIcon"></a>
            <a href="https://www.instagram.com"><img src="@dynamiclink:8092/?type=icons&img=instagram" alt="Instagram"
                    class="SocialMediaIcon"></a>
            <a href="https://www.pinterest.com"><img src="@dynamiclink:8092/?type=icons&img=pinterest" alt="Pinterest"
                    class="SocialMediaIcon"></a>
            <a href="https://www.youtube.com"><img src="@dynamiclink:8092/?type=icons&img=youtube" alt="YouTube"
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
    `;
    $("#footer-div").show().append(footerHTML);
}

function getPage(): string {
    const page: string = window.location.hash.slice(1);
    return page !== "" || pages.includes(page) ? page : "home";
}

async function getPages(): Promise<PageData[]> {
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
    ];
    try {
        const url = "@dynamiclink:8094/?data=pages";
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: PageData[] = (await response.json()) as PageData[];
        return data;
    } catch (error: unknown) {
        console.error("An error occurred while fetching dynamic data:", error);
        return _default;
    }
}

async function buildApp(): Promise<boolean> {
    const _default: Unpromisify<ReturnType<typeof buildApp>> = false;
    try {
        const data: PageData[] = await getPages();
        for (let i: number = 0; i < data.length; i++) {
            let pageDiv: HTMLDivElement = document.createElement("div");
            pageDiv.setAttribute("id", data[i].page ? data[i].page : "ERROR");
            pageDiv.setAttribute(
                "class",
                (() => {
                    const pageID: string = data[i].page ? data[i].page : "ERROR";
                    if (pageID.startsWith("album_")) {
                        return "albumPage";
                    }
                    return "webPage";
                })(),
            );
            let _: JQuery<HTMLElement> = $("#app").append(pageDiv);
            pages.push(data[i].page);
            let _2: HTMLElement | null = await buildComponent(pageDiv.id);

            updateApp();
        }

        for (let i: number = 0; i < data.length; i++) {
            let _: void = await buildPage(data[i].page);
        }

        return true;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

async function createAlbum(album: string): Promise<void> {
    try {
        const albumDiv: HTMLDivElement = document.createElement("div");
        albumDiv.setAttribute("id", `album_${album}`);
        albumDiv.innerHTML +=
            (await fetchComponent("inAlbum")) +
            /*HTML*/ `
                <div class="inAlbumImages" id="${album}Gallery"> </div>
            `;

        let _: JQuery<HTMLElement> = $("#app").append(albumDiv);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildPage(page: string): Promise<void> {
    try {
        switch (page) {
            case "home":
                const albumData = await fetchAlbumData();
                for (let i = 0; i < albumData.length; i++) {
                    const element = /*HTML*/ `
                        <div class="imageContainer">
                            <img
                                src="@dynamiclink:8092/?type=cover&album=${albumData[i].album}"
                                onclick="window.location.href='#album_${albumData[i].album}'"
                                class="albumCoverImage"
                                alt="Image ${i}"
                                id="${albumData[i].album}AlbumCoverForHome"
                            >
                            <span id="${albumData[i].album}AlbumCoverForHomeSpan">
                                ${albumData[i].album}
                            </span>
                        </div>
                    `;
                    let _: JQuery<HTMLElement> = $("#album-gallery").append(element);

                    await createAlbum(albumData[i].album);

                    pages.push(`album_${albumData[i].album}`);
                }
                break;
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

async function fetchAlbumData(): Promise<AlbumData[]> {
    const _default: Unpromisify<ReturnType<typeof fetchAlbumData>> = [
        {
            album: "newborns",
            coverImage: "294546948_760020545155998_2532217280930973580_n.jpeg",
            images: [],
            display: "Newborns",
        },
        {
            album: "families",
            coverImage: "119904284_176645870748396_1710356227522994443_n.jpeg",
            images: [],
            display: "Families",
        },
        {
            album: "advertisements",
            coverImage: "326988248_695766632214878_1398532937315296194_n.jpeg",
            images: [],
            display: "Advertisements",
        },
        {
            album: "portraits",
            coverImage: "313259401_838576830633702_7727858395197320125_n.jpeg",
            images: [],
            display: "Portraits",
        },
        {
            album: "weddings",
            coverImage: "275321951_506245004455146_138720927218083306_n.jpeg",
            images: [],
            display: "Weddings",
        },
        {
            album: "business",
            coverImage: "323284989_1161493651165139_5280267032390652084_n.jpeg",
            images: [],
            display: "Business",
        },
    ];

    try {
        const url: string = "@dynamiclink:8094/?data=albumData";
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: AlbumData[] = (await response.json()) as AlbumData[];
        return data;
    } catch (e: unknown) {
        console.error("An error occurred while fetching dynamic data:", e);
        return _default;
    }
}

async function buildAlbum(currentPage: string): Promise<void> {
    try {
        if (!currentPage.startsWith("album_") || builtAlbums.includes(currentPage)) {
            return;
        }

        const currentAlbum: string = currentPage.replace(/album_/g, "");
        const albumImages: AlbumData = await getAlbum(currentAlbum);
        for (let i = 0; i < albumImages.images.length; i++) {
            let _: JQuery<HTMLElement> = $(`#${currentPage.replace(/album_/g, "")}Gallery`)
                .append(/*HTML*/ `
                    <img class="albumImage" id="${currentAlbum}Image${i}" src="@dynamiclink:8092/?type=album&img=${i}&album=${currentAlbum}">
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                `);
        }
        builtAlbums.push(currentPage);

        let _: JQuery<HTMLElement> = $(`#${currentPage}`).append(`
            <br>
            <br>
            <br>
        `);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function updateApp(): Promise<void> {
    try {
        navbar(true);
        const currentPage = pages.length > 0 && pages.includes(getPage()) ? getPage() : "home";
        for (let i = 0; i < pages.length; i++) {
            if (currentPage === pages[i]) {
                showDiv(pages[i]);
            } else {
                hideDiv(pages[i]);
            }
        }

        await buildAlbum(currentPage);
    } catch (e: unknown) {
        console.error(e);
    }
}

async function getAlbum(currentAlbum: string): Promise<AlbumData> {
    const _default: Unpromisify<ReturnType<typeof getAlbum>> = {
        album: "newborns",
        coverImage: "294546948_760020545155998_2532217280930973580_n.jpeg",
        images: [],
        display: "Newborns",
    };
    try {
        const albumData: AlbumData[] = await fetchAlbumData();
        for (let i: number = 0; i < albumData.length; i++) {
            if (albumData[i].album === currentAlbum) {
                return albumData[i];
            }
        }

        return albumData[0];
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

async function fetchComponent(component: string): Promise<string> {
    const _default: Unpromisify<ReturnType<typeof fetchComponent>> = "";
    try {
        const url: string = `@dynamiclink:8095/?c=${component}`;
        const response: Response = await fetch(url);

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

function toggleCurrentHamburgerNavbar(currentNavbarID: string): void {
    try {
        const $navbarDiv: JQuery<HTMLElement> = $(`#${currentNavbarID}`);
        const isHidden: boolean = $navbarDiv.is(":hidden");

        if (isHidden) {
            $navbarDiv.css("margin-top", "40px");
            $navbarDiv.slideDown("fast");
        } else {
            $navbarDiv.css("margin-top", "0");
            $navbarDiv.toggle();
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

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

function hamburgerClick(from: string): void {
    try {
        const currentNavbarID: string = `hamburger-navbar-for-${from}`;
        toggleCurrentHamburgerNavbar(currentNavbarID);

        if (!$(`#${currentNavbarID}`).is(":hidden")) {
            let _: JQuery<HTMLElement> = $("#homepage-navbar-div").css("margin-top", "300px");
            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                let _2: JQuery<HTMLElement> = $(`#app`).css("margin-top", "300px");
            }
        } else {
            let _: JQuery<HTMLElement> = $("#homepage-navbar-div").css("margin-top", "100px");
            if (currentNavbarID === "hamburger-navbar-for-navbar-div-phone") {
                let _2: JQuery<HTMLElement> = $(`#${getPage()}`).css("margin-top", "100px");
            }
        }

        if (getPage() !== "home") {
            $("#app").css("margin-top", "100px");
        }
    } catch (e: unknown) {
        console.error(e);
    }
}

function buildHamburger(div: string): void {
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
                    <img src="@dynamiclink:8092/?type=logo" class="navbar-logo-phone" />
                </a>
            </div>
        `;

        let _: JQuery<HTMLElement> = $(`#${div}`).append(newNavbar);
        let _2: JQuery<HTMLElement> = $(`#inside-hamburger-wrapper-for-${div}`).hide();
        if (div === "navbar-div-phone") {
            let _3: JQuery<HTMLElement> = $(`#${div}`).append(/*HTML*/ `
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

function changeNavbarForSmallDisplays(): void {
    try {
        let _: JQuery<HTMLElement> = $("#navbar-div").hide();

        if (getPage() === "home") {
            hideDiv("navbar-div-phone");
            showDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            showDiv("homepage-navbar-div");
            let _2: JQuery<HTMLElement> = $("#homepage-navbar-div").css("height", "200px");
            let _3: JQuery<HTMLElement> = $("#homepage-navbar-div").css("margin-top", "100px");
        } else {
            showDiv("navbar-div-phone");
            hideDiv("homepage-navbar-div-phone");
            hideDiv("homepagenavbar-container");
            hideDiv("homepage-navbar-div");
            let _2: JQuery<HTMLElement> = $("#app").css("margin-top", "100px");
        }
        hideDiv("homepage-navbar-logo-container");
    } catch (e: unknown) {
        console.error(e);
    }
}

async function buildComponent(component: string): Promise<HTMLElement | null> {
    const _default: Unpromisify<ReturnType<typeof buildComponent>> = null;
    try {
        let componentDiv: HTMLElement | null = document.getElementById(
            component ? component : "ERROR",
        );

        if (componentDiv !== null) {
            componentDiv.innerHTML = await fetchComponent(component);
        }

        return componentDiv as HTMLElement;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function windowSizeCheck(): boolean {
    const _default: ReturnType<typeof windowSizeCheck> = false;
    try {
        if (window.innerWidth <= 768) {
            changeNavbarForSmallDisplays();
            return true;
        }

        let _: JQuery<HTMLElement> = $("#homepage-navbar-div").css("height", "100%");
        let _2: JQuery<HTMLElement> = $("#homepage-navbar-div").css("margin-top", "0%");
        hideDiv("navbar-div-phone");
        hideDiv("homepage-navbar-div-phone");
        if (getPage() === "home") {
            showDiv("homepagenavbar-container");
            showDiv("homepage-navbar-div");
            showDiv("homepage-navbar-logo-container");
        } else {
            showDiv("navbar-div");
        }
        let _3: JQuery<HTMLElement> = $("#app").css("margin-top", "0px");

        return false;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function inPhoneMode() {
    if (window.innerWidth <= 768) {
        return true;
    }
    return false;
}

function hashchange(): () => void {
    return (): void => {
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
                let _: JQuery<HTMLElement> = $("#app").css("margin-top", "100px");
            }
        } else {
            if (getPage() === "home") {
                showDiv("homepagenavbar-container");
            } else {
                showDiv("navbar-div");
            }
            let _: JQuery<HTMLElement> = $("#app").css("margin-top", "0px");
        }

        previousPage = getPage();
    };
}

window.addEventListener("hashchange", hashchange());

setInterval(function () {
    if (getPage() === "home") nextHomepageImage();
}, 10000);

window.addEventListener("resize", windowSizeCheck);
