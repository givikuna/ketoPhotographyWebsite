import { ParsedUrlQuery } from 'querystring';

import { logErr } from './findPath';

export const getExt: Function = (url_info: ParsedUrlQuery, file_name: string = 'src') => {
    const cFunc = 'getExt';
    const def = 'js';
    try {
        if ('type' in url_info && typeof url_info.type === 'string') {
            const m_type: string = url_info.type;
            if (m_type === 'style' || m_type === 'css' || m_type === 'Bootstrap')
                return 'css';
        }
        return def;
    } catch (e) {
        logErr(cFunc, e, def, file_name);
    }
}
