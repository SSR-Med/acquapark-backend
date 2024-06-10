"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
// Services
const LogService_1 = require("../../services/log/LogService");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const CheckAdmin_1 = __importDefault(require("../../helpers/CheckAdmin"));
const Token_1 = require("../../helpers/Token");
const router = express_1.default.Router();
router.get("/", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = (0, LogService_1.getLogsText)();
        return res.status(200).json({ message: logs });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
router.get("/csv", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, LogService_1.exportLogs2Excel)();
        res.download("src/config/logs/csv/logs.csv");
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
