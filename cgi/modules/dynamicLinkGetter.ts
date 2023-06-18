import * as fs from 'fs';
import * as f from './findPath';
import * as syntax from '../extensions/syntax';

const { supertrim } = syntax;
const { findPath, logErr } = f;

export const getDynLink: Function = (from: string = 'index'): string => {
    const cFunc: string = 'getDynLink';
    const def: string = 'http://127.0.0.1';
    try {
        const fpath: string = findPath(['public', 'data', 'dynLink'], 'data.txt');
        if (fs.existsSync(fpath)) return supertrim(fs.readFileSync(fpath).toString());
        throw new Error('dynamic link not found');
    } catch (e) {
        return logErr(cFunc, e, def, from);
    }
}
