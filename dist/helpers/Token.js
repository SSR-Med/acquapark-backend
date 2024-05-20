"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
// Dependencies
const jwt = require('jsonwebtoken');
// Env
const Config_1 = require("../config/Config");
function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        const payload = jwt.verify(token, Config_1.jwt_key);
        req.params.idToken = payload.idNumber;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}
exports.verifyToken = verifyToken;
function createToken(id) {
    const idNumber = Number(id);
    return jwt.sign({ idNumber }, Config_1.jwt_key, { expiresIn: "10h" });
}
exports.createToken = createToken;
