import * as express from "express";
import * as url from "url";

import { existsSync, readFileSync } from "fs";

import { PathLike } from "fs";
import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";

import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";
import { replaceData } from "./modules/replaceData";

const app: express.Application = express();

const filename = "serve";
const port = getPort(filename); // 8095

function getExt(url_info: ParsedUrlQuery): string {
    const _default: string = "html";
    try {
        return "t" in url_info ? (url_info["t"] as string) : _default;
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

app.get("/", (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: Readonly<unknown | string> = ""): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        if (!req.url) return w("");

        const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;

        if (Object.keys(url_info).length === 0 || !("c" in url_info)) throw new Error("Wrong input");

        const fpath: PathLike = findPath(["public", "components"], `${url_info["c"]}.${getExt(url_info)}`);

        if (existsSync(fpath)) return w(replaceData(String(readFileSync(fpath, "utf-8")), url_info));

        throw new Error("Wrong input");
    } catch (e: unknown) {
        console.log(e);
        return w("");
    }
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
