import * as fs from "fs";
import * as url from "url";
import * as lsse from "lsse";

import { findPath } from "./modules/findPath";
import { getCategories, getStills } from "./modules/db";

import { CATEGORY, STILL } from "../types/types";
import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { SocialMediaIcon } from "../types/types";

type ImageType = "logo" | "albumCover" | "frontCoverImage" | "icon" | "albumImage";

type ImageFunctor = ReadonlyArray<{
    imageType: ImageType;
    check: (info: Readonly<ParsedUrlQuery>) => boolean;
    get: (info: Readonly<ParsedUrlQuery>) => fs.PathLike | string;
}>;

function getImage(img_UID: string): string {
    const _default: ReturnType<typeof getImage> = "error.png";

    try {
        const possibleStill: Readonly<STILL> | undefined = getStills().find(
            (still: Readonly<STILL>): boolean => still.UID === parseInt(img_UID),
        );

        if (
            [[], {}, "", null, undefined].includes(possibleStill) ||
            !possibleStill ||
            possibleStill == undefined ||
            possibleStill == null ||
            [0, -1].includes(Object.keys(possibleStill).length)
        ) {
            throw new Error("the STILL was not found");
        }

        return possibleStill.NAME;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getPath(url_info: Readonly<ParsedUrlQuery>): fs.PathLike | string | undefined {
    const type_: string =
        "type" in url_info && typeof url_info["type"] === "string" ? (url_info["type"] as string) : "";

    const imageFunctor: ImageFunctor = [
        {
            imageType: "icon",
            check: (info: Readonly<ParsedUrlQuery>): boolean =>
                ("type" in info ? (info["type"] as string) : "") === "icons" && "img" in info,
            get: (info: Readonly<ParsedUrlQuery>): fs.PathLike | string =>
                findPath(
                    ["public", "assets", type_],
                    `${info["img"]}.${
                        (
                            require("../public/assets/icons/icons.json") as ReadonlyArray<SocialMediaIcon>
                        ).filter((icon: SocialMediaIcon): boolean => {
                            return icon.icon === (info["img"] as string);
                        })[0].extension
                    }`,
                ),
        },
        {
            imageType: "frontCoverImage",
            check: (info: Readonly<ParsedUrlQuery>): boolean =>
                ("type" in info ? (info["type"] as string) : "") === "frontPageCoverImage" &&
                "img" in info &&
                lsse.isNumeric(String(info["img"])),
            get: (info: Readonly<ParsedUrlQuery>): fs.PathLike | string =>
                findPath(
                    ["img", "img"],
                    String(
                        getStills().filter((still: Readonly<STILL>): boolean => still.IS_FRONT_COVER_IMAGE)[
                            "img" in info && lsse.isNumeric(info["img"] as string)
                                ? parseInt(info["img"] as string)
                                : 0
                        ].NAME,
                    ),
                ),
        },
        {
            imageType: "albumImage",
            check: (info: Readonly<ParsedUrlQuery>): boolean =>
                ("type" in info ? (info["type"] as string) : "") === "img" &&
                "img" in info &&
                (typeof info["img"] === "string" || typeof info["img"] === "number"),
            get: (info: Readonly<ParsedUrlQuery>): fs.PathLike | string =>
                findPath(["img", "img"], getImage(info["img"] as string)),
        },
        {
            imageType: "albumCover",
            check: (info: Readonly<ParsedUrlQuery>): boolean =>
                ("type" in info ? (info["type"] as string) : "") === "cover" &&
                "album" in info &&
                typeof info["album"] === "string",
            get: (info: Readonly<ParsedUrlQuery>): fs.PathLike | string =>
                findPath(
                    ["img", "img"],
                    String(
                        getStills().filter(
                            (still: STILL): boolean =>
                                still.UID ==
                                (
                                    getCategories().map(
                                        (category: CATEGORY): number => category.COVER_STILL_UID,
                                    ) as ReadonlyArray<number>
                                )[
                                    getCategories().findIndex(
                                        (category: CATEGORY): boolean =>
                                            category.NAME == String(info["album"]),
                                    )
                                ],
                        )[0].NAME,
                    ),
                ),
        },
        {
            imageType: "logo",
            check: (info: Readonly<ParsedUrlQuery>): boolean =>
                "type" in info && typeof info["type"] === "string" && info["type"] === "logo",
            get: (info: Readonly<ParsedUrlQuery>): fs.PathLike | string =>
                findPath(["public", "assets", "logo"], `${String(info["type"])}.png`),
        },
    ];

    return imageFunctor.filter((el) => el.check(url_info)).length > 0
        ? imageFunctor.filter((el): boolean => el.check(url_info))[0].get(url_info)
        : undefined;
}

export function route(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
): ServerResponse<IncomingMessage> {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: (data: Readonly<unknown> | "") => ServerResponse<IncomingMessage> = (
        data: Readonly<unknown> | "",
    ): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    };

    try {
        if (!req.url) {
            return w("");
        }
        const url_info: Readonly<ParsedUrlQuery> = url.parse(req.url as string, true).query;

        if (
            !("img" in url_info) &&
            typeof url_info["img"] !== "string" &&
            !("type" in url_info) &&
            typeof url_info["type"] == "string"
        ) {
            throw new Error("Invalid request");
        }

        const fpath: fs.PathLike | undefined = getPath(url_info);

        return fpath !== undefined && fpath !== null && fs.existsSync(fpath)
            ? w(fs.readFileSync(fpath))
            : w("");
    } catch (e: unknown) {
        console.error(e);
        return w("");
    }
}
