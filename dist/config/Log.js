"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
// Dependencies
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
// Helpers
const LogHelper_1 = require("../helpers/log/LogHelper");
exports.customLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({
        format: LogHelper_1.timezoned
    }), winston.format.json()),
    transports: [
        new DailyRotateFile({
            filename: 'src/config/logs/app-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
        }),
    ]
});
