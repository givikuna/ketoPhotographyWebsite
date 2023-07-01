import * as constants from '../constants/constants';

const { PORTS } = constants;

export function getPort(servername: string): number {
    const _default: number = 8080;
    if (PORTS.length === 0)
        console.log('ERROR: ports.json is not functioning properly, assigning 8080 by _defaultault to all');

    for (const server of PORTS)
        if ('port' in server && 'filename' in server && String(server.filename) === String(servername))
            return typeof server.port === 'number' ? server.port : _default;

    console.log(`${servername} ERROR: ${servername}\'s port wasn\'t found, so ${_default} will be assigned to all by dafault`);
    return _default;
}
