const pages = [];

async function main(d, l, c) {
    const dynamiclink = d ? d : 'ketojibladze.com';
    const language = l ? getLang(l) : 'en';
    const contactemail = c ? c : 'givitsvariani@proton.me';

    changeLang(language);

    let built = await buildApp().then(updateApp).then(() => {
        footer(dynamiclink);
    });
}

const getLang = lang => lang === 'ru' ? lang : (lang === 'ge' ? lang : 'en');

window.addEventListener('hashchange', function () {
    updateApp();
});

function changeLang(lang) {
    //
}

function footer(dynamiclink) {
    document.getElementById('footer_div').style.display = 'block';
    document.getElementById('footer_div').innerHTML = `
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

const getPage = () => window.location.hash.slice(1);

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

async function getComponent(component) {
    try {
        const response = await fetch(`@dynamiclink:8095/?c=${component}`);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function buildComponent(component) {
    let componentDiv = document.getElementById(component ? component : 'ERROR');
    componentDiv.innerHTML = await getComponent(component);
    return componentDiv;
}
