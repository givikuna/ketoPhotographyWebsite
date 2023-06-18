import * as fs from 'fs';
import * as path from 'path';
import * as syntax from '../extensions/syntax';

const { len, print } = syntax;

export const findPath: Function = (folders: string[], req: string, reqFrom: string = 'index'): string => {
    const cFunc: string = 'findPath';
    const def: string = '';
    try {
        let fPath: string = "";
        let foundDir: boolean = false;
        let count: number = 0;
        let i: number = 0;
        while (i < len(folders)) {
            let folder: string = fPath + folders[i];
            if (fs.existsSync(folder)) {
                if (i === 0 && !foundDir && count === 0) {
                    foundDir = true;
                    fPath = "./"
                }
                fPath += folders[i] + "/";
                i++;
                continue;
            }
            i = -1;
            fPath += "../";
            if (count > 7) break;
            count++;
            i++;
        }
        let p: string = path.join(fPath, req);
        if (fs.existsSync(p)) return p;
        return "";
    } catch (e) {
        return logErr(cFunc, e, def, reqFrom);
    }
}

export const logErr: Function = (cFunc: string, e: any, def: any = '', filename: string): any => {
    print(`${filename} ${cFunc}() ERROR: ` + e);
    return def
}