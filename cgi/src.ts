import * as url from 'url'

import { readFileSync, existsSync } from 'fs'

import { ParsedUrlQuery } from 'querystring'
import { IncomingMessage, ServerResponse, Server, createServer } from 'http'
import { PathLike } from 'fs'

import { findPath } from './modules/findPath'
import { getPort } from './modules/portServer'
import { getDynLink } from './modules/dynamicLinkGetter'

const filename = 'src'
const port = getPort(filename)

function getExt(url_info: ParsedUrlQuery): string {
    const _default: string = 'js'
    try {
        const m_type: string = url_info.type as string
        return m_type === 'style' || m_type === 'css' ? 'css' : 'js'
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data)
        return res.end()
    }
    try {
        if (!req.url)
            return w('')

        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query
        const requestsLibrary: boolean = 'type' in url_info && (url_info.type == 'jQuery' || url_info.type == 'Bootstrap')
        const fpath: PathLike = findPath(requestsLibrary ? ["public", "lib"] : ["public"], (requestsLibrary ? `${url_info.type}.` : "app.") + getExt(url_info))
        return w(existsSync(fpath) ? String(readFileSync(fpath, "utf-8").replace(/@dynamiclink/g, getDynLink().toString())) : "")
    } catch (e: unknown) {
        console.log(e)
        return w('')
    }
})

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`)
})
