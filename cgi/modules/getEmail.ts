import * as fs from 'fs';

import { findPath, logErr } from './findPath';
import { stringify, supertrim } from '../extensions/syntax';

export const getEmail: Function = (data: JSON): string => {
    const cFunc: string = 'getEmail';
    const def: string = 'givitsvariani@proton.me';
    try {
        if ('arr' in data && 'file' in data && typeof data.arr === 'object' && typeof data.file === 'string') {
            const fpath = findPath(data.arr, data.file);
            if (fs.existsSync(fpath))
                return supertrim(stringify(fs.readFileSync(fpath)));
            throw new Error('contact email not found');
        } else
            return def;
    } catch (e) {
        return logErr(cFunc, e, def);
    }
}
