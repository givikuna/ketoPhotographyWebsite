import * as express from 'express';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { Application } from 'express';

import { getPort } from './modules/portServer'

const app: Application = express();

const filename: string = 'img';
const port: number = getPort(filename);

app.get('/', (req: IncomingMessage, res: ServerResponse): void => {
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        // to finish later
    } catch (e) {
        console.log(e);
    }
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
