import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

import { findPath } from './modules/findPath';
import { getPort } from './modules/portServer';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'

const filename: string = 'img';
const port: number = getPort(filename);
const app: any = express();

app.get('/', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url, true).query;
        if ('img' in url_info && 'type' in url_info) {
            const fpath_arr: any[] = ['public', 'img', url_info.type];
            const imgname: any = url_info.img;
            if (url_info.type === 'gallery' && 'gallery' in url_info && 'album' in url_info) {
                fpath_arr.push(url_info.album);
                fpath_arr.push(url_info.gallery);
            } else if (url_info.type === 'icon') {
                fpath_arr.push('icons');
            } else {
                throw new Error('incorrect input');
            }
            const fpath: fs.PathLike = findPath(fpath_arr, imgname, filename);
            if (fs.existsSync(fpath)) {
                w(fs.readFileSync(fpath));
            } else {
                throw new Error('image doesn\'t exist');
            }
        }
    } catch (e: any) {
        console.log(e);
        w('');
    }
});

app.listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});