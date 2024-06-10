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
const MachineService_1 = require("../../services/bug/MachineService");
// Error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const CheckAdmin_1 = __importDefault(require("../../helpers/CheckAdmin"));
const Token_1 = require("../../helpers/Token");
// Schemas
const MachineSchema_1 = require("../../schemas/MachineSchema");
const router = express_1.default.Router();
router.get('/', Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machines = yield (0, MachineService_1.getMachines)();
        return res.status(200).json(machines);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.post('/', Token_1.verifyToken, CheckAdmin_1.default, MachineSchema_1.validateMachineSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machine = yield (0, MachineService_1.createMachine)(req.body);
        return res.status(201).json(machine);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.delete('/:id', Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machine = yield (0, MachineService_1.deleteMachine)(Number(req.params.id));
        return res.status(200).json(machine);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
router.put('/:id', Token_1.verifyToken, CheckAdmin_1.default, MachineSchema_1.validateMachineSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machine = yield (0, MachineService_1.modifyMachine)(Number(req.params.id), req.body);
        return res.status(200).json(machine);
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
