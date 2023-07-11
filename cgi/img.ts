import * as express from 'express';
import * as fs from 'fs';
import * as url from 'url';

import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import {SocialMediaIcon, WelcomeImage, ImageExtension, imageExtensions} from './types/types';

import { findPath } from './modules/findPath';
import { getPort } from './modules/portServer';
import { getIcons } from './modules/getIcons';
import { isNumeric } from './extensions/syntax';

const app: express.Application = express();

const filename: string = 'img';
const port: number = getPort(filename); // 8092

function getIconExtension(icon: string): string {
    let icons: SocialMediaIcon[] = getIcons();
    for (let i: number = 0; i < icons.length; i++)
        if (icons[i].icon === icon) return `${icons[i].extension}`;
    return 'png';
}

function getWelcomeImageExtension(img: string): string {
    const welcomeImages: WelcomeImage[] = getWelcomeImageData();
    for (let i: number = 0; i < welcomeImages.length; i++) {
        if (welcomeImages[i].img === 'img') return welcomeImages[i].extension;
    }
    return 'jpeg';
}

function getWelcomeImageData(): WelcomeImage[] {
    let images: WelcomeImage[] = [];
    let files: string[] = fs.readdirSync('public/assets/welcome');
    for (let i: number = 0; i < files.length; i++) {
        for (let j: number = 0; j < imageExtensions.length; j++) {
            if (files[i].endsWith(imageExtensions[j])) {
                images.push({
                    img: files[i].split('.')[0],
                    extension: files[i].split('.')[1] as ImageExtension,
                });
            }
        }
    }
    return images;

}

function getPath(url_info: ParsedUrlQuery): fs.PathLike | undefined {
    const type_: string = 'type' in url_info ? url_info.type as string : '';
    if (type_ === 'icons')
        return findPath(['public', 'assets', type_], `${url_info.img}.${getIconExtension(url_info.img as string)}`);
    if (type_ === 'welcome' && 'img' in url_info && isNumeric(url_info.img as string))
        return findPath(['public', 'assets', type_ as string], `${url_info.img}.${getWelcomeImageExtension(url_info.img as string).toString()}`)

    return undefined;
}

app.get('/', (req: IncomingMessage, res: ServerResponse): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data);
        return res.end();
    }
    try {
        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query;

        if (!('img' in url_info) && typeof url_info.img !== 'string' && !('type' in url_info) && typeof url_info.type == 'string')
            throw new Error('Invalid request');

        const fpath: fs.PathLike | undefined = getPath(url_info);

        return fpath !== undefined && fs.existsSync(fpath) ? w(fs.readFileSync(fpath)) : w('');
    } catch (e: any) {
        console.log(e);
        return w('');
    }
});

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`);
});
