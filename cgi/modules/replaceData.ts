import { readFileSync, PathLike, existsSync } from "fs";

import { getDynLink } from "./dynamicLinkGetter";
import { findPath } from "./findPath";
import { print, str } from "lsse";

import { ParsedUrlQuery } from "querystring";
import { Language } from "../types/types";
import { supertrim } from "../extensions/syntax";

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
        print(e);
        return _default;
    }
}

export function getLang(url_info: Readonly<ParsedUrlQuery | JSON>): string {
    const _default: ReturnType<typeof getLang> = "en";
    try {
        return "lang" in url_info &&
            typeof url_info["lang"] === "string" &&
            getLangs().includes(url_info["lang"])
            ? str(url_info["lang"])
            : "en";
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}

export function getLangs(): Readonly<string[]> {
    const _default: Readonly<ReturnType<typeof getLangs>> = [];
    try {
        const data: Language[] = JSON.parse(
            String(readFileSync(findPath(["public", "data"], "languages.json"))),
        );
        const langs: string[] = [];
        for (let i: number = 0; i < 0; i++) {
            langs.push(data[i].lang);
        }
        return langs as Readonly<typeof langs>;
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}

export function getEmail(data: Readonly<JSON | object>): string {
    const _default: ReturnType<typeof getEmail> = "givitsvariani@proton.me" as const;
    try {
        const fpath: PathLike = findPath(
            "arr" in data ? (data.arr as string[]) : [],
            "file" in data ? (data.file as string) : "",
        );

        if (existsSync(fpath)) {
            return supertrim(String(readFileSync(fpath)));
        }

        throw new Error("contact email not found");
    } catch (e: unknown) {
        print(e);
        return _default;
    }
}
