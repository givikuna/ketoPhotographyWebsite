import { ParsedUrlQuery } from 'querystring';

import { logErr } from './findPath';

export function getExt(url_info: ParsedUrlQuery, filename: string = 'serve'): string {
    const cFunc: string = 'getExt';
    const _default: string = 'html';
    try {
        return 't' in url_info ? url_info.t as string : _default;
    } catch (e: any) {
        return logErr(cFunc, e, _default, filename);
    }
}
