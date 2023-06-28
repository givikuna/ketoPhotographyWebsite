function main(d: string, l: string, c: string): void {
    const dynamiclink: string = d ? d : 'ketojibladze.com';
    const language: string = l ? getLang(l) : 'en';
    const contactemail: string = c ? c : 'givitsvariani@proton.me';
    changeLang(language);
    changePage(getPage());

    if (buildApp()) {
        nav_bar();
        footer();
        addPages();
    }
}

const getLang: Function = (lang: string): string => lang === 'ru' ? lang : (lang === 'ge' ? lang : 'en');

function changePage(page: string): void {
    //
}

function changeLang(lang: string): void {
    //
}

const addPages: Function = (): void => {
    let pages: string[] = []; // will contain a list of the pages' names
    for (let i: number = 0; i < pages.length; i++) {
        fetch('@dynamiclink:8095/?c=navbar')
            .then(response => response.text())
            .then(data => {
                let div_: HTMLElement | HTMLDivElement = document.getElementById(pages[i] ? pages[i] : 'app');
                div_.innerHTML += data;
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }
}

const getPage: Function = (): string => window.location.hash.slice(1);

function buildApp(): boolean {
    /*
    fetch('@dynamiclink:8094/?data=pages').then(response => response.json()).then(data => {
        for (let i: number = 0; i < data.length; i++) {
            let pageDiv: HTMLDivElement | HTMLElement = document.createElement('div');
            pageDiv.setAttribute('id', data[i].page ? data[i].page : "ERROR");
            document.getElementById('app').appendChild(pageDiv);
            if (data[i].subpages !== 0) {
                for (let j: number = 0; j < data[i].subpages.length; j++) {
                    let subpageDiv: HTMLDivElement = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].subpages[j].page ? data[i].subpages[j].page : "ERROR");
                    document.getElementById('app').appendChild(subpageDiv);
                }
            } else if ('dropdownItems' in data[i]) {
                for (let j: number = 0; j < data[i].dropdownItems.length; j++) {
                    let subpageDiv: HTMLDivElement | HTMLElement = document.createElement('div');
                    subpageDiv.setAttribute('id', data[i].dropdownItems[j].page ? data[i].dropdownItems[j].page : "ERROR");
                    document.getElementById('app').appendChild(subpageDiv);
                }
            }
        }
        return true;
    });
    return false;
    */
   return true;
}

function nav_bar(): void {
    fetch('@dynamiclink:8095/?c=navbar')
        .then(response => response.text())
        .then(data => {
            let div_: HTMLElement = document.getElementById('navbar_div');
            div_.innerHTML = data;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function footer(): void {
    fetch('@dynamiclink:8095/?c=footer')
        .then(response => response.text())
        .then(data => {
            let div_: HTMLElement = document.getElementById('footer_div');
            div_.innerHTML = data;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
