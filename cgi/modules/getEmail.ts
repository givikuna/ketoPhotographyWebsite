import { PathLike, readFileSync, existsSync } from 'fs'

import { findPath } from './findPath'
import { supertrim } from '../extensions/syntax'

export function getEmail(data: JSON | object): string {
    const _default: string = 'givitsvariani@proton.me'
    try {
        const fpath: PathLike = findPath('arr' in data ? data.arr as string[] : [], 'file' in data ? data.file as string: '')

        if (existsSync(fpath))
            return supertrim(String(readFileSync(fpath)))

        throw new Error('contact email not found')
    } catch (e: any) {
        console.log(e)
        return _default
    }
}
