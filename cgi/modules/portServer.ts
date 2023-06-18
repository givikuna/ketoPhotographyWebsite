import * as constants from '../constants/constants';
import * as syntax from '../extensions/syntax';

const { PORTS } = constants;
const { stringify, len } = syntax;

export const getPort: Function = (servername) => {
    const def = 8080;
    if (len(PORTS) == 0) {
        console.log("ERROR: ports.json is not functioning properly, assigning 8080 by default to all");
    }
    for (const server of PORTS) {
        if (stringify(server.filename) === stringify(servername)) {
            return server.port;
        }
    }
    console.log(servername + ' ERROR: ' + servername + '\'s port wasn\'t found, so ' + def + ' will be assigned by default');
    return def;
}
