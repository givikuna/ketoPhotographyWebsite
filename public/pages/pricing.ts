import { Page, OnloadData } from "../../types/types";

const filename: string = "./pages/pricing.ts";

export function html(): Page {
    return {
        html: /* HTML */ ` <h1>Pricing</h1> `,
        pageName: "pricing",
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
