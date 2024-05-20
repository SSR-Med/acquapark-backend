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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importStar(require("express"));
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Services
const ReferenceService_1 = require("../../services/reference/ReferenceService");
// Helpers
const Token_1 = require("../../helpers/Token");
const CheckAdmin_1 = __importDefault(require("../../helpers/CheckAdmin"));
// Schema
const ReferenceSchema_1 = require("../../schemas/ReferenceSchema");
const router = (0, express_1.Router)();
router.use(express_1.default.json());
router.get("/", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const references = yield (0, ReferenceService_1.getReferences)();
        return res.status(200).json(references);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Return name reference
router.get("/id_number/:id_number", Token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reference = yield (0, ReferenceService_1.getNameReferenceByIdNumber)(Number(req.params.id_number));
        return res.status(200).json(reference);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.delete("/id/:id", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reference = yield (0, ReferenceService_1.deleteReference)(Number(req.params.id));
        return res.status(200).json(reference);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.post("/", Token_1.verifyToken, CheckAdmin_1.default, ReferenceSchema_1.validateReferenceSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reference = yield (0, ReferenceService_1.createReference)(req.body);
        return res.status(201).json(reference);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.put("/id/:id", Token_1.verifyToken, CheckAdmin_1.default, ReferenceSchema_1.validateReferenceSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reference = yield (0, ReferenceService_1.modifyReference)(Number(req.params.id), req.body);
        return res.status(200).json(reference);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
