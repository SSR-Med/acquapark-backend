"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_key = exports.salt = exports.database_host = exports.database_url = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT;
exports.database_url = process.env.DATABASE_URL;
exports.database_host = process.env.DATABASE_HOST;
exports.salt = Number(process.env.SALT);
exports.jwt_key = process.env.JWT_KEY;
