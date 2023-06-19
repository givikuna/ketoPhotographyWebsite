import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
import { len } from './extensions/syntax';
import { getExt } from './modules/getComponentExt';
import { getPort } from './modules/portServer';
import { findPath } from './modules/findPath';

const filename = 'serve'
const port = getPort(filename);

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url, true).query;
        if (len(url_info) === 0) {
            throw new Error('Wrong input');
        } else if ('c' in url_info) {
            const fpath: fs.PathLike = findPath(['public', 'components'], url_info.c + '.' + getExt(url_info));
            if (fs.existsSync(fpath)) {
                w(String(fs.readFileSync(fpath, 'utf-8')));
            }
        } else {
            throw new Error('Wrong input');
        }
    } catch (e) {
        console.log(e);
        return w('');
    }
});

server.listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});
