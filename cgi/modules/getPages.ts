import * as fs from 'fs';

import { isJSON } from '../extensions/syntax';
import { findPath } from './findPath';

export function getPages(): JSON {
    const fpath: string | fs.PathLike = findPath(['public', 'data'], 'pages.json');
    return fs.existsSync(fpath) ? (isJSON(fs.readFileSync(fpath, 'utf-8')) ? JSON.parse(fs.readFileSync(fpath, 'utf-8')) : ['ERROR']) : ['ERROR'];
}
