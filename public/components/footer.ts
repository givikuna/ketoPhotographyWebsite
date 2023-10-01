const filename: string = "./components/footer.ts";

export function html(dynamiclink: string): string {
    const _default: ReturnType<typeof html> = "";

    try {
        return /* HTML */ `
            <footer>
                <a href="https://www.facebook.com">
                    <img
                        src="${dynamiclink}:8092/?type=icons&img=facebook"
                        alt="Facebook"
                        class="SocialMediaIcon"
                    />
                </a>
                <a href="https://www.flickr.com">
                    <img
                        src="${dynamiclink}:8092/?type=icons&img=flickr"
                        alt="Flickr"
                        class="SocialMediaIcon"
                    />
                </a>
                <a href="https://www.instagram.com">
                    <img
                        src="${dynamiclink}:8092/?type=icons&img=instagram"
                        alt="Instagram"
                        class="SocialMediaIcon"
                    />
                </a>
                <a href="https://www.pinterest.com">
                    <img
                        src="${dynamiclink}:8092/?type=icons&img=pinterest"
                        alt="Pinterest"
                        class="SocialMediaIcon"
                    />
                </a>
                <a href="https://www.youtube.com">
                    <img
                        src="${dynamiclink}:8092/?type=icons&img=youtube"
                        alt="YouTube"
                        class="SocialMediaIcon"
                    />
                </a>

                <br />
                <br />

                <div>
                    <p>
                        <a
                            href="#contact"
                            class="contact-link"
                        >
                            Contact Me
                        </a>
                    </p>
                    <p>
                        <a
                            href="#home"
                            class="contact-link"
                        >
                            Home
                        </a>
                    </p>
                </div>
            </footer>

            <br />
            <br />
        `;
    } catch (e: unknown) {
        console.error(`Error at html(dynamiclink: string): string in ${filename}`, e);
        return _default;
    }
}
