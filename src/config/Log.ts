// Dependencies
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
// Helpers
import { timezoned } from "../helpers/log/LogHelper";

export const customLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: timezoned
        }),
        winston.format.json(),
      ),
    transports: [
        new DailyRotateFile({
            filename: 'src/config/logs/app-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
          }),
    ]
})