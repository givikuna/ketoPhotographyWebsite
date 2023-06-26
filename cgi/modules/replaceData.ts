import { getDynLink } from './dynamicLinkGetter';
import { getLang } from './getLang';
import { getEmail } from './getEmail';
import { ParsedUrlQuery } from 'querystring';

export const replaceData: Function = (data: string, url_info: ParsedUrlQuery | JSON = { "lang": 'en' }): string => {
    return data
        .replace(/@dynamiclink/g, getDynLink())
        .replace(/@language/g, getLang(url_info))
        .replace(/@contactemail/g, getEmail({ arr: ['public', 'data', 'contactEmail'], file: 'data.txt' }));;
}
