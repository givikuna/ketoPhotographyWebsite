const filename: string = "./components/homepagenavbar.ts";

export function html(dynamiclink: string): string {
    const _default: ReturnType<typeof html> = "";

    try {
        return /* HTML */ `
            <br />
            <div
                class="navbar-container"
                id="homepagenavbar-container"
            >
                <div class="navbar homepage-navbar-div-options">
                    <a
                        id="navbar-home-option"
                        href="#home"
                    >
                        Home
                    </a>
                    <a
                        id="navbar-contact-option"
                        href="#contact"
                    >
                        Contact
                    </a>
                    <a
                        id="navbar-about-option"
                        href="#about"
                    >
                        About
                    </a>
                    <a
                        id="navbar-pricing-option"
                        href="#pricing"
                    >
                        Pricing
                    </a>
                    <a
                        id="navbar-blog-option"
                        href="#blog"
                    >
                        Blog
                    </a>
                    <a
                        id="navbar-albums-option"
                        href="#albums"
                    >
                        Albums
                    </a>
                </div>
            </div>
            <div
                id="homepage-navbar-logo-container"
                class="navbar-logo-container"
            >
                <a href="#home">
                    <img
                        src="${dynamiclink}:8092/?type=logo"
                        class="navbar-logo"
                    />
                </a>
            </div>
        `;
    } catch (e: unknown) {
        console.error(`Error at html(dynamiclink: string): string in ${filename}`, e);
        return _default;
    }
}
