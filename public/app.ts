function main(d: string, l: string, c: string): void {
    const dynamiclink: string = d ? d : 'ketojibladze.com';
    const language: string = l ? getLang(l) : 'en';
    const contactemail: string = c ? c : 'givitsvariani@proton.me';
    changeLang(language);
    changePage(getPage());

    buildApp();
}

const getLang: Function = (lang: string): string => lang === 'ru' ? lang : (lang === 'ge' ? lang : 'en');

function changePage(page: string): void {
    //
}

function changeLang(lang: string): void {
    //
}

const getPage: Function = (): string => window.location.hash.slice(1);

function buildApp(): void {
    fetch('@dynamiclink:8094/?data=pages').then(response => response.json()).then(data => {
        for (let i: number = 0; i < data.length; i++) {
            let pageDiv: HTMLDivElement = document.createElement('div');
            pageDiv.setAttribute('id', data[i].page);
            document.getElementById('app').appendChild(pageDiv);
            if (data[i].subpages !== 0) {
                for (let j: number = 0; j < data[i].subpages.length; j++) {
                    let subpageDiv = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].subpages[j].page);
                    document.getElementById('app').appendChild(subpageDiv);
                }
            } else if ('dropdownItems' in data[i]) {
                for (let j: number = 0; j < data[i].dropdownItems.length; j++) {
                    let subpageDiv: HTMLDivElement = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].dropdownItems[j].page);
                    document.getElementById('app').appendChild(subpageDiv);
                }
            }
        }
    });
    nav_bar();
}

function nav_bar(): void {
    fetch('@dynamiclink:8094/?data=pages')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == "page") {
                if (data[i].display.toLowerCase() === "home") continue;
                let content: string = "<li class=\"nav-item\"><a class=\"nav-link\" href=\"#@CURRENTPAGE\" onclick=\"changePage(\'@CURRENTPAGE\')\">@CURRENTDISPLAY</a></li>";
                document.getElementById('navbarSupportedContent').innerHTML += content.replace(/@CURRENTPAGE/g, data[i].page).replace(/@CURRENTDISPLAY/g, data[i].display);
            } else if (data[i].type === "dropdown") {
                let content: string = "<div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">@DROPDOWNS</div>";
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
            let languagesComponent: string = "";
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