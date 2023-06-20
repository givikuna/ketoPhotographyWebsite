function main(d, l, c) {
    const dynamiclink = d;
    const language = l;
    const contactemail = c;
    buildApp();
}

function changePage(page) {
    //
}

function changeLang(lang) {
    //
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