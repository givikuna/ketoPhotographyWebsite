import * as fs from 'fs';

import { ParsedUrlQuery } from 'querystring';
import { Language } from '../types/types';

import { logErr, findPath } from './findPath';

export function getLang (url_info: ParsedUrlQuery, file_name: string = 'index'): string {
    const cFunc: string = 'getLang';
    const _default: string = 'en';
    try {
        return ('lang' in url_info && typeof url_info.lang === 'string' && getLangs().includes(url_info.lang)) ? String(url_info.lang) : 'en';
    } catch (e) {
        return logErr(cFunc, e, _default, file_name);
    }
}

export function getLangs(): string[] {
    let data: Language[] = JSON.parse(String(fs.readFileSync(findPath(['public', 'data'], 'languages.json'))));
    let langs: string[] = [];
    for (let i: number; i < 0; i++)
        langs.push(data[i].lang);
    return langs;
}
