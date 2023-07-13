import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse, createServer } from 'http';
import { Server } from 'http';

import { getPort } from './modules/portServer';
import { findPath } from './modules/findPath';

const filename: string = 'select';
const port: number = getPort(filename); // 8094

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "text/html" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        if (!req.url) return w('');

        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if (!('data' in url_info))
            return w('');

        if (url_info.data === "pages" || url_info.data === "languages")
            return w(String(fs.readFileSync(findPath(['public', 'data'], `${url_info.data as string}.json`))));

        if (url_info.data === "welcome")
            return w(String(fs.readFileSync(findPath(['public', 'assets', url_info.data as string], 'info.json'))));

        if (url_info.data === "components")
            return w(String(fs.readFileSync("../components.json")));

        return w('')
    } catch (e) {
        console.log(e);
        return w('');
    }
});

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
