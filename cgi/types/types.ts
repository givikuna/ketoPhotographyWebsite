import { PathLike } from "fs";

export type SocialMediaIcon = {
    icon: string;
    file: string;
    extension: "png" | "jpg" | "jpeg";
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

export type Image = {
    img: string;
    extension: ImageExtension;
    path: PathLike | string;
};

export type ImageExtension = "jpeg" | "png" | "gif" | "raw" | "jpg";

export const imageExtensions: ImageExtension[] = ["jpeg", "png", "gif", "raw", "jpg"];

export type Album = {
    album: string;
    coverImage: string;
    images: string[];
    display: string;
};

export const undefinedOptions = [[], {}, "", null, undefined];

export type CATEGORY = {
    UID: number;
    SESSION_UID: number;
    NAME: string;
};

export type CUSTOMER = {
    UID: number;
    NAME: string;
    DESCRIPTION: string;
};

export type SESSION = {
    UID: number;
    CUSTOMER_UID: number;
    CATEGORY_UID: number;
    SESSION_DATE: string;
};

export type STILL = {
    UID: number;
    SESSION_UID: number;
    NAME: string;
};
