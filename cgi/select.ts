import * as fs from 'fs';
import * as url from 'url';
import * as http from 'http';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'

import { getPort } from './modules/portServer';
import { logErr, findPath } from './modules/findPath';

const filename: string = 'select';
const port: number = getPort(filename); // 8094

const validPage: Function = (page: string): boolean => {
    const cFunc = 'validPage';
    const def = false;
    try {
        const pages: string[] = ['home', 'about', 'contact', 'blog', 'gallery'];
        if (pages.includes(page)) {
            return true;
        }
        return def;
    } catch (e) {
        logErr(cFunc, e, def, filename)
    }
}

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer((req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "text/html" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if ('data' in url_info) {
            if (url_info.data as string === "pages" || url_info.data as string === "languages") {
                return w(String(fs.readFileSync(findPath(['public', 'data'], url_info.data as string + ".json"))));
            } else if (url_info.data == "components") {
                return w(String(fs.readFileSync("../components.json")));
            }
        }
    } catch (e) {
        console.log(e);
        return w('');
    }
}
);

server.listen(port, (): void => {
    console.log("Server is running on http://localhost:" + port + "/");
});