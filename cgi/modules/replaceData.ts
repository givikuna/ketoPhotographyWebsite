import * as dynamicLinkGetter from './dynamicLinkGetter';
import * as languageGetter from './getLang';
import * as emailGetter from './getEmail';
const { getEmail } = emailGetter;
const { getLang } = languageGetter;
const { getDynLink } = dynamicLinkGetter;
import { ParsedUrlQuery } from 'querystring';

export const replaceData: Function = (data: string, url_info: ParsedUrlQuery | JSON = { "lang": 'en' }): string => {
    let m_data: string = data;
    m_data = m_data.replace(/@dynamiclink/g, getDynLink());
    m_data = m_data.replace(/@language/g, getLang(url_info));
    m_data = m_data.replace(/@contactemail/g, getEmail({ arr: ['public', 'data', 'contactEmail'], file: 'data.txt' }));
    return m_data;
}
