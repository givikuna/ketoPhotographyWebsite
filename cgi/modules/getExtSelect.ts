import { ParsedUrlQuery } from 'querystring'

import { logErr } from './findPath'

export function getExt(url_info: ParsedUrlQuery): string {
    const _default: string = 'js'
    try {
        const m_type: string = url_info.type as string
        return m_type === 'style' || m_type === 'css' ? 'css' : 'js'
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}
