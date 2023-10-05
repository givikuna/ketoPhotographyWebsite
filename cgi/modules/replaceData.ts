import * as fs from "fs";

import { getDynLink } from "./dynamicLinkGetter";
import { findPath } from "./findPath";

import { ParsedUrlQuery } from "querystring";
import { Language } from "../../../types/types";

export function replaceData(
    data: string,
    url_info: Readonly<ParsedUrlQuery | JSON> = {
        lang: "en",
    },
): string {
    const _default: ReturnType<typeof replaceData> = data;

    try {
        return data
            .replace(/@dynamiclink/g, getDynLink().toString())
            .replace(/@language/g, getLang(url_info))
            .replace(
                /@contactemail/g,
                getEmail({
                    arr: ["public", "data"],
                    file: "contactemail.txt",
                }),
            );
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

export function getLang(url_info: Readonly<ParsedUrlQuery | JSON>): string {
    const _default: ReturnType<typeof getLang> = "en";

    try {
        return "lang" in url_info &&
            typeof url_info["lang"] === "string" &&
            getLangs().includes(url_info["lang"])
            ? String(url_info["lang"])
            : "en";
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

export function getLangs(): ReadonlyArray<string> {
    const _default: Readonly<ReturnType<typeof getLangs>> = [];

    try {
        const data: ReadonlyArray<Language> = JSON.parse(
            String(fs.readFileSync(findPath(["public", "data"], "languages.json"))),
        ) as ReadonlyArray<Language>;

        const langs: string[] = [];

        for (let i: number = 0; i < 0; i++) {
            langs.push(data[i].lang);
        }

        return langs as ReadonlyArray<string>;
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}

export function getEmail(data: Readonly<JSON | object>): string {
    const _default: ReturnType<typeof getEmail> = "givitsvariani@proton.me" as const;

    try {
        const fpath: fs.PathLike = findPath(
            "arr" in data ? (data.arr as ReadonlyArray<string>) : [],
            "file" in data ? (data.file as string) : "",
        );

        if (fs.existsSync(fpath)) {
            return String(fs.readFileSync(fpath))
                .replace(/\r?\n|\r/g, "")
                .trim();
        }

        throw new Error("contact email not found");
    } catch (e: unknown) {
        console.error(e);
        return _default;
    }
}
