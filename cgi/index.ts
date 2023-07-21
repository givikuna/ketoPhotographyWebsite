import * as express from "express";
import * as url from "url";

import { existsSync, readFileSync } from "fs";

import { PathLike } from "fs";
import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";

import { replaceData } from "./modules/replaceData";
import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";

const app: express.Application = express();

const filename: string = "index";
const port: number = getPort(filename); // 8091

app.get("/", (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const fpath: PathLike = findPath(["public"], "index.html");
        return existsSync(fpath) ? w(replaceData(String(readFileSync(fpath)), url_info)) : w("");
    } catch (e: unknown) {
        console.log(e);
        return w("");
    }
}).listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
