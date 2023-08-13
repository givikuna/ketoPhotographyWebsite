import * as express from "express";
import * as url from "url";

const app: express.Application = express();

import { PathLike, readFileSync } from "fs";
import { print, len, lower } from "lsse";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";

import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";

import { CATEGORY, SESSION, STILL } from "./types/types";

const filename: string = "select";
const port: number = getPort(filename); // 8094

function getSpecificData(givenData: string, url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getSpecificData> = "";
    try {
        let write: string = "";
        if (
            givenData === "categorySessions" &&
            "category" in url_info &&
            (typeof url_info["category"] === "string" || typeof url_info["category"] === "number")
        ) {
            const category_UID: number = ((categoryData: number | string): number => {
                const categoryDataType: string = typeof categoryData;
                const categories: CATEGORY[] = JSON.parse(
                    getDataToReturn("categories", {}),
                ) as CATEGORY[];
                if (categoryDataType === "string") {
                    for (let i: number = 0; i < len(categoryData as string); i++) {
                        if (categoryData === categories[i].NAME) {
                            return categories[i].UID;
                        }
                    }
                }
                if (categoryDataType === "number") {
                    return categoryData as number;
                }
                return 0;
            })(url_info["category"]);

            return JSON.stringify(
                (JSON.parse(getDataToReturn("sessions", {})) as SESSION[]).filter(
                    (session) => session.CATEGORY_UID === category_UID,
                ),
            );
        }
        if (
            givenData === "sessionImages" &&
            "session" in url_info &&
            typeof url_info["session"] === "number"
        ) {
            const session_UID: number = ((session_uid: number): number => {
                const sessions: SESSION[] = JSON.parse(
                    getDataToReturn("sessions", {}),
                ) as SESSION[];
                for (let i: number = 0; i < len(sessions); i++) {
                    if (session_uid === sessions[i].UID) {
                        return session_uid;
                    }
                }
                return 0;
            })(url_info["session"]);

            return JSON.stringify(
                (JSON.parse(getDataToReturn("stills", {})) as STILL[]).filter(
                    (still) => still.SESSION_UID === session_UID,
                ),
            );
        }

        return write;
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}

function getDataToReturn(givenData: string, url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getDataToReturn> = "";
    try {
        if (givenData in ["categorySessions", "sessionImages"]) {
            return getSpecificData(givenData, url_info);
        }
        let write: string = "";
        let pathArray: string[] = [];
        let dataFile: string = "";

        switch (lower(givenData)) {
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
                throw new Error("unknown request");
        }

        write = String(
            readFileSync(findPath(pathArray, dataFile), {
                encoding: "utf8",
                flag: "r",
            }),
        );

        return write;
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}

app.get(
    "/",
    (
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage>,
    ): ServerResponse<IncomingMessage> => {
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
    },
);

app.listen(port, (): void => {
    print(`Server is running on http://localhost:${port}/`);
});
