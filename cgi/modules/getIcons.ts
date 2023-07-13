import { readFileSync } from 'fs'

import { SocialMediaIcon } from '../types/types'

import { findPath } from './findPath'

export function getIcons(): SocialMediaIcon[] {
    const _default: SocialMediaIcon[] = [
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
        return JSON.parse(readFileSync(findPath(['public', 'assets', 'icons'], 'icons.json'), 'utf-8'))
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}
