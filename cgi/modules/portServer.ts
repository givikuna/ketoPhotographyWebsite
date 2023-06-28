import * as constants from '../constants/constants';

const { PORTS } = constants;

export const getPort: Function = (servername): number => {
    const def: number = 8080;
    if (PORTS.length === 0)
        console.log('ERROR: ports.json is not functioning properly, assigning 8080 by default to all');

    for (const server of PORTS)
        if ('port' in server && 'filename' in server && String(server.filename) === String(servername))
            return typeof server.port === 'number' ? server.port : def;

    console.log(`${servername} ERROR: ${servername}\'s port wasn\'t found, so ${def} will be assigned to all by dafault`);
    return def;
}
