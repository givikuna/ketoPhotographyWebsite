import * as constants from '../constants/constants';

const { PORTS } = constants;

export const getPort: Function = (servername) => {
    const def = 8080;
    if (PORTS.length == 0) {
        console.log("ERROR: ports.json is not functioning properly, assigning 8080 by default to all");
    }
    for (const server of PORTS) {
        if (String(server.filename) === String(servername)) {
            return server.port;
        }
    }
    console.log(servername + ' ERROR: ' + servername + '\'s port wasn\'t found, so ' + def + ' will be assigned by default');
    return def;
}
