import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { PathLike } from 'fs';
import { Application } from 'express';

import { replaceData } from './modules/replaceData';
import { getPort } from './modules/portServer'
import { findPath } from './modules/findPath';

const app: Application = express();

const filename: string = 'index';
const port: number = getPort(filename); // 8091

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const fpath: PathLike = findPath(['public'], 'index.html');
        return fs.existsSync(fpath) ? w(replaceData(String(fs.readFileSync(fpath)), url_info)) : w('');
    } catch (e: any) {
        console.log(e);
        return w('');
    }
}).listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
