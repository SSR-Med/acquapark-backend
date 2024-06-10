"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importStar(require("express"));
// Services
const RecordService_1 = require("../../services/record/RecordService");
// CustomError
const CustomError_1 = require("../../config/CustomError");
// Helpers
const Token_1 = require("../../helpers/Token");
// Schema
const RecordSchema_1 = require("../../schemas/RecordSchema");
const router = (0, express_1.Router)();
router.use(express_1.default.json());
// Routes
// Get all registries
router.get("/", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registries = yield (0, RecordService_1.getRegistries)(Number(req.params.idToken));
        return res.status(200).json(registries);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Create registry
router.post("/", Token_1.verifyToken, RecordSchema_1.validateRecordSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registry = yield (0, RecordService_1.createRecord)(req.body, Number(req.params.idToken));
        return res.status(201).json(registry);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Modify registry
router.put("/id/:id", Token_1.verifyToken, RecordSchema_1.validateModifyRecordSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registry = yield (0, RecordService_1.modifyRecord)(Number(req.params.id), req.body, Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Delete registry
router.delete("/id/:id", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registry = yield (0, RecordService_1.deleteRecord)(Number(req.params.id), Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
