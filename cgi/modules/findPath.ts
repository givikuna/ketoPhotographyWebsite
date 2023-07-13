import * as path from 'path'

import { existsSync, PathLike } from 'fs'

export function findPath(folders: string[], req: string, reqFrom: string = 'index'): string | PathLike {
    const cFunc: string = 'findPath'
    const default_: string = ''
    try {
        let fPath: string = ""
        let foundDir: boolean = false
        let count: number = 0
        let i: number = 0
        while (i < folders.length) {
            let folder: string = fPath + folders[i]
            if (existsSync(folder)) {
                if (i === 0 && !foundDir && count === 0) {
                    foundDir = true
                    fPath = "./"
                }
                fPath += folders[i] + "/"
                i++
                continue
            }
            i = -1
            fPath += "../"
            if (count > 7) break
            count++
            i++
        }
        let p: string | PathLike = path.join(fPath, req)
        if (existsSync(p)) return p
        return default_
    } catch (e: unknown) {
        return logErr(cFunc, e, default_, reqFrom)
    }
}

export function logErr(cFunc: string, e: any | unknown, default_: any = '', filename: string): any {
    console.log(`${filename} ${cFunc}() ERROR: ${e}`)
    return default_
}
