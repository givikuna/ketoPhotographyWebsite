import * as express from 'express'
import * as url from 'url'

const app: express.Application = express()

import {readFileSync, existsSync, PathLike} from 'fs';

import { ParsedUrlQuery } from 'querystring'
import { IncomingMessage, ServerResponse, createServer } from 'http'

import { getPort } from './modules/portServer'
import { findPath } from './modules/findPath'
import { isJSON } from './extensions/syntax'

const filename: string = 'select'
const port: number = getPort(filename) // 8094

app.get('/', (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" })
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

        let write: string = ''

        const givenData: string = url_info.data;

        switch (givenData) {
            case 'languages':
            case 'pages':
                write  = String(readFileSync(findPath(['public', 'data'], `${url_info.data}.json`)))
                break
            case 'welcome':
                write = String(readFileSync(findPath(['public', 'assets', url_info.data], 'info.json')))
                break
            case 'albumData':
                write = String(readFileSync('../img/info.json'))
                break
            default:
                write = ''
        }

        return w(write)
    } catch (e) {
        console.log(e)
        return w('')
    }
})

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`)
})
