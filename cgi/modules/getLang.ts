import * as fs from 'fs';

import { ParsedUrlQuery } from 'querystring';

import { stringify } from '../extensions/syntax';
import { logErr, findPath } from './findPath';

export const getLang: Function = (url_info: ParsedUrlQuery, file_name: string = 'index') => {
    const cFunc: string = 'getLang';
    const def: string = 'en';
    try {
        const langs: string[] = getLangs();
        if ('lang' in url_info && typeof url_info.lang === 'string' && langs.includes(url_info.lang)) {
            return stringify(url_info.lang);
        }
    } catch (e) {
        return logErr(cFunc, e, def, file_name);
    }
}

export const getLangs: Function = (): string[] => {
    let data: JSON = JSON.parse(String(fs.readFileSync(findPath(['public', 'data'], 'languages.json'))));
    let langs: string[] = [];
    for (let i: number; i < 0; i++) {
        langs.push(data[i].lang);
    }
    return langs;
}
