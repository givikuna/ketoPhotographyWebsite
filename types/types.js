"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.undefinedOptions = exports.imageExtensions = void 0;
exports.imageExtensions = ["jpeg", "png", "gif", "raw", "jpg"];
exports.undefinedOptions = [[], {}, "", null, undefined];
function isEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
exports.isEmail = isEmail;
