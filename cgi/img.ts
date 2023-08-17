import * as express from "express";
import * as url from "url";
import * as fs from "fs";
// import * as subProcess from "child_process";

import { print } from "lsse";

import { ParsedUrlQuery } from "querystring";
import { IncomingMessage, ServerResponse } from "http";
import {
    SocialMediaIcon,
    WelcomeImage,
    ImageExtension,
    imageExtensions,
    Album,
    Unreadonly,
    Immutable2DArray,
} from "./types/types";

import { findPath } from "./modules/findPath";
import { getPort } from "./modules/portServer";
import { isNumeric } from "./extensions/syntax";

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
        console.log(e);
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
        console.log(e);
        return _default;
    }
}

function getWelcomeImageExtension(img: string): ImageExtension {
    const _default: ReturnType<typeof getWelcomeImageExtension> = "jpeg";

    try {
        const welcomeImages: Immutable2DArray<WelcomeImage> = getWelcomeImageData();
        for (let i: number = 0; i < welcomeImages.length; i++) {
            if (welcomeImages[i].img === img) {
                return welcomeImages[i].extension;
            }
        }

        return _default;
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function getWelcomeImageData(): Immutable2DArray<WelcomeImage> {
    const _default: ReturnType<typeof getWelcomeImageData> = [];

    try {
        const images: Unreadonly<ReturnType<typeof getWelcomeImageData>> = [];
        const files: Immutable2DArray<string> = fs.readdirSync("public/assets/welcome");

        for (let i: number = 0; i < files.length; i++) {
            for (let j: number = 0; j < imageExtensions.length; j++) {
                if (files[i].endsWith(imageExtensions[j])) {
                    images.push({
                        img: files[i].split(".")[0],
                        extension: files[i].split(".")[1] as ImageExtension,
                    });
                }
            }
        }

        return images as Immutable2DArray<WelcomeImage>;
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function readAlbumData(): Immutable2DArray<Album> | Readonly<unknown> {
    const _default: Readonly<ReturnType<typeof readAlbumData>> = [];

    try {
        return JSON.parse(
            fs.readFileSync(findPath(["img"], "info.json"), {
                encoding: "utf8",
                flag: "r",
            }),
        ) as Immutable2DArray<Album>;
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

/*
function getAlbumImage(url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getAlbumImage> = "";
    try {
        const albumImagesData: Album[] | unknown = readAlbumData();

        if (!Array.isArray(albumImagesData)) {
            throw new Error("ERROR: unable to read album data");
        }

        for (let i: number = 0; i < albumImagesData.length; i++) {
            if (albumImagesData[i].album === (url_info["album"] as string)) {
                return albumImagesData[i].images[
                    isNumeric(url_info["img"] as string) ? Number(url_info["img"]) : 0
                ];
            }
        }

        return "";
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}
*/

function getAlbumCoverImage(url_info: Readonly<ParsedUrlQuery>): string {
    const _default: ReturnType<typeof getAlbumCoverImage> = "";

    try {
        const albumImagesData: Immutable2DArray<Album> | unknown = readAlbumData() as Immutable2DArray<Album>;

        if (!Array.isArray(albumImagesData)) {
            throw new Error("ERROR: unable to read album data");
        }

        for (let i: number = 0; i < albumImagesData.length; i++) {
            if (albumImagesData[i].album === url_info["album"]) {
                return albumImagesData[i].coverImage;
            }
        }

        return "";
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function wantsIcon(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsIcon> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "icons" && "img" in url_info;
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function wantsAlbumCover(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsAlbumCover> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "cover" && "album" in url_info && typeof url_info["album"] === "string";
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function wantsAlbumImage(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsAlbumImage> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "album" && "img" in url_info && typeof url_info["img"] === "string";
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function wantsWelcomeImage(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsWelcomeImage> = false;

    try {
        const type_: string = "type" in url_info ? (url_info["type"] as string) : "";
        return type_ === "welcome" && "img" in url_info && isNumeric(url_info["img"] as string);
    } catch (e: unknown) {
        console.log(e);
        return _default;
    }
}

function wantsLogo(url_info: Readonly<ParsedUrlQuery>): boolean {
    const _default: ReturnType<typeof wantsLogo> = false;

    try {
        return "type" in url_info && typeof url_info["type"] === "string" && url_info["type"] === "logo";
    } catch (e: unknown) {
        console.log(e);
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
                `${url_info["img"]}.${getIconExtension(url_info["img"] as string)}`,
            );
        }
        if (wantsWelcomeImage(url_info)) {
            return findPath(
                ["public", "assets", type_],
                `${url_info["img"]}.${getWelcomeImageExtension(url_info["img"] as string).toString()}`,
            );
        }
        if (wantsAlbumImage(url_info)) {
            return findPath(["img", "img"], url_info["img"] as string); // findPath(["img"]);
        }
        if (wantsAlbumCover(url_info)) {
            return findPath(["img", "img"], getAlbumCoverImage(url_info));
        }
        if (wantsLogo(url_info)) {
            return findPath(["public", "assets", "logo"], "logo.png");
        }

        return _default;
    } catch (e: unknown) {
        console.log(e);
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
            print(e);
            return w("");
        }
    },
);

app.listen(port, (): void => {
    print(`Server is running on http://localhost:${port}/`);
});
