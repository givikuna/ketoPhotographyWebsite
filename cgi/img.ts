import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'

import { findPath } from './modules/findPath';
import { getPort } from './modules/portServer';

const app: express.Application = express();

const filename: string = 'img';
const port: number = getPort(filename); // 8092

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url, true).query;
        if ('img' in url_info && 'type' in url_info && typeof url_info.type === 'string') {
            const fpath_arr: string[] = ['public', 'img', url_info.type];
            const imgname: string = typeof url_info.img === 'string' ? url_info.img : null;
            if (url_info.type === 'gallery' && 'gallery' in url_info && 'album' in url_info) {
                fpath_arr.push(typeof url_info.album === 'string' ? url_info.album : null);
                fpath_arr.push(typeof url_info.gallery === 'string' ? url_info.gallery : null);
            } else if (url_info.type === 'icon')
                fpath_arr.push('icons');
            else
                throw new Error('incorrect input');

            const fpath: fs.PathLike = findPath(fpath_arr, imgname, filename);
            if (fs.existsSync(fpath)) {
                return w(fs.readFileSync(fpath));
            } else {
                throw new Error('image doesn\'t exist');
            }
        }
    } catch (e: any) {
        console.log(e);
        return w('');
    }
});

app.listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});