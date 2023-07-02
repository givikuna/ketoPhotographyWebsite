export type SocialMediaIcon = {
    icon: string;
    file: string;
    extension: string;
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
    components: string[]; // You can replace "any[]" with a specific type if you have one for the components
};
