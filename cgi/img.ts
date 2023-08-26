import * as express from "express";
import * as url from "url";
import * as fs from "fs";
import * as lsse from "lsse";
// import * as subProcess from "child_process";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
import { SocialMediaIcon, Immutable2DArray, STILL, CATEGORY } from "./types/types";

import { findPath } from "./modules/findPath";
import { getPort } from "./modules/portServer";
import { getCategories, getStills } from "./modules/getImageData";

const app: express.Application = express();

const filename: string = "img";
const port: number = getPort(filename); // 8092

function getIcons(): Immutable2DArray<SocialMediaIcon> | Readonly<unknown> {
    const _default: ReturnType<typeof getIcons> = [
        {
            icon: "facebook",
            file: "facebook.png",
            extension: "png",
        },
        {
            icon: "flickr",
            file: "flickr.png",
            extension: "png",
        },
        {
            icon: "instagram",
            file: "instagram.png",
            extension: "png",
        },
        {
            icon: "pinterest",
            file: "pinterest.png",
            extension: "png",
        },
        {
            icon: "youtube",
            file: "youtube.png",
            extension: "png",
        },
    ] as const;

    try {
        return require("../public/assets/icons/icons.json") as Immutable2DArray<SocialMediaIcon>;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getIconExtension(icon: string): string {
    const _default: ReturnType<typeof getIconExtension> = "png";

    try {
        const icons: SocialMediaIcon[] | unknown = getIcons();

        if (!Array.isArray(icons)) {
            throw new Error("Icons couldn't be fetched");
        }

        for (let i: number = 0; i < icons.length; i++) {
            if (icons[i].icon === icon) {
                return `${icons[i].extension}`;
            }
        }

        return _default;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getAlbumCoverImage(url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getAlbumCoverImage> = "";

    try {
        if (!("album" in url_info) || typeof url_info["album"] !== "string") {
            throw new Error("wrong data given to album cover image getter function");
        }

        return getStills().filter((still: STILL): boolean =>
            lsse.equals(
                lsse.int(still.UID),
                lsse.int(
                    (
                        getCategories().map(
                            (category: CATEGORY): number => category.COVER_STILL_UID,
                        ) as ReadonlyArray<number>
                    )[
                        getCategories().findIndex((category: CATEGORY): boolean =>
                            lsse.equals(category.NAME, String(url_info["album"])),
                        )
                    ],
                ),
            ),
        )[0].NAME;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function wantsIcon(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsIcon> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "icons" && "img" in url_info;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function wantsAlbumCover(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsAlbumCover> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "cover" && "album" in url_info && typeof url_info["album"] === "string";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function wantsAlbumImage(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsAlbumImage> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "album" && "img" in url_info && typeof url_info["img"] === "string";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function wantsFrontPageCoverImage(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsFrontPageCoverImage> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return (
            type_ === "frontPageCoverImage" && "img" in url_info && lsse.isNumeric(String(url_info["img"]))
        );
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function wantsLogo(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsLogo> = false;

    try {
        return "type" in url_info && typeof url_info["type"] === "string" && url_info["type"] === "logo";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getFrontPageCoverImagePath(url_info: Readonly<ParsedUrlQuery>): fs.PathLike | string {
    if (!wantsFrontPageCoverImage(url_info)) {
        return "./";
    }

    return findPath(
        ["img", "img"],
        lsse.str(
            getStills().filter((still: Readonly<STILL>): boolean => still.IS_FRONT_COVER_IMAGE)[
                "img" in url_info && lsse.isNumeric(url_info["img"] as string)
                    ? lsse.int(url_info["img"] as string)
                    : 0
            ].NAME,
        ),
    );
}

function getImage(img_UID: number): string {
    const _default: ReturnType<typeof getImage> = "error.png";

    try {
        return getStills().filter((still: Readonly<STILL>): boolean =>
            lsse.equals(lsse.str(still.UID), lsse.str(img_UID)),
        )[0].NAME;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

function getPath(url_info: Readonly<ParsedUrlQuery>): fs.PathLike | undefined {
    const _default: ReturnType<typeof getPath> = undefined;

    try {
        const type_: string =
            "type" in url_info && typeof url_info["type"] === "string" ? (url_info["type"] as string) : "";

        if (wantsIcon(url_info)) {
            return findPath(
                ["public", "assets", type_],
                `${lsse.str(url_info["img"])}.${getIconExtension(url_info["img"] as string)}`,
            );
        }

        if (wantsFrontPageCoverImage(url_info)) {
            return getFrontPageCoverImagePath(url_info);
        }

        if (wantsAlbumImage(url_info)) {
            return findPath(["img", "img"], getImage(lsse.int(lsse.str(url_info["img"])))); // findPath(["img"]);
        }

        if (wantsAlbumCover(url_info)) {
            return findPath(["img", "img"], getAlbumCoverImage(url_info));
        }

        if (wantsLogo(url_info)) {
            return findPath(["public", "assets", "logo"], "logo.png");
        }

        return _default;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

/*
    subProcess.exec("npm run collect-images", (err: subProcess.ExecException | null, _output: string): void => {
        if (err) console.log(`Image collection failed:\n${err}`);
        console.log("Images were collected");
    });
*/

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
    },
);

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
