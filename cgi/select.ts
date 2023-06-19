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
        if (!isBlank(url_info) && 'page' in url_info && validPage(url_info.page)) {
            const fpath: fs.PathLike = findPath(['public', 'data', url_info.page], 'data.json');
            const data: string = String(fs.readdirSync(fpath));
            if (data.length === 0) {
                console.log('WARN: the requested data is an empty array');
            } else if (isJSON(data)) {
                return w(data);
            } else {
                throw new Error('invalid request');
            }
        } else {
            throw new Error('invalid request');
        }
    } catch (e) {
        console.log(e);
        return w('');
    }
});
