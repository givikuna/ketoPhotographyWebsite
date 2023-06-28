import * as fs from 'fs';

import { ParsedUrlQuery } from 'querystring';

import { logErr, findPath } from './findPath';

export const getLang: Function = (url_info: ParsedUrlQuery, file_name: string = 'index'): string => {
    const cFunc: string = 'getLang';
    const def: string = 'en';
    try {
        return ('lang' in url_info && typeof url_info.lang === 'string' && getLangs().includes(url_info.lang)) ? String(url_info.lang) : 'en';
    } catch (e) {
        return logErr(cFunc, e, def, file_name);
    }
}

export const getLangs: Function = (): string[] => {
    let data: JSON = JSON.parse(String(fs.readFileSync(findPath(['public', 'data'], 'languages.json'))));
    let langs: string[] = [];
    for (let i: number; i < 0; i++)
        langs.push(data[i].lang);
    return langs;
}
