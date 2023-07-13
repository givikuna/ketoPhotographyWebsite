import { ParsedUrlQuery } from 'querystring'

export function getExt(url_info: ParsedUrlQuery): string {
    const _default: string = 'html';
    try {
        return 't' in url_info ? url_info.t as string : _default;
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}
