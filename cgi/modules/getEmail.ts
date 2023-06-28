import * as fs from 'fs';

import { findPath, logErr } from './findPath';
import { supertrim } from '../extensions/syntax';

export const getEmail: Function = (data: JSON): string => {
    const cFunc: string = 'getEmail';
    const def: string = 'givitsvariani@proton.me';
    try {
        if ('arr' in data && 'file' in data && typeof data.arr === 'object' && typeof data.file === 'string') {
            const fpath: fs.PathLike = findPath(data.arr, data.file);
            if (fs.existsSync(fpath))
                return supertrim(String(fs.readFileSync(fpath)));
            throw new Error('contact email not found');
        } else
            return def;
    } catch (e: any) {
        return logErr(cFunc, e, def);
    }
}
