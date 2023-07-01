import * as fs from 'fs';

import { logErr, findPath } from './findPath';

export function getIcons(): any {
    const cFunc: string = 'getIcons';
    const default_: any[] = [
        {
            "icon": "facebook",
            "file": "facebook.png"
        },
        {
            "icon": "flickr",
            "file": "flickr.png"
        },
        {
            "icon": "instagram",
            "file": "instagram.svg"
        },
        {
            "icon": "pinterest",
            "file": "pinterest.svg"
        },
        {
            "icon": "youtube",
            "file": "youtube.png"
        }
    ];
    try {
        return fs.readFileSync(findPath(['public', 'assets'], 'icons.json'), 'utf-8');
    } catch (e: any) {
        return logErr(cFunc, e, default_, 'img');
    }
}
