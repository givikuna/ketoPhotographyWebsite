const pages = [];

function main(d, l, c) {
    const dynamiclink = d ? d : 'ketojibladze.com';
    const language = l ? getLang(l) : 'en';
    const contactemail = c ? c : 'givitsvariani@proton.me';

    changeLang(language);

    buildApp();
}

const getLang = lang => lang === 'ru' ? lang : (lang === 'ge' ? lang : 'en');

window.addEventListener('hashchange', function () {
    updateApp();
});

function changeLang(lang) {
    //
}

const getPage = () => window.location.hash.slice(1);

async function buildApp() {
    fetch('@dynamiclink:8094/?data=pages').then(response => response.json()).then(data => {
        nav_bar();
        footer();
        for (let i = 0; i < lengthOf(data); i++) {
            let pageDiv = document.createElement('div');
            pageDiv.setAttribute('id', data[i].page ? data[i].page : 'ERROR');
            document.getElementById('app').appendChild(pageDiv);
            buildComponent(pageDiv.id);
            if (data[i].components.length > 0) {
                for (let j = 0; j < data[i].components.length; j++) {
                    let componentDiv = document.createElement('div');
                    componentDiv.setAttribute("id", data[i].components[j] ? data[i].components[j] : 'ERROR');
                    pageDiv.appendChild(componentDiv);
                    buildComponent(componentDiv.id);
                }
            }
        }
    }).then(() => {
        updateApp();
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
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

const lengthOf = (l) => l.length;

async function buildComponent(component) {
    let componentDiv = document.getElementById(component ? component : 'ERROR');
    fetch(`@dynamiclink:8095/?c=${component}`).then(response => response.text()).then(data => {
        componentDiv.innerHTML = data;
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
}

function nav_bar() {
    fetch('@dynamiclink:8095/?c=navbar').then(response => response.text()).then(data => {
        let div_ = document.getElementById('navbar_div');
        div_.innerHTML = data;
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
}

function footer() {
    fetch('@dynamiclink:8095/?c=footer').then(response => response.text()).then(data => {
        let div_ = document.getElementById('footer_div');
        div_.innerHTML = data;
    }).catch(error => {
        console.error(`Error: ${error}`);
    });
}
