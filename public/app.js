function main(d, l, c) {
    const dynamiclink = d;
    const language = l;
    const contactemail = c;
    buildApp();
    buildNavBar();
}

function changePage(page) {
    //
}

function changeLang(lang) {
    //
}

function buildNavBar() {
    fetch('@dynamiclink:8095/?c=navbar&t=html').then(response => response.text()).then(htmlCode => {
        document.getElementById('navbar').innerHTML = htmlCode;
        build_nav_bar();
    });
}

function buildApp() {
    fetch('@dynamiclink:8094/?data=pages').then(response => response.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
            let pageDiv = document.createElement('div');
            pageDiv.setAttribute('id', data[i].page);
            document.getElementById('app').appendChild(pageDiv);
            if (data[i].subpages !== 0) {
                for (let j = 0; j < data[i].subpages.length; j++) {
                    let subpageDiv = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].subpages[j].page);
                    document.getElementById('app').appendChild(subpageDiv);
                }
            } else if ('dropdownItems' in data[i]) {
                for (let j = 0; j < data[i].dropdownItems.length; j++) {
                    let subpageDiv = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].dropdownItems[j].page);
                    document.getElementById('app').appendChild(subpageDiv);
                }
            }
        }
    });
}

function isJSON(obj) {
    try {
        JSON.parse(obj);
        return true;
    } catch (e) {
        return false;
    }
}

function build_nav_bar() {
    fetch('@dynamiclink:8094/?data=pages')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].type == "page") {
                    let content = "<li class=\"nav-item\"><a class=\"nav-link\" href=\"#@CURRENTPAGE\" onclick=\"changePage(\'@CURRENTPAGE\')\">@CURRENTDISPLAY</a></li>";
                    document.getElementById('navbarSupportedContent').innerHTML += content.replace(/@CURRENTPAGE/g, data[i].page).replace(/@CURRENTDISPLAY/g, data[i].display);
                } else if (data[i].type == "dropdown") {
                    let content = "<div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">@DROPDOWNS</div>";
                    let dropdowns = "";
                    for (let j = 0; j < data[i].dropdownItems.length; j++) {
                        const PAGE = data[i].dropdownItems[j].page;
                        const DISPLAY = data[i].dropdownItems[j].display;
                        dropdowns += "<a class=\"dropdown-item\" onclick=\"changePage(" + PAGE + ") href=\"#" + PAGE + "\">" + DISPLAY + "</a>";
                    }
                    document.getElementById('navbarSupportedContent').innerHTML += content.replace(/@DROPDOWNS/g, dropdowns);
                }
            }
            fetch('dynamiclink:8094/?data=languages').then(response2 => response2.json()).then(data2 => {
                let languagesComponent = "";
                for (let i = 0; i < data2.length; i++) {
                    languagesComponent += "<a class=\"dropdown-item\" onclick=\"changeLang(\'" + data2[i].lang + "\')>" + data2[i].display + "</a>";
                }
                document.getElementById('navbarSupportedContent').innerHTML += languagesComponent;
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
}