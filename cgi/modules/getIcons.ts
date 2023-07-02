import * as fs from 'fs';

import { SocialMediaIcon } from '../types/types';

import { logErr, findPath } from './findPath';

export function getIcons(): SocialMediaIcon[] {
    const cFunc: string = 'getIcons';
    const default_: SocialMediaIcon[] = [
        {
            "icon": "facebook",
            "file": "facebook.png",
            "extension": "png"
        },
        {
            "icon": "flickr",
            "file": "flickr.png",
            "extension": "png"
        },
        {
            "icon": "instagram",
            "file": "instagram.png",
            "extension": "png"
        },
        {
            "icon": "pinterest",
            "file": "pinterest.png",
            "extension": "png"
        },
        {
            "icon": "youtube",
            "file": "youtube.png",
            "extension": "png"
        }
    ]
    try {
        return JSON.parse(fs.readFileSync(findPath(['public', 'assets', 'icons'], 'icons.json'), 'utf-8'));
    } catch (e: any) {
        return logErr(cFunc, e, default_, 'img');
    }
}
