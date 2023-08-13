import * as express from "express";
import * as url from "url";

import { existsSync, readFileSync } from "fs";
import { print } from "lsse";

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
    const w: Function = (data: Readonly<unknown> = ""): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        if (!req.url) {
            return w("");
        }

        const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;
        const fpath: PathLike = findPath(["public"], "index.html");
        return existsSync(fpath) ? w(replaceData(String(readFileSync(fpath)), url_info)) : w("");
    } catch (e: unknown) {
        print(e);
        return w("");
    }
}).listen(port, (): void => {
    print(`Server is running on http://localhost:${port}/`);
});
