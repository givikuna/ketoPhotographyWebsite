import { ParsedUrlQuery } from 'querystring';

import { logErr } from './findPath';

export const getExt: Function = (url_info: ParsedUrlQuery, filename: string = 'serve'): string => {
    const cFunc: string = 'getExt';
    const def: string = 'html';
    try {
        return 't' in url_info ? url_info.t as string : def;
    } catch (e: any) {
        return logErr(cFunc, e, def, filename);
    }
}
