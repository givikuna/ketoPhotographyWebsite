import * as fs from "fs";
import * as url from "url";

import { replaceData } from "./modules/replaceData";
import { findPath } from "./modules/findPath";

import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";

export function route(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
): ServerResponse<IncomingMessage> {
    const w: Function = (data: Readonly<unknown> = ""): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };

    try {
        if (!req.url) {
            return w("");
        }

        const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;
        const fpath: fs.PathLike = findPath(["public"], "index.html");

        return fs.existsSync(fpath) ? w(replaceData(String(fs.readFileSync(fpath)), url_info)) : w("");
    } catch (e: unknown) {
        console.error(e);
        return w("");
    }
}
