import { main, windowSizeCheck, getPage, nextHomepageImage, hashchangeEvent } from "./app";

document.addEventListener("DOMContentLoaded", async () => {
    await main("@dynamiclink", "@language", "@contactemail");
});

window.addEventListener("resize", windowSizeCheck);

setInterval(function (): void {
    if (getPage() === "home") {
        nextHomepageImage();
    }
}, 10000);

window.addEventListener("hashchange", () => {
    console.log(`changing page to ${getPage()}`);
    hashchangeEvent();
});
