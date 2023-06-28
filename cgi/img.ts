import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { Application } from 'express';

import { findPath } from './modules/findPath';
import { getPort } from './modules/portServer';

const app: Application = express();

const filename: string = 'img';
const port: number = getPort(filename); // 8092

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if ('img' in url_info && 'type' in url_info && typeof url_info.type === 'string') {
            const type_: string = url_info.type;
            let arr: string[] = ['public', 'img', type_];
            const imgname: string = typeof url_info.img === 'string' ? url_info.img : null;

            if (type_ === 'gallery' && 'gallery' in url_info && 'album' in url_info) {
                arr.push(typeof url_info.album === 'string' ? url_info.album : null);
                arr.push(typeof url_info.gallery === 'string' ? url_info.gallery : null);
            } else if (type_ === 'icon')
                arr.push('icons');
            else
                return w('');

            const fpath: fs.PathLike = findPath(arr, imgname, filename);

            return fs.existsSync(fpath) ? w(fs.readFileSync(fpath)) : w('');
        }
    } catch (e: any) {
        console.log(e);
        return w('');
    }
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
