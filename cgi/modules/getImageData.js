"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessions = exports.getCategories = exports.getStills = void 0;
var select_1 = require("../select");
function getStills() {
    return JSON.parse((0, select_1.getDataToReturn)("stills", {}));
}
exports.getStills = getStills;
function getCategories() {
    return JSON.parse((0, select_1.getDataToReturn)("categories", {}));
}
exports.getCategories = getCategories;
function getSessions() {
    return JSON.parse((0, select_1.getDataToReturn)("sessions", {}));
}
exports.getSessions = getSessions;
