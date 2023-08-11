import * as express from "express";
import * as url from "url";

const app: express.Application = express();

import { PathLike, readFileSync } from "fs";
const { print } = require("lsse");

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";

import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";

const filename: string = "select";
const port: number = getPort(filename); // 8094

function getDataToReturn(givenData: string, url_info: ParsedUrlQuery): string {
    const _default: ReturnType<typeof getDataToReturn> = "";
    try {
        let write: string = "";
        let pathArray: string[] = [];
        let dataFile: string = "";

        switch (givenData) {
            case "languages":
            case "pages":
                break;
            case "welcome":
                pathArray = ["public", "assets", `${url_info["data"]}`];
                dataFile = "info.json";
                break;
            case "albumData":
                pathArray = ["img"];
                dataFile = "info.json";
                break;
            case "categories":
                pathArray = ["img"];
                dataFile = "categories.json";
                break;
            case "sessions":
                pathArray = ["img"];
                dataFile = "sessions.json";
                break;
            case "stills":
                pathArray = ["img"];
                dataFile = "stills.json";
                break;
            default:
                write = "";
        }

        write = String(
            readFileSync(findPath(pathArray, dataFile), {
                encoding: "utf8",
                flag: "r",
            }),
        );

        return write;
    } catch (e: unknown) {
        return _default;
    }
}

app.get("/", (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: Readonly<unknown> = ""): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };
    try {
        if (!req.url) {
            return w("");
        }

        const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;
        if (!("data" in url_info) || typeof url_info["data"] !== "string") {
            return w("");
        }

        return w(getDataToReturn(url_info["data"], url_info));
    } catch (e: unknown) {
        print(e);
        return w("");
    }
});

app.listen(port, (): void => {
    print(`Server is running on http://localhost:${port}/`);
});
