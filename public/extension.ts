import { URLParams, FixedArray } from "../types/types";

const filename: string = "./extension.ts";

export function createURL(link: string, params: URLParams): URL | undefined {
    const _default: ReturnType<typeof createURL> = undefined;

    try {
        console.log(link);
        const url: URL = new URL(`${link}`);

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                url.searchParams.set(key, params[key]);
            }
        }

        return url;
    } catch (e: unknown) {
        console.error(
            `Error at createURL(link: string, params: URLParams): URL | undefined in ${filename}`,
            e,
        );
        return _default;
    }
}

export function splitArrayIntoParts<T, N extends number>(arr: ReadonlyArray<T>, x: N): FixedArray<T[], N> {
    const _default: ReturnType<typeof splitArrayIntoParts> = [];

    try {
        if (x <= 0) {
            throw new Error("x should be greater than 0");
        }

        if (x >= arr.length) {
            throw new Error("x should be less than the length of the array");
        }

        const result: T[][] = [];
        const length: number = arr.length;
        const partSize: number = Math.ceil(length / x);

        for (let i: number = 0; i < length; i += partSize) {
            const part: T[] = arr.slice(i, i + partSize);
            result.push(part);
        }

        return result as FixedArray<T[], N>;
    } catch (e: unknown) {
        console.error(
            `Error at splitArrayIntoParts(arr: ReadonlyArray<T>, x: N): FixedArray<T[], N> in ${filename}`,
            e,
        );
        return _default as FixedArray<T[], N>;
    }
}
