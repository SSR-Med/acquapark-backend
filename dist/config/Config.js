"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_key = exports.salt = exports.database_port = exports.database_password = exports.database_host = exports.database_user = exports.database_name = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT;
// Database
exports.database_name = process.env.DATABASE_NAME;
exports.database_user = process.env.DATABASE_USER;
exports.database_host = process.env.DATABASE_HOST;
exports.database_password = process.env.DATABASE_PASSWORD;
exports.database_port = Number(process.env.DATABASE_PORT);
exports.salt = Number(process.env.SALT);
exports.jwt_key = process.env.JWT_KEY;
