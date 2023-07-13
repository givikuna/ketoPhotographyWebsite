import * as fs from 'fs'
import * as path from 'path'

import { Album, ImageExtension, imageExtensions } from './cgi/types/types'
import { findPath } from './cgi/modules/findPath'
import { getFileExtension } from './cgi/extensions/syntax'

function isImage(img: string | ImageExtension) {
    if (img == undefined || img == null) return false
    const imgExtension: string | undefined = getFileExtension(img)
    if (typeof imgExtension === 'string')
        return (imageExtensions.map((extension: ImageExtension) => extension as string)).includes(imgExtension)
    return false
}

function isDirectory(dirPath: string | fs.PathLike): boolean {
    try {
        const stats: fs.Stats = fs.statSync(dirPath)
        return stats.isDirectory()
    } catch (e: unknown) {
        console.error(e)
        return false
    }
}

const dir: string = './img'
const albumData: Album[] = JSON.parse(fs.readFileSync(findPath(['img'], 'info.json'), { encoding: 'utf8', flag: 'r' })) as Album[]

const albumDirectories: string[] = fs.readdirSync(dir).filter((item: string): boolean => fs.statSync(`${dir}/${item}`).isDirectory())

if (albumDirectories.length <= 0) process.exit()

for (let i: number = 0; i < albumDirectories.length; i++) {
    const currentDirectory: string = albumDirectories[i]
    const images: string[] = fs.readdirSync(`${dir}/${currentDirectory}`).filter((item: string): boolean => isImage(item))
    for (let o: number = 0; o < albumData.length; o++) {
        if (albumData[o].album === currentDirectory)
            albumData[o].images = images
    }
}

fs.writeFileSync(findPath(['img'], 'info.json'), JSON.stringify(albumData), 'utf8')
