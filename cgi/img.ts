import * as express from 'express'
import * as url from 'url'
import * as subProcess from 'child_process'

import { readdirSync, readFileSync, existsSync } from 'fs'

import { ParsedUrlQuery } from 'querystring'
import { IncomingMessage, ServerResponse } from 'http'
import { SocialMediaIcon, WelcomeImage, ImageExtension, imageExtensions, Album } from './types/types'
import { PathLike } from 'fs'

import { findPath } from './modules/findPath'
import { getPort } from './modules/portServer'
import { isNumeric } from './extensions/syntax'

const app: express.Application = express()

const filename: string = 'img'
const port: number = getPort(filename) // 8092

function getIcons(): SocialMediaIcon[] {
    const _default: SocialMediaIcon[] = [
        {
            icon: "facebook",
            file: "facebook.png",
            extension: "png",
        },
        {
            icon: "flickr",
            file: "flickr.png",
            extension: "png",
        },
        {
            icon: "instagram",
            file: "instagram.png",
            extension: "png",
        },
        {
            icon: "pinterest",
            file: "pinterest.png",
            extension: "png",
        },
        {
            icon: "youtube",
            file: "youtube.png",
            extension: "png",
        }
    ]
    try {
        return JSON.parse(readFileSync(findPath(['public', 'assets', 'icons'], 'icons.json'), 'utf-8'))
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function getIconExtension(icon: string): string {
    const _default: string = 'png'
    try {
        const icons: SocialMediaIcon[] = getIcons()
        for (let i: number = 0; i < icons.length; i++)
            if (icons[i].icon === icon) return `${icons[i].extension}`
        return _default
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function getWelcomeImageExtension(img: string): string {
    const _default: string = 'jpeg';
    try {
        const welcomeImages: WelcomeImage[] = getWelcomeImageData()
        for (let i: number = 0; i < welcomeImages.length; i++) {
            if (welcomeImages[i].img === img)
                return welcomeImages[i].extension
        }
        return _default
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function getWelcomeImageData(): WelcomeImage[] {
    const images: WelcomeImage[] = []
    try {
        const files: string[] = readdirSync('public/assets/welcome')
        for (let i: number = 0; i < files.length; i++) {
            for (let j: number = 0; j < imageExtensions.length; j++) {
                if (files[i].endsWith(imageExtensions[j]))
                    images.push({
                    img: files[i].split('.')[0],
                    extension: files[i].split('.')[1] as ImageExtension,
                })
            }
        }
        return images
    } catch (e: unknown) {
        console.log(e)
        return images
    }
}

function readAlbumData(): Album[] {
    return JSON.parse(readFileSync(findPath(['img'], 'info.json'), { encoding: 'utf8', flag: 'r' })) as Album[]
}

function getAlbumImage(url_info: ParsedUrlQuery): string {
    try {
        const albumImagesData: Album[] = readAlbumData()
        for (let i: number = 0; i < albumImagesData.length; i++) {
            if (albumImagesData[i].album === url_info.album as string)
                return albumImagesData[i].images[isNumeric(url_info.img as string) ? Number(url_info.img) : 0]
        }
        return ''
    } catch (e: unknown) {
        console.log(e)
        return ''
    }
}

function getAlbumCoverImage(url_info: ParsedUrlQuery): string {
    try {
        const albumImagesData: Album[] = readAlbumData()
        console.log(albumImagesData)
        for (let i: number = 0; i < albumImagesData.length; i++) {
            if (albumImagesData[i].album === url_info.album) return albumImagesData[i].coverImage;
        }
        return ''
    } catch (e: unknown) {
        console.log(e)
        return ''
    }
}

function wantsIcon(url_info: ParsedUrlQuery): boolean {
    const _default: boolean = false
    try {
        const type_: string = 'type' in url_info ? url_info.type as string : ''
        return type_ === 'icons' && 'img' in url_info
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function wantsAlbumCover(url_info: ParsedUrlQuery): boolean {
    const _default: boolean = false
    try {
        const type_: string = 'type' in url_info ? url_info.type as string : ''
        return type_ === 'cover' && 'album' in url_info && typeof url_info.album === 'string'
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function wantsAlbumImage(url_info: ParsedUrlQuery): boolean {
    const _default: boolean = false
    try {
        const type_: string = 'type' in url_info ? url_info.type as string : ''
        return type_ === 'album' && 'album' in url_info && 'img' in url_info && typeof url_info.img === 'string'
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function wantsWelcomeImage(url_info: ParsedUrlQuery): boolean {
    const _default: boolean = false
    try {
        const type_: string = 'type' in url_info ? url_info.type as string : ''
        return type_ === 'welcome' && 'img' in url_info && isNumeric(url_info.img as string)
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}

function getPath(url_info: ParsedUrlQuery): PathLike | undefined {
    try {
        const type_: string = 'type' in url_info && typeof url_info.type === 'string' ? url_info.type as string : ''
        if (wantsIcon(url_info))
            return findPath(['public', 'assets', type_], `${url_info.img}.${getIconExtension(url_info.img as string)}`)
        if (wantsWelcomeImage(url_info))
            return findPath(['public', 'assets', type_], `${url_info.img}.${getWelcomeImageExtension(url_info.img as string).toString()}`)
        if (wantsAlbumImage(url_info))
            return findPath(['img', url_info.album as string], getAlbumImage(url_info))
        if (wantsAlbumCover(url_info))
            return findPath(['img', url_info.album as string], getAlbumCoverImage(url_info))

        return undefined
    } catch (e: unknown) {
        console.log(e)
        return undefined
    }
}

subProcess.exec('npm run collect-images', (err: subProcess.ExecException | null, _output: string): void => {
    if (err) console.log(`Image collection failed:\n${err}`)
    console.log('Images were collected')
})

app.get('/', (req: IncomingMessage, res: ServerResponse<IncomingMessage>): ServerResponse<IncomingMessage> => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" })
    const w: Function = (data: unknown | string): ServerResponse<IncomingMessage> => {
        res.write(data)
        return res.end()
    }
    try {
        if (!req.url)
            return w('')

        const url_info: ParsedUrlQuery = url.parse(req.url as string, true).query

        if (!('img' in url_info) && typeof url_info.img !== 'string' && !('type' in url_info) && typeof url_info.type == 'string')
            throw new Error('Invalid request')

        const fpath: PathLike | undefined = getPath(url_info)

        return fpath !== undefined && existsSync(fpath) ? w(readFileSync(fpath)) : w('')
    } catch (e: unknown) {
        console.log(e)
        return w('')
    }
})

app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}/`)
})
