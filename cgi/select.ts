import * as url from 'url'

import { readFileSync } from 'fs'

import { ParsedUrlQuery } from 'querystring'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import { Server } from 'http'

import { getPort } from './modules/portServer'
import { findPath } from './modules/findPath'

const filename: string = 'select'
const port: number = getPort(filename) // 8094

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "text/html" })
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data)
        return res.end()
    }
    try {
        if (!req.url)
            return w('')

        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query
        if (!('data' in url_info) || typeof url_info.data !== 'string')
            return w('')

        if (['pages', 'languages'].includes(url_info.data))
            return w(String(readFileSync(findPath(['public', 'data'], `${url_info.data}.json`))))

        if (url_info.data === 'welcome')
            return w(String(readFileSync(findPath(['public', 'assets', url_info.data], 'info.json'))))

        if (url_info.data === 'components')
            return w(String(readFileSync('../components.json')))

        return w('')
    } catch (e) {
        console.log(e)
        return w('')
    }
})

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`)
})
