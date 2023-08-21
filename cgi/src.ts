import * as url from "url";
import * as fs from "fs";
import * as http from "http";
import * as lsse from "lsse";
import { ParsedUrlQuery } from "querystring";

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
        console.error(e);
        return _default;
    }
}

function getPath(url_info: Readonly<ParsedUrlQuery>, requestsLibrary: boolean): Readonly<fs.PathLike> {
    const _default: ReturnType<typeof getPath> = "../public/components/home.html";

    try {
        if (requestsLibrary) {
            return findPath(["public", "lib"], `${url_info["type"]}.${getSourceFileExtension(url_info)}`);
        }

        return findPath(["public"], `app.${getSourceFileExtension(url_info)}`) as Readonly<fs.PathLike>;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(
    (
        req: http.IncomingMessage,
        res: http.ServerResponse<http.IncomingMessage>,
    ): http.ServerResponse<http.IncomingMessage> => {
        const w: Function = (data: Readonly<unknown> = ""): http.ServerResponse<http.IncomingMessage> => {
            res.write(data);
            return res.end();
        };

        try {
            if (!req.url) {
                return w("");
            }

            const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;
            const requestsLibrary: boolean =
                "type" in url_info && (url_info["type"] == "jQuery" || url_info["type"] == "Bootstrap");
            const fpath: Readonly<fs.PathLike> = getPath(url_info, requestsLibrary);

            return w(
                fs.existsSync(fpath)
                    ? String(fs.readFileSync(fpath, "utf-8").replace(/@dynamiclink/g, lsse.str(getDynLink())))
                    : "",
            );
        } catch (e: unknown) {
            console.error(e);
            return w("");
        }
    },
);

server.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
