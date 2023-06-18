import * as express from 'express';
import * as fs from 'fs';
import * as syntax from './extensions/syntax';
import * as url from 'url';
import * as f from './modules/findPath';
import * as portServer from './modules/portServer';
import * as dataReplacer from './modules/replaceData';
import * as _getLang from './modules/getLang';

const { replaceData } = dataReplacer;
const { getPort } = portServer;
const { findPath } = f;
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http'
const { stringify } = syntax;

const filename: string = 'index';
const port: number = getPort(filename);
const app: any = express();

app.get('/', (req: IncomingMessage, res: ServerResponse) => {
    const w: Function = (data: unknown): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const fpath: fs.PathLike = findPath(['public'], 'index.html');
        if (fs.existsSync(fpath)) {
            fs.readFile(fpath, 'utf-8', (err: NodeJS.ErrnoException | null | string, data: any) => {
                if (err) throw err;
                data = stringify(data);
                data = replaceData(data, url_info);
                w(data);
            });
        } else w('');
    } catch (e) {
        console.log(e);
        w('');
    }
}).listen(port, (): void => {
    console.log('Server is running on http://localhost:' + port + '/');
});