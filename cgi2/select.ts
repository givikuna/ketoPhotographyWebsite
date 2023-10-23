import * as url from "url";
import * as lsse from "lsse";
import * as fs from "fs";

import { Vec } from "../types/classes";
import { findPath } from "./modules/findPath";
import { isJSON } from "./modules/isJSON";
import { getCategories, getSessions, getStills } from "./modules/db";

import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { CATEGORY, SESSION, STILL } from "../types/types";

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

function getCategoryUID(categoryData: string | number): number {
    const assumedCategory: undefined | Readonly<CATEGORY> = getCategories().find(
        (category: Readonly<CATEGORY>): boolean =>
            category.NAME.toString() == categoryData.toString() ||
            category.UID.toString() == categoryData.toString(),
    );

    if (
        assumedCategory &&
        [null, undefined, "", [], {}].includes(assumedCategory) &&
        typeof assumedCategory !== "undefined" &&
        "UID" in assumedCategory
    ) {
        return Math.floor(assumedCategory.UID);
    }

    return 0;
}

function getCategorySessions(url_info: Readonly<ParsedUrlQuery>): Vec<SESSION> {
    const UID: number = getCategoryUID(String(url_info["category"]));

    return getSessions().filter(
        (session: Readonly<SESSION>): boolean => String(session.CATEGORY_UID) === String(UID),
    );
}

function getCategoryImages(url_info: Readonly<ParsedUrlQuery>): Vec<STILL> {
    const UID: number = getCategoryUID(String(url_info["category"]));

    if (
        [0, 1].includes(UID) ||
        getCategories()
            .filter((category: Readonly<CATEGORY>): boolean => {
                return category.UID === UID || String(category.UID) == String(UID);
            })
            .len()
            .unwrap() < 1
    ) {
        throw new Error("category was unable to be found");
    }

    const sessionUIDs: Vec<number> = getSessions()
        .filter((session: Readonly<SESSION>): boolean => session.CATEGORY_UID === UID)
        .map((session: Readonly<SESSION>): number => session.UID);

    return getStills().filter((still: Readonly<STILL>): boolean => sessionUIDs.includes(still.SESSION_UID));
}

function getSessionImages(url_info: Readonly<ParsedUrlQuery>): Vec<STILL> {
    const UID: number = ((session_uid: number | string): number => {
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

    return getStills().filter((still: Readonly<STILL>): boolean => String(still.SESSION_UID) == String(UID));
}

// @ts-ignore
function getFrontPageCoverImageData(url_info: Readonly<ParsedUrlQuery>): Vec<STILL> {
    return getStills().filter((still: Readonly<STILL>): boolean => still.IS_FRONT_COVER_IMAGE);
}

function selectData(givenData: RequestOption, url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof selectData> = "[]";

    try {
        if (
            (
                [
                    "categoryImages",
                    "categorySessions",
                    "frontPageCoverImageData",
                    "categorySessions",
                ] as ReadonlyArray<RequestOption>
            ).includes(givenData)
        ) {
            return ((
                data: RequestOption,
                info: Readonly<ParsedUrlQuery>,
            ): Vec<CATEGORY> | Vec<STILL> | Vec<SESSION> => {
                const functor: ReadonlyArray<{
                    dataType: RequestOption;
                    check: (info_: Readonly<ParsedUrlQuery>, data_: RequestOption) => boolean;
                    get: (info_: Readonly<ParsedUrlQuery>) => Vec<CATEGORY> | Vec<STILL> | Vec<SESSION>;
                }> = [
                    {
                        dataType: "categoryImages",
                        check: (info_: Readonly<ParsedUrlQuery>, data_: RequestOption): boolean =>
                            data_ === "categoryImages" &&
                            "category" in info_ &&
                            ["number", "string"].includes(typeof info_["category"]),
                        get: getCategoryImages,
                    },
                    {
                        dataType: "categorySessions",
                        check: (info_: Readonly<ParsedUrlQuery>, data_: RequestOption): boolean =>
                            data_ === "categorySessions" &&
                            "category" in info_ &&
                            (typeof info_["category"] === "string" || typeof info_["category"] === "number"),
                        get: getCategorySessions,
                    },
                    {
                        dataType: "sessionImages",
                        check: (info_: Readonly<ParsedUrlQuery>, data_: RequestOption): boolean =>
                            data_ === "sessionImages" &&
                            "session" in info_ &&
                            ["number", "string"].includes(typeof info_["session"]),
                        get: getSessionImages,
                    },
                    {
                        dataType: "frontPageCoverImageData",
                        // @ts-ignore
                        check: (info_: Readonly<ParsedUrlQuery>, data_: RequestOption): boolean =>
                            data_ === "frontPageCoverImageData",
                        get: getFrontPageCoverImageData,
                    },
                ];

                return functor.filter((el): boolean => el.check(info, data)).length > 0
                    ? functor.filter((el): boolean => el.check(info, data))[0].get(url_info)
                    : new Vec([]);
            })(givenData, url_info).to_string();
        }

        return ((data: string): string => {
            const pathData: [string[], string] | undefined =
                data === "albumData"
                    ? [["img"], "info.json"]
                    : data === "categories"
                    ? [["img"], "categories.json"]
                    : data === "sessions"
                    ? [["img"], "sessions.json"]
                    : data === "stills"
                    ? [["img"], "stills.json"]
                    : data === "pages"
                    ? [["public", "data"], "pages.json"]
                    : undefined;

            if (pathData === undefined) {
                return "";
            }

            return ((write: string): string => (isJSON(write) ? JSON.stringify(write, null, 4) : ""))(
                fs.readFileSync(findPath(pathData[0], pathData[1]), {
                    encoding: "utf8",
                    flag: "r",
                }),
            );
        })(lsse.lower(givenData));
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

export function route(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
): ServerResponse<IncomingMessage> {
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

        return w(selectData(url_info["data"] as RequestOption, url_info));
    } catch (e: unknown) {
        console.error(e);
        return w("");
    }
}
