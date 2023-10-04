import { Page, STILL, URLParams } from "../../../types/types";

import { getCategoryStills } from "../../api";

import { createURL, splitArrayIntoParts } from "../../extension";

const filename: string = "./pages/inPage/album.ts";

export function html(): Page {
    return {
        html: /* HTML */ `<h1>Album</h1>`,
        pageName: "album",
    };
}

export async function onload(dynamiclink: string, album: string): Promise<void> {
    try {
        const componentArray: ReadonlyArray<ReadonlyArray<string>> = splitArrayIntoParts(
            ((await getCategoryStills(dynamiclink, album)) as Readonly<Readonly<STILL>[]>).map(
                (still: Readonly<STILL>): string => /* HTML */ `
                    <img
                        id="still_${still.UID as number}"
                        src="${String(
                            createURL(`${dynamiclink}:8092/`, {
                                type: "img",
                                img: (still.UID as number).toString(),
                            } as URLParams),
                        )}"
                        class="albumImage"
                    />
                    <br />
                `,
            ),
            ((): number => {
                const screenWidth: number = window.innerWidth;

                if (screenWidth >= 1200) {
                    return 5; // Desktop
                } else if (screenWidth >= 992) {
                    return 4; // Laptop
                } else if (screenWidth >= 768) {
                    return 3; // Smaller Laptop
                } else {
                    return 1; // Anything less
                }
            })(),
        ) as string[][];

        $(`#app`).append($(/* HTML */ `<div></div>`).attr("id", `album_${album}`));

        for (let i: number = 0; i < componentArray.length; i++) {
            $(`#album_${album}`).append(
                $(/* HTML */ `<div></div>`, {
                    class: `within-div-${i + 1}`,
                    id: `album_${album}-within-div-${i + 1}`,
                })
                    .html(componentArray[i].join(/* HTML */ `<br />`))
                    .css({
                        flex: "1",
                        padding: "0px",
                        margin: "3px 2px 2px",
                    }),
            );
        }

        $(`#album_${album}`).css({
            display: "flex",
            marginLeft: "10px",
            marginRight: "10px",
        });
    } catch (e: unknown) {
        console.error(`Error at onload(dynamiclink: string, album: string): Promise<void> in ${filename}`, e);
    }
}
