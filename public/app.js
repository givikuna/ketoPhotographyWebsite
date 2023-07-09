const pages = [];
const images = [
    "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/246018913_426724492407198_4330767959258349349_n.jpg?_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=dorQQJ_hKqwAX_RFhlb&_nc_ht=scontent-lga3-2.xx&oh=00_AfCTnMJXMd17OvdKUaou2RDlGPjykVn3cCQRqt5fIx-Tqg&oe=64A7D19A",
    "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/117320521_161346885611628_9134533897020980342_n.jpg?_nc_cat=110&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=ONpgsE2QX5EAX-RR_ff&_nc_oc=AQnZwQV3qYbancpufTeQYDsDuKYEVufYBgwj1On07ouDHeNSx0yfNkETY8U93gdAvE4&_nc_ht=scontent-lga3-1.xx&oh=00_AfDnE-ne0lqOIt8NkkpcguY90qQflIoO1BnFPE8I7_srDg&oe=64CADDFB",
    "https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/349984376_255579210458984_8220216849840623738_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=dImWWWClD3EAX-fVqcl&_nc_ht=scontent-lga3-1.xx&oh=00_AfAZNVAXCm9gW30JYxyELrlp59TJxdAYvNV05QlbkpaHtg&oe=64A84DB4",
    "https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/326988248_695766632214878_1398532937315296194_n.jpg?_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=kO1R2ek6XP4AX-NxGmJ&_nc_ht=scontent-lga3-2.xx&oh=00_AfDpBZCf2Z7Vj6ae15U2r5_qsxZ8-VkhFPcQxHC7k7g2rA&oe=64A77D6E"
];
let iterated = 0;

async function main(d, l, c) {
    const dynamiclink = d ? d : 'ketojibladze.com';
    const language = l ? getLang(l) : 'en';
    const contactemail = c ? c : 'givitsvariani@proton.me';

    changeLang(language);
    navbar();

    let builtNavBar = await buildNavBar();
    let built = await buildApp().then(updateApp).then(() => {
        footer(dynamiclink);
    }).then(() => {
        navbar();
    });
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

window.addEventListener('hashchange', function () {
    updateApp();
});

setInterval(changeBackgroundImage, 10000);

function changeBackgroundImage() {
    if (getPage() === 'home')
        nextImage();
}

function nextImage() {
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

function footer(dynamiclink) {
    document.getElementById('footer-div').style.display = 'block';
    document.getElementById('footer-div').innerHTML = `
    <footer>
        <a href="https://www.facebook.com"><img src="${dynamiclink}:8092/?type=icons&img=facebook" alt="Facebook"
                class="imagee_"></a>
        <a href="https://www.flickr.com"><img src="${dynamiclink}:8092/?type=icons&img=flickr" alt="Flickr"
                class="imagee_"></a>
        <a href="https://www.instagram.com"><img src="${dynamiclink}:8092/?type=icons&img=instagram" alt="Instagram"
                class="imagee_"></a>
        <a href="https://www.pinterest.com"><img src="${dynamiclink}:8092/?type=icons&img=pinterest" alt="Pinterest"
                class="imagee_"></a>
        <a href="https://www.youtube.com"><img src="${dynamiclink}:8092/?type=icons&img=youtube" alt="YouTube"
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
        let _ = buildComponent(pageDiv.id);
    }
    return true;
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
        throw error;
    }
}

async function buildComponent(component) {
    let componentDiv = document.getElementById(component ? component : 'ERROR');
    componentDiv.innerHTML = await fetchComponent(component);
    return componentDiv;
}
