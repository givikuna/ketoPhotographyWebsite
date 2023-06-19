import { getDynLink } from './dynamicLinkGetter';
import { getLang } from './getLang';
import { getEmail } from './getEmail';
import { ParsedUrlQuery } from 'querystring';

export const replaceData: Function = (data: string, url_info: ParsedUrlQuery | JSON = { "lang": 'en' }): string => {
    let m_data: string = data;
    m_data = m_data.replace(/@dynamiclink/g, getDynLink());
    m_data = m_data.replace(/@language/g, getLang(url_info));
    m_data = m_data.replace(/@contactemail/g, getEmail({ arr: ['public', 'data', 'contactEmail'], file: 'data.txt' }));
    return m_data;
}
