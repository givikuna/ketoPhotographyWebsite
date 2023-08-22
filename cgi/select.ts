import * as express from "express";
import * as url from "url";
import * as fs from "fs";
import * as lsse from "lsse";

import { ParsedUrlQuery } from "querystring";
import { CATEGORY, SESSION, STILL, Immutable2DArray } from "./types/types";
import { IncomingMessage, ServerResponse } from "http";

import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";

const app: express.Application = express();

const filename: string = "select";
const port: number = getPort(filename); // 8094

type RequestOption =
    | "categorySessions"
    | "sessionImages"
    | "languages"
    | "pages"
    | "albumData"
    | "categories"
    | "stills"
    | "sessions"
    | "frontPageCoverImageData";

function getStills(): Immutable2DArray<STILL> {
    return JSON.parse(getDataToReturn("stills", {} as ParsedUrlQuery)) as Immutable2DArray<STILL>;
}

function getCategories(): Immutable2DArray<CATEGORY> {
    return JSON.parse(getDataToReturn("categories", {} as ParsedUrlQuery)) as Immutable2DArray<CATEGORY>;
}

function getSessions(): Immutable2DArray<SESSION> {
    return JSON.parse(getDataToReturn("sessions", {} as ParsedUrlQuery)) as Immutable2DArray<SESSION>;
}

function getSpecificData(givenData: RequestOption, url_info: Readonly<ParsedUrlQuery>): string {
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
                const categories: Immutable2DArray<CATEGORY> = getCategories();

                if (categoryDataType === "string") {
                    const assumedCategory: undefined | Readonly<CATEGORY> = categories.find((category) =>
                        lsse.equals(category.NAME, categoryData),
                    );

                    if (
                        assumedCategory &&
                        !lsse.equalsAny(assumedCategory, [null, undefined, "", [], {}]) &&
                        typeof assumedCategory !== "undefined" &&
                        "UID" in assumedCategory
                    ) {
                        return assumedCategory.UID;
                    }
                }

                if (categoryDataType === "number") {
                    return lsse.int(categoryData);
                }

                return 0;
            })(url_info["category"]);

            return JSON.stringify(
                getSessions().filter((session) =>
                    lsse.equals(lsse.str(session.CATEGORY_UID), lsse.str(category_UID)),
                ),
                null,
                4,
            );
        }

        if (
            givenData === "sessionImages" &&
            "session" in url_info &&
            (typeof url_info["session"] === "number" || typeof url_info["session"] === "string")
        ) {
            const session_UID: number = ((session_uid: number | string): number => {
                const sessionMatch: Readonly<SESSION> | undefined = getSessions().find((session) =>
                    lsse.equals(lsse.str(session.UID), lsse.str(session_uid)),
                );

                return typeof sessionMatch &&
                    sessionMatch !== undefined &&
                    sessionMatch !== null &&
                    "UID" in sessionMatch
                    ? lsse.int(sessionMatch.UID)
                    : 0;
            })(url_info["session"]);

            return JSON.stringify(
                getStills().filter((still) =>
                    lsse.equals(lsse.str(still.SESSION_UID), lsse.str(session_UID)),
                ),
                null,
                4,
            );
        }

        if (givenData === "frontPageCoverImageData") {
            return JSON.stringify(
                getStills().filter((still) => still.IS_FRONT_COVER_IMAGE),
                null,
                4,
            );
        }

        return write;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getDataToReturn(givenData: RequestOption, url_info: Readonly<ParsedUrlQuery> = {}): string {
    const _default: ReturnType<typeof getDataToReturn> = "[]";

    try {
        if ((givenData as string) in ["categorySessions", "sessionImages", "frontPageCoverImageData"]) {
            return getSpecificData(givenData, url_info);
        }

        let write: string = "";
        let pathArray: string[] = [];
        let dataFile: string = "";

        switch (lsse.lower(givenData)) {
            case "languages":
                throw new Error("languages can't be requested just yet");
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
            case "pages":
                pathArray = ["public", "data"];
                dataFile = "pages.json";
                break;
            default:
                write = "";
                throw new Error("unknown request");
        }

        const dataAsString: string = fs.readFileSync(findPath(pathArray, dataFile), {
            encoding: "utf8",
            flag: "r",
        });

        if (lsse.isJSON(dataAsString)) {
            write = JSON.stringify(dataAsString, null, 4);
        } else {
            write = lsse.str(dataAsString);
        }

        return write;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

app.get(
    "/",
    (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
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

            return w(getDataToReturn(url_info["data"] as RequestOption, url_info));
        } catch (e: unknown) {
            console.error(e);
            return w("");
        }
    },
);

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
