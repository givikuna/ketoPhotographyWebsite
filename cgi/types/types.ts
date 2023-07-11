export type SocialMediaIcon = {
    icon: string;
    file: string;
    extension: 'png' | 'jpg' | 'jpeg';
};

export type Language = {
    lang: string;
    display: string;
};

export type Page = {
    type: "page";
    page: string;
    display: string;
    subpages: Page[];
    components: string[];
};

export type WelcomeImage = {
    img: string;
    extension: ImageExtension;
};

export type ImageExtension = 'jpeg' | 'png' | 'gif' | 'raw' | 'jpg';

export let imageExtensions: ImageExtension[] = ['jpeg', 'png', 'gif', 'raw', 'jpg'];
