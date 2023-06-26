import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'

import { replaceData } from './modules/replaceData';
import { getPort } from './modules/portServer'
import { findPath } from './modules/findPath';

const app: express.Application = express();

const filename: string = 'index';
const port: number = getPort(filename); // 8091

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const fpath: fs.PathLike = findPath(['public'], 'index.html');
        if (fs.existsSync(fpath)) {
            fs.readFile(fpath, 'utf-8', (err: NodeJS.ErrnoException | null | string, data: string) => {
                if (err) throw err;
                return w(replaceData(data, url_info));
            });
        } else return w('');
    } catch (e) {
        console.log(e);
        return w('');
    }
}).listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});
