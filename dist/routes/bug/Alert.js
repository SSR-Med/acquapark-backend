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
const AlertService_1 = require("../../services/bug/AlertService");
// Error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const Token_1 = require("../../helpers/Token");
// Schemas
const AlertSchema_1 = require("../../schemas/AlertSchema");
const router = express_1.default.Router();
router.get('/', Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = yield (0, AlertService_1.getAlerts)(Number(req.params.idToken));
        res.json(alerts);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.post('/', Token_1.verifyToken, AlertSchema_1.validateAlertSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alert = yield (0, AlertService_1.createAlert)(req.body, Number(req.params.idToken));
        res.status(201).json(alert);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.delete('/:id', Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alert = yield (0, AlertService_1.deleteAlert)(Number(req.params.id), Number(req.params.idToken));
        res.json(alert);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.put('/:id', Token_1.verifyToken, AlertSchema_1.validateAlertSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alert = yield (0, AlertService_1.modifyAlert)(Number(req.params.id), req.body, Number(req.params.idToken));
        res.json(alert);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
