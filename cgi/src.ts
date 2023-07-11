import * as url from 'url';
import * as fs from 'fs';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse, Server, createServer } from 'http';
import { PathLike } from 'fs';

import { findPath } from './modules/findPath';
import { getDynLink } from './modules/dynamicLinkGetter';
import { getPort } from './modules/portServer';
import { getExt } from './modules/getExtSelect';

const filename = 'src';
const port = getPort(filename);

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        if (!req.url) return w('');

        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const requestsLibrary: boolean = 'type' in url_info && (url_info.type == 'jQuery' || url_info.type == 'Bootstrap');
        const fpath: PathLike = findPath(requestsLibrary ? ["public", "lib"] : ["public"], (requestsLibrary ? `${url_info.type}.` : "app.") + getExt(url_info));
        return w(fs.existsSync(fpath) ? String(fs.readFileSync(fpath, "utf-8").replace(/@dynamiclink/g, getDynLink(filename).toString())) : "");
    } catch (e) {
        console.log(e);
        return w('');
    }
});

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
