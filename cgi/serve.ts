import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse, Server } from "http";

import { getExt } from './modules/getComponentExt';
import { getPort } from './modules/portServer';
import { findPath } from './modules/findPath';
import { replaceData } from './modules/replaceData';

const filename = 'serve'
const port = getPort(filename); // 8095

const server: Server<typeof IncomingMessage, typeof ServerResponse> = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if (Object.keys(url_info).length === 0) throw new Error('Wrong input');
        if (!('c' in url_info)) throw new Error('Wrong input');

        const fpath: fs.PathLike = findPath(['public', 'components'], url_info.c + '.' + getExt(url_info));
        if (fs.existsSync(fpath))
            return w(replaceData(String(fs.readFileSync(fpath, 'utf-8')), url_info));

        throw new Error('Wrong input');
    } catch (e: any) {
        console.log(e);
        return w('');
    }
});

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
