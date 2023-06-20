import * as fs from 'fs';

import { stringify } from '../extensions/syntax';
import { logErr, findPath } from './findPath';

export const getLang: Function = (url_info: any, file_name: string = 'index') => {
    const cFunc = 'getLang';
    const def = 'en';
    try {
        const langs = getLangs();
        if ('lang' in url_info && langs.includes(url_info.lang)) {
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
