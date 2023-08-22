"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = void 0;
var findPath_1 = require("./findPath");
var constants_1 = require("../constants/constants");
function getPort(servername) {
    var cFunc = "getPort";
    var default_ = 8080;
    try {
        return constants_1.Ports[servername];
    } catch (e) {
        return (0, findPath_1.logErr)(cFunc, e, default_, servername);
    }
}
exports.getPort = getPort;
