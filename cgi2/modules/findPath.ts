import * as fs from "fs";
import * as path from "path";

export function findPath(
    folders: ReadonlyArray<string>,
    requestedFile: string,
    reqFrom: string = "index",
): string | fs.PathLike {
    const cFunc: string = "findPath";
    const def: string = "";
    try {
        let fPath: string = "";
        let foundDir: boolean = false;
        let count: number = 0;
        let i: number = 0;
        while (i < folders.length) {
            let folder: string = fPath + folders[i];
            if (fs.existsSync(folder)) {
                if (i === 0 && !foundDir && count === 0) {
                    foundDir = true;
                    fPath = "./";
                }
                fPath += folders[i] + "/";
                i++;
                continue;
            }
            i = -1;
            fPath += "../";
            if (count > 7) {
                break;
            }
            count++;
            i++;
        }
        let p: string | fs.PathLike = path.join(fPath, requestedFile);
        if (fs.existsSync(p)) {
            return p;
        }
        return def;
    } catch (e: unknown) {
        return logErr(cFunc, e, def, reqFrom);
    }
}

export function logErr(cFunc: string, e: any, def: any = "", filename: string): any {
    console.error(`${filename} ${cFunc}() ERROR: ${e}`);
    return def;
}
