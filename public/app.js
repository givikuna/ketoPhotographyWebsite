const pages = [];
const builtAlbums = [];
let iterated = 0;

async function main(d = null, l = null, c = null) {
    const dynamiclink = d ? d : "ketojibladze.com";
    const language = l ? getLang(l) : "en";
    const contactemail = c ? c : "givitsvariani@proton.me";

    changeLang(language);
    navbar();

    let builtNavBar = await buildNavBar();
    let built = await buildApp()
        .then(updateApp)
        .then(() => {
            makeFooter();
        })
        .then(() => {
            navbar();
        })
        .then(updateApp)
        .then(() => {
            const navbars = ["navbar-div-phone", "homepage-navbar-div-phone"];
            for (let i = 0; i < navbars.length; i++) {
                let _ = buildHamburger(navbars[i]);
            }
        });
    if (builtNavBar && built) console.log("all loaded properly");
    else console.log("unknown errors found with loading");
}

async function populateHomepageWelcomeImages() {
    const m_images = [];
    const gottenImages = await fetchWelcomeImageData();
    for (let i = 1; i <= gottenImages.length; i++) {
        if (i === 3) {
            let temp = m_images[0];
            m_images[0] = m_images[1];
            m_images[1] = temp;
        }
        m_images.push(`@dynamiclink:8092/?type=welcome&img=${i}`);
    }
    return m_images;
}

async function fetchWelcomeImageData() {
    const url = "@dynamiclink:8094/?data=welcome";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred while fetching dynamic data:", error);
        return [
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
            {
                img: "6.jpeg",
                extension: "jpeg",
            },
        ];
    }
}

async function buildNavBar() {
    document.getElementById("navbar-div").innerHTML = await fetchComponent("navbar");
    document.getElementById("homepage-navbar-div").innerHTML = await fetchComponent("homepagenavbar");
}

function navbar(callingFromWindowSizeCheck = false) {
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

const getLang = (lang) => (lang === "ru" ? lang : lang === "ge" ? lang : "en");

async function nextHomepageImage() {
    let images = await populateHomepageWelcomeImages();
    if (iterated === images.length) {
        iterated = 0;
        document.querySelector("#homepage-navbar-div").style.backgroundImage = `url(${images[iterated++]})`;
    } else {
        document.querySelector("#homepage-navbar-div").style.backgroundImage = `url(${images[iterated++]})`;
    }
}

function changeLang(lang) {
    //
}

function makeFooter() {
    const footerHTML = /*HTML*/ `
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

function getPage() {
    const page = window.location.hash.slice(1);
    return page !== "" || pages.includes(page) ? page : "home";
}

async function getPages() {
    const url = "@dynamiclink:8094/?data=pages";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred while fetching dynamic data:", error);
        return null;
    }
}

async function buildApp() {
    const data = await getPages();
    for (let i = 0; i < data.length; i++) {
        let pageDiv = document.createElement("div");
        pageDiv.setAttribute("id", data[i].page ? data[i].page : "ERROR");
        pageDiv.setAttribute(
            "class",
            (() => {
                const pageID = data[i].page ? data[i].page : "ERROR";
                if (pageID.startsWith("album_")) {
                    return "albumPage";
                }
                return "webPage";
            })(),
        );
        $("#app").append(pageDiv);
        pages.push(data[i].page);
        let _ = await buildComponent(pageDiv.id);
        updateApp();
    }

    for (let i = 0; i < data.length; i++) {
        let _ = await buildPage(data[i].page);
    }

    return true;
}

async function createAlbum(album) {
    const albumComponent = await fetchComponent("inAlbum");
    const albumDiv = document.createElement("div");
    albumDiv.setAttribute("id", `album_${album}`);
    albumDiv.innerHTML = albumComponent;
    albumDiv.innerHTML += /*HTML*/ `
        <div class="inAlbumImages" id="${album}Gallery"> </div>
    `;
    $("#app").append(albumDiv);
}

async function buildPage(page) {
    switch (page) {
        case "home":
            const albumData = await fetchAlbumData();
            for (let i = 0; i < albumData.length; i++) {
                const element = /*HTML*/ `
                    <div class="imageContainer">
                        <img
                            src="@dynamiclink:8092/?type=cover&album=${albumData[i].album}"
                            onclick="window.location.href='#album_${albumData[i].album}'"
                            alt="Image ${i}"
                            id="${albumData[i].album}AlbumCoverForHome"
                        >
                        <span id="${albumData[i].album}AlbumCoverForHomeSpan">
                            ${albumData[i].album}
                        </span>
                    </div>
                `;
                $("#album-gallery").append(element);

                let _ = await createAlbum(albumData[i].album);

                pages.push(`album_${albumData[i].album}`);
            }
            break;
    }
}

async function fetchAlbumData() {
    const _default = [
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

    const url = "@dynamiclink:8094/?data=albumData";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred while fetching dynamic data:", error);
        return _default;
    }
}

async function buildAlbum(currentPage) {
    if (!currentPage.startsWith("album_")) return;

    if (builtAlbums.includes(currentPage)) return;

    const currentAlbum = currentPage.replace(/album_/g, "");
    const albumImages = await getAlbum(currentAlbum);
    for (let i = 0; i < albumImages.images.length; i++) {
        $(`#${currentPage.replace(/album_/g, "")}Gallery`).append(/*HTML*/ `
            <img class="albumImage" id="${currentAlbum}Image${i}" src="@dynamiclink:8092/?type=album&img=${i}&album=${currentAlbum}">
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
        `);
    }
    builtAlbums.push(currentPage);
    document.getElementById(currentPage).innerHTML += /*HTML*/ `
        <br>
        <br>
        <br>
    `;
}

async function updateApp() {
    navbar();
    const currentPage = pages.length > 0 && pages.includes(getPage()) ? getPage() : "home";
    for (let i = 0; i < pages.length; i++) {
        if (currentPage === pages[i]) {
            showDiv(pages[i]);
        } else {
            hideDiv(pages[i]);
        }
    }

    await buildAlbum(currentPage);
}

async function getAlbum(currentAlbum) {
    const albumData = await fetchAlbumData();
    for (let i = 0; i < albumData.length; i++) {
        if (albumData[i].album === currentAlbum) {
            return albumData[i];
        }
    }
    return albumData[0];
}

function hideDiv(div) {
    $(`#${div}`).hide();
}

function showDiv(div) {
    $(`#${div}`).show();
}

async function fetchComponent(component) {
    try {
        const response = await fetch(`@dynamiclink:8095/?c=${component}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return "";
    }
}

function hamburgerClick(from) {
    alert(`clicked on the hamburger from ${from}`);
}

function buildHamburger(div) {
    const newNavbar = /*HTML*/ `
        <div class="hamburger-navbar" id="inside-${div}">
            <div class="navbar">
                <div id="inside-hamburger-wrapper-for-${div}">
                    <a id="navbar-home-option" href="#home">Home</a>
                    <a id="navbar-contact-option" href="#contact">Contact</a>
                    <a id="navbar-about-option" href="#about">About</a>
                    <a id="navbar-pricing-option" href="#pricing">Pricing</a>
                    <a id="navbar-blog-option" href="#blog">Blog</a>
                    <a id="navbar-albums-option" href="#albums">Albums</a>
                </div>
                <div class="hamburger" onclick="hamburgerClick('${div}')">&#9776;</div>
            </div>
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
}

function resizeNavBar() {
    const navbars = ["navbar-div", "homepage-navbar-div"];
    for (let i = 0; i < navbars.length; i++) {
        $(`#${navbars[i]}`).hide();
    }
    if (getPage() === "home") {
        hideDiv("navbar-div-phone");
        showDiv("homepage-navbar-div-phone");
    } else {
        showDiv("navbar-div-phone");
        hideDiv("homepage-navbar-div-phone");
    }
}

async function buildComponent(component) {
    let componentDiv = document.getElementById(component ? component : "ERROR");
    componentDiv.innerHTML = await fetchComponent(component);
    return componentDiv;
    windowSizeCheck;
}

function windowSizeCheck() {
    if (window.innerWidth <= 768) {
        resizeNavBar();
        return true;
    } else {
        hideDiv("navbar-div-phone");
        hideDiv("homepage-navbar-div-phone");
        if (getPage() === "home") {
            showDiv("homepage-navbar-div");
        } else {
            showDiv("navbar-div");
        }
        return false;
    }
}

window.addEventListener("hashchange", updateApp);

setInterval(function () {
    if (getPage() === "home") nextHomepageImage();
}, 10000);

window.addEventListener("resize", windowSizeCheck);
