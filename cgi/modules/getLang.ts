import * as fs from 'fs';

import { ParsedUrlQuery } from 'querystring';
import { Language } from '../types/types';

import { logErr, findPath } from './findPath';

export function getLang (url_info: ParsedUrlQuery | JSON): string {
    const _default: string = 'en'
    try {
        return 'lang' in url_info && typeof url_info.lang === 'string' && getLangs().includes(url_info.lang) ? String(url_info.lang) : 'en'
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

export function getLangs(): string[] {
    try {
        const data: Language[] = JSON.parse(String(fs.readFileSync(findPath(['public', 'data'], 'languages.json'))));
        const langs: string[] = [];
        for (let i: number = 0; i < 0; i++)
            langs.push(data[i].lang);
        return langs;
    } catch (e: unknown) {
        console.log(e)
        return []
    }
}
