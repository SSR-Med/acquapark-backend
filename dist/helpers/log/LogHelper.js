"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timezoned = void 0;
const timezoned = () => {
    return new Date().toLocaleString('en-GB', {
        timeZone: 'America/Bogota'
    });
};
exports.timezoned = timezoned;
