import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { Application } from 'express';
import { PathLike } from 'fs';

import { findPath } from './modules/findPath';
import { getPort } from './modules/portServer';
import { getIcons } from './modules/getIcons';
import { getFileExtension } from './extensions/syntax';

const app: Application = express();

const filename: string = 'img';
const port: number = getPort(filename); // 8092

function getIconExtension(icon: string): string {
    let icons: any = getIcons();
    for (let i: number = 0; i < icons.length; i++) {
        if (icons[i].icon === icon) return `.${getFileExtension(icons[i].file)}`;
    }
    return '.png';
}

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        if ('img' in url_info && typeof url_info.img === 'string' && 'type' in url_info && typeof url_info.type === 'string') {
            const type_: string = url_info.type;
            const fpath: PathLike = findPath(['public', 'assets', type_], url_info.img);

            return fs.existsSync(fpath) ? w(fs.readFileSync(fpath)) : w('');
        } else throw new Error('Invalid request');
    } catch (e: any) {
        console.log(e);
        return w('');
    }
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
