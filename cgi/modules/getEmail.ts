import * as fs from 'fs';

import { findPath, logErr } from './findPath';
import { supertrim } from '../extensions/syntax';

export function getEmail(data: JSON | object, filename: string = 'index'): string {
    const cFunc: string = 'getEmail';
    const def: string = 'givitsvariani@proton.me';
    try {
        const fpath: fs.PathLike = findPath('arr' in data ? data.arr as string[] : [], 'file' in data ? data.file as string: '');
        if (fs.existsSync(fpath))
            return supertrim(String(fs.readFileSync(fpath)));

        throw new Error('contact email not found');
    } catch (e: any) {
        return logErr(cFunc, e, def, filename);
    }
}
