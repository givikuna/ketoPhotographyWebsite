import * as fs from 'fs';

import { supertrim } from '../extensions/syntax';
import { findPath, logErr } from './findPath'

export const getDynLink: Function = (from: string = 'index'): string => {
    const cFunc: string = 'getDynLink';
    const def: string = 'http://127.0.0.1';
    try {
        const fpath: string = findPath(['public', 'data'], 'dynamicLink.txt');
        if (fs.existsSync(fpath)) return supertrim(fs.readFileSync(fpath).toString());
        throw new Error('dynamic link not found');
    } catch (e: any) {
        return logErr(cFunc, e, def, from);
    }
}
