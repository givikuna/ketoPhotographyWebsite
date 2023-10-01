import { Page, OnloadData } from "../../types/types";

const filename: string = "./pages/blog.ts";

export function html(): Page {
    return {
        html: /* HTML */ `<h1>Blog</h1>`,
        pageName: "blog",
    };
}

// @ts-ignore
export async function onload(data: OnloadData): Promise<void> {
    try {
        //
    } catch (e: unknown) {
        console.error(`Error at onload(data: OnloadData): Promise<void> in ${filename}`, e);
    }
}
