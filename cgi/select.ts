import * as express from "express";
import * as url from "url";
import * as fs from "fs";

import { ParsedUrlQuery } from "querystring";
import { CATEGORY, SESSION, STILL } from "../types/types";
import { IncomingMessage, ServerResponse } from "http";

import { getPort } from "./modules/portServer";
import { findPath } from "./modules/findPath";
import { getStills, getCategories, getSessions } from "./modules/getImageData";
import { isJSON } from "./extensions/extension";

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
    | "frontPageCoverImageData"
    | "categoryImages";

function getSpecificData(givenData: RequestOption, url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getSpecificData> = "[]";

    try {
        let write: string = "";

        if (
            givenData === "categorySessions" &&
            "category" in url_info &&
            (typeof url_info["category"] === "string" || typeof url_info["category"] === "number")
        ) {
            const category_UID: number = ((categoryData: number | string): number => {
                const categories: ReadonlyArray<CATEGORY> = getCategories();

                if (typeof categoryData === "string") {
                    const assumedCategory: undefined | Readonly<CATEGORY> = categories.find(
                        (category: Readonly<CATEGORY>): boolean =>
                            category.NAME.toString() == categoryData.toString(),
                    );

                    if (
                        assumedCategory &&
                        [null, undefined, "", [], {}].includes(assumedCategory) &&
                        typeof assumedCategory !== "undefined" &&
                        "UID" in assumedCategory
                    ) {
                        return assumedCategory.UID;
                    }
                }

                if (typeof categoryData === "number") {
                    return Math.floor(categoryData as number);
                }

                return 0;
            })(url_info["category"]);

            return JSON.stringify(
                getSessions().filter(
                    (session: Readonly<SESSION>): boolean =>
                        String(session.CATEGORY_UID) == String(category_UID),
                ) as ReadonlyArray<SESSION>,
                null,
                4,
            );
        }

        if (
            givenData === "categoryImages" &&
            "category" in url_info &&
            ["number", "string"].includes(typeof url_info["category"])
        ) {
            const categories: ReadonlyArray<CATEGORY> = getCategories();

            const category_UID: number = ((
                category_data: string | string[] | undefined | number,
                _categories: ReadonlyArray<CATEGORY>,
            ): number => {
                if (typeof category_data !== "string" && typeof category_data !== "number") {
                    return 0;
                }

                if (typeof category_data === "number" && category_data <= getCategories().length) {
                    return category_data;
                }

                if (
                    typeof category_data === "string" &&
                    /^[-+]?\d+(\.\d+)?$/.test(category_data) && // checks if the string is numeric
                    _categories
                        .map((category: Readonly<CATEGORY>): number => category.UID)
                        .includes(parseInt(category_data))
                ) {
                    return parseInt(category_data);
                }

                if (
                    typeof category_data === "string" &&
                    !/^[-+]?\d+(\.\d+)?$/.test(category_data) && // checks if the string is NOT numeric
                    _categories
                        .map((category: Readonly<CATEGORY>): string => category.NAME)
                        .includes(category_data as string)
                ) {
                    return _categories.find(
                        (category: Readonly<CATEGORY>): boolean =>
                            category.NAME === (category_data as string),
                    )?.UID as number;
                }

                return 0;
            })(url_info["category"], categories);

            if (
                [0, 1].includes(category_UID) ||
                categories.filter((category: Readonly<CATEGORY>): boolean => {
                    return category.UID === category_UID;
                }).length < 1
            ) {
                throw new Error("category was unable to be found");
            }

            const sessionUIDs: ReadonlyArray<number> = getSessions()
                .filter((session: Readonly<SESSION>): boolean => session.CATEGORY_UID === category_UID)
                .map((session: Readonly<SESSION>): number => session.UID);

            return JSON.stringify(
                getStills().filter((still: Readonly<STILL>): boolean =>
                    sessionUIDs.includes(still.SESSION_UID),
                ),
                null,
                4,
            );
        }

        if (
            givenData === "sessionImages" &&
            "session" in url_info &&
            ["number", "string"].includes(typeof url_info["session"])
        ) {
            const session_UID: number = ((session_uid: number | string): number => {
                const sessionMatch: Readonly<SESSION> | undefined = getSessions().find(
                    (session: Readonly<SESSION>): boolean => {
                        return session.UID == parseInt(String(session_uid));
                    },
                );

                return typeof sessionMatch &&
                    sessionMatch !== undefined &&
                    sessionMatch !== null &&
                    "UID" in sessionMatch
                    ? sessionMatch.UID
                    : 0;
            })(url_info["session"] as string);

            return JSON.stringify(
                getStills().filter(
                    (still: Readonly<STILL>): boolean => String(still.SESSION_UID) == String(session_UID),
                ) as ReadonlyArray<STILL>,
                null,
                4,
            );
        }

        if (givenData === "frontPageCoverImageData") {
            return JSON.stringify(
                getStills().filter(
                    (still: Readonly<STILL>): boolean => still.IS_FRONT_COVER_IMAGE,
                ) as ReadonlyArray<STILL>,
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
        if (
            (
                [
                    "categorySessions",
                    "sessionImages",
                    "frontPageCoverImageData",
                    "categoryImages",
                ] as ReadonlyArray<RequestOption>
            ).includes(givenData)
        ) {
            return getSpecificData(givenData, url_info);
        }

        let write: string = "";
        let pathArray: string[] = [];
        let dataFile: string = "";

        switch (givenData.toLowerCase()) {
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

        if (isJSON(dataAsString)) {
            write = JSON.stringify(dataAsString, null, 4);
        } else {
            write = JSON.stringify(dataAsString);
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
