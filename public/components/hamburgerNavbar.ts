const filename: string = "./components/hamburgerNavbar.ts";

export function html(dynamiclink: string): string {
    const _default: ReturnType<typeof html> = "";

    try {
        return /* HTML */ `
            <div
                class="hamburger-button"
                onclick="hamburgerClick('navbar-div-phone')"
                id="inside-navbar-div-phone"
            >
                &#9776;
            </div>
            <!-- Hamburger Navbar -->
            <div
                class="hamburger-navbar"
                id="hamburger-navbar-for-navbar-div-phone"
            >
                <a
                    href="#home"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-home"
                >
                    Home
                </a>

                <a
                    href="#contact"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-contact"
                >
                    Contact
                </a>

                <a
                    href="#about"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-about"
                >
                    About
                </a>

                <a
                    href="#pricing"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-pricing"
                >
                    Pricing
                </a>

                <a
                    href="#blog"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-blog"
                >
                    Blog
                </a>

                <a
                    href="#albums"
                    class="hamburger-navbar-option"
                    id="hamburger-navbar-option-albums"
                >
                    Albums
                </a>
            </div>

            <div
                class="navbar-logo-container"
                id="hamburger-navbar-logo-container-for-navbar-div-phone"
            >
                <a href="#home">
                    <img
                        src="${dynamiclink}:8092/?type=logo"
                        class="navbar-logo-phone"
                    />
                </a>
            </div>
        `;
    } catch (e: unknown) {
        console.error(`Error at html(dynamiclink: string): string in ${filename}`, e);
        return _default;
    }
}
