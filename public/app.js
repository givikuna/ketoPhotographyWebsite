const pages = [];
let iterated = 0;

let dynamiclink;
let language;
let contactemail;

async function main(d, l, c) {
    dynamiclink = d ? d : 'ketojibladze.com';
    language = l ? getLang(l) : 'en';
    contactemail = c ? c : 'givitsvariani@proton.me';

    changeLang(language);
    navbar();

    let builtNavBar = await buildNavBar();
    let built = await buildApp().then(updateApp).then(() => {
        footer();
    }).then(() => {
        navbar();
    });
}

async function populateImages() {
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
    const url = '@dynamiclink:8094/?data=welcome';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching dynamic data:', error);
        return [
            {
                img: "1.jpeg",
                extension: "jpeg"
            },
            {
                img: "2.jpeg",
                extension: "jpeg"
            },
            {
                img: "3.jpeg",
                extension: "jpeg"
            },
            {
                img: "4.jpeg",
                extension: "jpeg"
            },
            {
                img: "5.jpeg",
                extension: "jpeg"
            },
            {
                img: "6.jpeg",
                extension: "jpeg"
            }
        ];
    }
}

async function buildNavBar() {
    document.getElementById('navbar-div').innerHTML = await fetchComponent('navbar');
    document.getElementById('homepage-navbar-div').innerHTML = await fetchComponent('homepagenavbar');
}

function navbar() {
    if (getPage() === 'home') {
        document.getElementById('navbar-div').style.display = 'none';
        document.getElementById('homepage-navbar-div').style.display = 'block';
    } else {
        document.getElementById('homepage-navbar-div').style.display = 'none';
    }
}

const getLang = lang => lang === 'ru' ? lang : (lang === 'ge' ? lang : 'en');

async function nextImage() {
    let images = await populateImages();
    if (iterated === images.length) {
        iterated = 0;
        document.querySelector('#homepage-navbar-div').style.backgroundImage = `url(${images[iterated]})`;
        iterated++;
    } else {
        document.querySelector('#homepage-navbar-div').style.backgroundImage = `url(${images[iterated]})`;
        iterated++;
    }
}

function changeLang(lang) {
    //
}

function footer() {
    document.getElementById('footer-div').style.display = 'block';
    document.getElementById('footer-div').innerHTML = `
    <footer>
        <a href="https://www.facebook.com"><img src="@dynamiclink:8092/?type=icons&img=facebook" alt="Facebook"
                class="imagee_"></a>
        <a href="https://www.flickr.com"><img src="@dynamiclink:8092/?type=icons&img=flickr" alt="Flickr"
                class="imagee_"></a>
        <a href="https://www.instagram.com"><img src="@dynamiclink:8092/?type=icons&img=instagram" alt="Instagram"
                class="imagee_"></a>
        <a href="https://www.pinterest.com"><img src="@dynamiclink:8092/?type=icons&img=pinterest" alt="Pinterest"
                class="imagee_"></a>
        <a href="https://www.youtube.com"><img src="@dynamiclink:8092/?type=icons&img=youtube" alt="YouTube"
                class="imagee_"></a>

        <br>
        <br>

        <div>
            <p>
                <a href="#contact" class="contact-link">
                    Contact Me
                </a>
            </p>
        </div>
    </footer>

    <br>
    <br>
    `;
}

function getPage() {
    const page = window.location.hash.slice(1);
    return (page !== '' || pages.includes(page)) ? page : 'home';
};

async function getPages() {
    const url = '@dynamiclink:8094/?data=pages';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching dynamic data:', error);
        return null;
    }
}

async function buildApp() {
    const data = await getPages();
    for (let i = 0; i < data.length; i++) {
        let pageDiv = document.createElement('div');
        pageDiv.setAttribute('id', data[i].page ? data[i].page : 'ERROR');
        document.getElementById('app').appendChild(pageDiv);
        pages.push(data[i].page);
        let _1 = await buildComponent(pageDiv.id);
        let _2 = buildPage(pageDiv.id);
    }
    return true;
}

async function buildPage(page) {
    switch (page) {
        case 'home':
            const albumData = await fetchAlbumData();
            for (let i = 0; i < albumData.length; i++) {
                const element = `
                    <img src="@dynamiclink:8092/?type=cover&album=${albumData[i].album}" alt="Image ${i}" id="${albumData[i].album}AlbumCover">
                `;
                document.getElementById('album-gallery').innerHTML += element;
            }
            break;
        default:
            buildComponent(page);
    }
}

async function fetchAlbumData() {
    const _default = [
        {
            "album": "newborns",
            "coverImage": "294546948_760020545155998_2532217280930973580_n.jpeg",
            "images": [],
            "display": "Newborns"
        },
        {
            "album": "families",
            "coverImage": "119904284_176645870748396_1710356227522994443_n.jpeg",
            "images": [],
            "display": "Families"
        },
        {
            "album": "advertisements",
            "coverImage": "326988248_695766632214878_1398532937315296194_n.jpeg",
            "images": [],
            "display": "Advertisements"
        },
        {
            "album": "portraits",
            "coverImage": "313259401_838576830633702_7727858395197320125_n.jpeg",
            "images": [],
            "display": "Portraits"
        },
        {
            "album": "weddings",
            "coverImage": "275321951_506245004455146_138720927218083306_n.jpeg",
            "images": [],
            "display": "Weddings"
        },
        {
            "album": "business",
            "coverImage": "323284989_1161493651165139_5280267032390652084_n.jpeg",
            "images": [],
            "display": "Business"
        }
    ]
    const url = "http://127.0.0.1:8094/?data=albumData";
    const response = await fetch(url);
    const data = await response.text();
    alert(data)
    return _default
    /*
    const url = '@dynamiclink:8094/?data=albumData';
    try {
        const response = await fetch(url);
        const data = await response.text();
        return JSON.parse(data);
    } catch (error) {
        console.error('An error occurred:', error);
        return _default;
    }
    */
}

function updateApp() {
    navbar();
    const currentPage = pages.length > 0 ? (pages.includes(getPage()) ? getPage() : 'home') : 'home';
    for (let i = 0; i < pages.length; i++) {
        if (currentPage === pages[i]) {
            showPage(pages[i]);
        } else {
            hidePage(pages[i]);
        }
    }
}

function hidePage(page) {
    document.getElementById(page).style.display = 'none';
}

function showPage(page) {
    document.getElementById(page).style.display = 'block';
}

async function fetchComponent(component) {
    try {
        const response = await fetch(`@dynamiclink:8095/?c=${component}`);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return ''
    }
}

async function buildComponent(component) {
    let componentDiv = document.getElementById(component ? component : 'ERROR');
    componentDiv.innerHTML = await fetchComponent(component);
    return componentDiv;
}

window.addEventListener('hashchange', updateApp);

setInterval(function () {
    if (getPage() === 'home') nextImage();
}, 10000);
