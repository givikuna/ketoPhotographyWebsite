import { ParsedUrlQuery } from 'querystring';

import { logErr } from './findPath';

export function getExt(url_info: ParsedUrlQuery, filename: string = 'src'): string {
    const cFunc: string = 'getExt';
    const def: string = 'ts';
    try {
        const m_type: string = url_info.type as string;
        return (m_type === 'style' || m_type === 'css') ? 'css' : 'js';
    } catch (e: any) {
        logErr(cFunc, e, def, filename);
    }
}
