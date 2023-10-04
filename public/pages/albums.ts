import { Page, OnloadData, CATEGORY } from "../../types/types";
import { fetchCategories } from "../api";

const filename: string = "./pages/albums.ts";

export function html(): Page {
    return {
        html: /* HTML */ ``,
        pageName: "album",
    };
}

export async function onload(data: OnloadData): Promise<void> {
    try {
        $("#albums").html(/* HTML */ `
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        `);

        const categories: Readonly<Readonly<CATEGORY>[]> = await fetchCategories(data.dynamiclink);

        $("#albums").append(
            $("<div>", {
                id: "albums-gallery-container",
            }),
        );

        // ${dynamiclink}:8092/?type=cover&album=${categories[i].NAME}
        for (let i: number = 0; i < categories.length; i++) {
            const element: string = /* HTML */ `
                <div class="imageContainer">
                    <img
                        src="${((dynamiclink: string, category: string): string => {
                            let url: URL = new URL(`${dynamiclink}:8092/`);
                            url.searchParams.set("type", "cover");
                            url.searchParams.set("album", category);

                            return url.toString();
                        })(data.dynamiclink, categories[i].NAME)}"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                        class="albumCoverImage"
                        alt="Image ${i}"
                        id="${categories[i].NAME}AlbumCoverForAlbums"
                    />

                    <span
                        id="${categories[i].NAME}AlbumCoverForAlbumsSpan"
                        onclick="window.location.href='#album_${categories[i].NAME}'"
                    >
                        ${categories[i].NAME}
                    </span>
                </div>
            `;

            $("#albums-gallery-container").append(element);
        }

        $("#albums").append(/* HTML */ `
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        `);
    } catch (e: unknown) {
        console.error(`Error at onload(data: OnloadData): Promise<void> in ${filename}`, e);
    }
}
