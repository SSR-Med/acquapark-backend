"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generatePassword = void 0;
// Dependencies
const bcrypt = require('bcrypt');
// Env variables
const Config_1 = require("../../config/Config");
function generatePassword(password) {
    return bcrypt.hashSync(password, Config_1.salt);
}
exports.generatePassword = generatePassword;
function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
exports.comparePassword = comparePassword;
