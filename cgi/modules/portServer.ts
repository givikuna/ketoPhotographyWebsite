import { logErr } from "./findPath";

import { Ports } from "../constants/constants";

export function getPort(servername: Readonly<string>): number {
    const cFunc: string = "getPort";
    const default_: number = 8080;
    try {
        return Ports[servername as keyof typeof Ports];
    } catch (e: unknown) {
        return logErr(cFunc, e, default_, servername);
    }
}
