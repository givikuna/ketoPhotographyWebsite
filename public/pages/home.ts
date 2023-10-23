import { Page, OnloadData, CATEGORY } from "../../types/types";
import { Vec } from "../../types/classes";
import { fetchCategories } from "../api";

const filename: string = "./pages/home.ts";

export function html(): Page {
    return {
        html: /* HTML */ `
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div id="album-gallery"></div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        `,
        pageName: "home",
    };
}

export async function onload(data: OnloadData): Promise<void> {
    try {
        const categories: Vec<CATEGORY> = await fetchCategories(data.dynamiclink);

        for (let i: number = 0; i < categories.len().unwrap(); i++) {
            const element: string = /* HTML */ `
                <div class="imageContainer">
                    <img
                        src="${((_dynamiclink: string, category: string): string => {
                            let url: URL = new URL(`${_dynamiclink}:8092/`);
                            url.searchParams.set("type", "cover");
                            url.searchParams.set("album", category);

                            return url.toString();
                        })(data.dynamiclink, categories[i].NAME)}"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                        class="albumCoverImage"
                        alt="Image ${i}"
                        id="${categories[i].NAME}AlbumCoverForHome"
                    />

                    <span
                        id="${categories[i].NAME}AlbumCoverForHomeSpan"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                    >
                        ${categories[i].NAME}
                    </span>
                </div>
            `;

            $("#album-gallery").append(element);
        }
    } catch (e: unknown) {
        console.error(`Error at onload(data: OnloadData): Promise<void> in ${filename}`, e);
    }
}
