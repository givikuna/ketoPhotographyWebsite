import { Unpromisify, CATEGORY, SelectRequestOption, STILL, URLParams } from "../types/types";

import { createURL } from "./extension";

const filename: string = "./api.ts";

export async function fetchCategories(dynamiclink: string): Promise<Readonly<Array<Readonly<CATEGORY>>>> {
    const _default: Unpromisify<ReturnType<typeof fetchCategories>> = [] satisfies Readonly<
        Readonly<CATEGORY>[]
    >;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "categories" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<Readonly<CATEGORY>[]> = JSON.parse(
            JSON.stringify(await response.json()),
        ) satisfies Readonly<Readonly<CATEGORY>[]>;

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error(
            `Error at fetchCategories(dynamiclink: string): Promise<Readonly<Readonly<CATEGORY>[]>> in ${filename}`,
            e,
        );
        return _default;
    }
}

export async function getCategoryStills(
    dynamiclink: string,
    category: string | number,
): Promise<Readonly<Readonly<STILL>[]>> {
    const _default: Unpromisify<ReturnType<typeof getCategoryStills>> = [] satisfies Readonly<
        Readonly<STILL>[]
    >;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "categoryImages" satisfies SelectRequestOption);
        url.searchParams.set("category", String(category));

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<Readonly<STILL>[]> = JSON.parse(
            JSON.stringify(await response.json()),
        ) satisfies Readonly<Readonly<STILL>[]>;

        if (typeof data === "string") {
            return JSON.parse(data);
        }

        return data;
    } catch (e: unknown) {
        console.error(
            `Error at getCategoryStills(dynamiclink: string, category: string | number): Promise<Readonly<Readonly<STILL>[]>> in ${filename}`,
            e,
        );
        return _default;
    }
}

export async function getHomepageCoverImagesURLs(dynamiclink: string): Promise<ReadonlyArray<URL>> {
    const _default: Unpromisify<ReturnType<typeof getHomepageCoverImagesURLs>> = [];

    try {
        return ((arr: ReadonlyArray<URL>): ReadonlyArray<URL> => {
            return arr.length < 2 ? arr : [arr[arr.length - 1], ...arr.slice(1, arr.length - 1), arr[0]];
        })(
            (await getHomepageCoverStills(dynamiclink)).map(
                (_: Readonly<STILL>, i: number): URL =>
                    createURL(`${dynamiclink}:8092/`, {
                        type: "frontPageCoverImage",
                        img: i.toString(),
                    } satisfies URLParams) as URL,
            ),
        );
    } catch (e: unknown) {
        console.error(
            `Error at getHomepageCoverImagesURLs(dynamiclink: string): Promise<ReadonlyArray<URL>> in ${filename}`,
            e,
        );
        return _default;
    }
}

export async function getHomepageCoverStills(dynamiclink: string): Promise<Readonly<Readonly<STILL>[]>> {
    const _default: Unpromisify<ReturnType<typeof getHomepageCoverStills>> = [] satisfies Readonly<
        Readonly<STILL>[]
    >;

    try {
        const url: URL = new URL(`${dynamiclink}:8094/`);
        url.searchParams.set("data", "frontPageCoverImageData" satisfies SelectRequestOption);

        const response: Readonly<Response> = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Readonly<Readonly<STILL>[]> = JSON.parse(
            JSON.stringify((await response.json()) as Readonly<Readonly<STILL>[]>),
        );

        return data;
    } catch (e: unknown) {
        console.error(
            `Error at getHomepageCoverStills(dynamiclink: string): Promise<Readonly<Readonly<STILL>[]>> in ${filename}`,
            e,
        );
        return _default;
    }
}
