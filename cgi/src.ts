import * as url from "url";

import { readFileSync, existsSync } from "fs";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse, Server, createServer } from "http";
import { PathLike } from "fs";

import { findPath } from "./modules/findPath";
import { getPort } from "./modules/portServer";
import { getDynLink } from "./modules/dynamicLinkGetter";

const filename: string = "src";
const port: number = getPort(filename); // 8093

function getSourceFileExtension(url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getSourceFileExtension> = "js";
    try {
        const m_type: string = url_info["type"] as string;
        return m_type === "style" || m_type === "css" ? "css" : "js";
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function getPath(url_info: Readonly<ParsedUrlQuery>, requestsLibrary: Readonly<boolean>): PathLike {
    const _default: ReturnType<typeof getPath> = "../public/components/home.html";
    try {
        if (requestsLibrary)
            return findPath(["public", "lib"], `${url_info["type"]}.${getSourceFileExtension(url_info)}`);
        return findPath(["public"], `app.${getSourceFileExtension(url_info)}`);
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(
    (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
        const w: Function = (data: Readonly<unknown> = ""): ServerResponse<IncomingMessage> => {
            res.write(data);
            return res.end();
        };
        try {
            if (!req.url) return w("");

            const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;
            const requestsLibrary: Readonly<boolean> =
                "type" in url_info && (url_info["type"] == "jQuery" || url_info["type"] == "Bootstrap");
            const fpath: Readonly<PathLike> = getPath(url_info, requestsLibrary);
            return w(
                existsSync(fpath)
                    ? String(readFileSync(fpath, "utf-8").replace(/@dynamiclink/g, getDynLink().toString()))
                    : "",
            );
        } catch (e: unknown) {
            console.log(e);
            return w("");
        }
    },
);

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
