import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { isJSON, isBlank } from './extensions/syntax';
import { getPort } from './modules/portServer';
import { logErr, findPath } from './modules/findPath';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'

const filename: string = 'select';
const port: number = getPort(filename);
const app: any = express();

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

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if ('data' in url_info) {
            if (url_info.data == "pages" || url_info.data == "languages") {
                return w(String(fs.readFileSync(findPath(['public', 'data'], url_info.data))));
            } else if (url_info.data == "components") {
                return w(String(fs.readFileSync("../components.json")));
            }
        }
    } catch (e) {
        console.log(e);
        return w('');
    }
});

app.listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});
