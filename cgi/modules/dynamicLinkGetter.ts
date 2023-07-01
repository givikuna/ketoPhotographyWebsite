import * as fs from 'fs';

import { supertrim } from '../extensions/syntax';
import { findPath, logErr } from './findPath'

export function getDynLink(from: string = 'index'): fs.PathLike {
    const cFunc: string = 'getDynLink';
    const _default: string = 'http://127.0.0.1';
    try {
        const fpath: fs.PathLike = findPath(['public', 'data'], 'dynamicLink.txt');
        if (fs.existsSync(fpath)) return supertrim(fs.readFileSync(fpath).toString());
        throw new Error('dynamic link not found');
    } catch (e: any) {
        return logErr(cFunc, e, _default, from);
    }
}
