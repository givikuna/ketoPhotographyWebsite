import { ParsedUrlQuery } from 'querystring';

import { logErr } from './findPath';

export const getExt: Function = (url_info: ParsedUrlQuery, file_name: string = 'src'): string => {
    const cFunc = 'getExt';
    const def = 'ts';
    try {
        const m_type: string = url_info.type as string;
        return (m_type === 'style' || m_type === 'css') ? 'css' : ((m_type === 'jQuery') ? 'js' : 'ts');
    } catch (e) {
        logErr(cFunc, e, def, file_name);
    }
}
