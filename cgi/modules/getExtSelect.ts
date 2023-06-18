import * as fp from './findPath';
import * as syntax from '../extensions/syntax';

const {
    logErr
} = fp;

const {
    isBlank
} = syntax;

export const getExt: Function = (url_info: any, file_name) => {
    if (isBlank(file_name)) {
        file_name = 'src';
    } else {
        file_name = 'select';
    }
    const cFunc = 'getExt';
    const def = 'js';
    try {
        if ('type' in url_info) {
            const m_type = url_info.type;
            if (m_type == 'style' || m_type == 'css') {
                return 'css';
            }
        }
        return def;
    } catch (e) {
        logErr(cFunc, e, def, file_name);
    }
}
