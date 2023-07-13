import * as fs from 'fs';

import { Page } from '../types/types';

import { isJSON } from '../extensions/syntax';
import { findPath } from './findPath';

export function getPages(): Page[] | undefined {
    const _default: undefined = undefined
    try {
        const fpath: string | fs.PathLike = findPath(['public', 'data'], 'pages.json')
        return fs.existsSync(fpath) ? (isJSON(fs.readFileSync(fpath, 'utf-8')) ? JSON.parse(fs.readFileSync(fpath, 'utf-8')) : ['ERROR']) : ['ERROR']
    } catch (e: unknown) {
        console.log(e)
        return _default
    }
}
