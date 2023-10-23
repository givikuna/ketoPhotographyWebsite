import { Str } from "./classes";
import { PathLike } from "fs";

export type SocialMediaIcon = {
    icon: string;
    file: string;
    extension: "png" | "jpg" | "jpeg";
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
    NAME: string;
    COVER_STILL_UID: number;
    DESCRIPTION: string;
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
    COVER_STILL_UID: number;
    DESCRIPTION: string;
};

export type STILL = {
    UID: number;
    SESSION_UID: number;
    NAME: string;
    IS_FRONT_COVER_IMAGE: boolean;
};

export type Unreadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

export type Unpromisify<T> = T extends Promise<infer U> ? U : T;

export type Unarray<T> = T extends (infer U)[] ? U : T;

export type FixedArray<T, N extends number, A extends T[] = []> = A["length"] extends N
    ? A
    : FixedArray<T, N, [...A, T]>;

export type SelectRequestOption =
    | "categorySessions"
    | "sessionImages"
    | "languages"
    | "pages"
    | "albumData"
    | "categories"
    | "stills"
    | "sessions"
    | "frontPageCoverImageData"
    | "categoryImages";

export type Page = {
    html: string;
    pageName: string;
};

export type WebsiteLanguage = "en" | "ru" | "ge";

export type Language = {
    lang: string;
    display: string;
};

export type OnloadData = {
    dynamiclink: string;
    language: WebsiteLanguage;
    contactEmail: string;
};

export type AsyncFunction = (...args: any[]) => Promise<void>;

export type PageInformation = {
    pageName: Str;
    get: (...args: any[]) => Page;
    onload: AsyncFunction;
};

export type URLParams = {
    [key: string]: string;
};
