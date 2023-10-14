import * as url from "url";
import * as fs from "fs";

import { getDynLink } from "./modules/getDynLink";

import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { findPath } from "./modules/findPath";

function getPath(url_info: Readonly<ParsedUrlQuery>): fs.PathLike {
    const _default: ReturnType<typeof getPath> = "../dist/index.js";

    try {
        const paths: { [key: string]: fs.PathLike } = {
            jQuery: findPath(["public", "lib"], "jQuery.js"),
            script: findPath(["dist"], "index.js"),
            style: findPath(["public"], "app.css"),
        };

        return typeof url_info["type"] === "string" &&
            ["jQuery, style, script"].includes(String(url_info["type"]))
            ? paths[String(url_info["type"])]
            : _default;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

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
        const fpath: Readonly<fs.PathLike> = getPath(url_info);

        return w(
            fs.existsSync(fpath)
                ? String(fs.readFileSync(fpath, "utf-8").replace(/@dynamiclink/g, getDynLink() as string))
                : "",
        );
    } catch (e: unknown) {
        console.error(e);
        return w("");
    }
}
