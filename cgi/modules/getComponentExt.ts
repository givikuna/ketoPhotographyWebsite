import { ParsedUrlQuery } from 'querystring';
import { logErr } from './findPath';

export const getExt: Function = (url_info: ParsedUrlQuery, filename: string = 'serve') => {
    const cFunc: string = 'getExt';
    const def: string = 'html';
    try {
        if ('t' in url_info) {
            return url_info.t;
        }
        return def;
    } catch (e: any) {
        logErr(cFunc, e, def, filename);
    }
}
