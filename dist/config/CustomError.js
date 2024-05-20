"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.httpError = void 0;
class httpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.httpError = httpError;
function errorHandler(error, res) {
    if (error.statusCode)
        return res.status(error.statusCode).json({ message: error.message });
    else
        return res.status(500).json({ message: 'Internal server error' });
}
exports.errorHandler = errorHandler;
