import * as syntax from '../extensions/syntax';
import * as fp from './findPath';
const { stringify } = syntax;
const { logErr } = fp;

export const getLang: Function = (url_info: any, file_name: string = 'index') => {
    const cFunc = 'getLang';
    const def = 'en';
    try {
        const langs = [
            'en',
            'ru',
            'ge'
        ];
        if ('lang' in url_info && langs.includes(url_info.lang)) {
            return stringify(url_info.lang);
        }
    } catch (e) {
        return logErr(cFunc, e, def, file_name);
    }
}
