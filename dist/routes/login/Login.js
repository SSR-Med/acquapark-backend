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
const UserService_1 = require("../../services/user/UserService");
// Validate
const UserSchema_1 = require("../../schemas/UserSchema");
// Custom error
const CustomError_1 = require("../../config/CustomError");
const router = express_1.default.Router();
router.post('/', UserSchema_1.validateLoginSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, UserService_1.login)(req.body);
        if (token) {
            return res.status(200).json({ token });
        }
        else {
            throw new CustomError_1.httpError('Error en la contraseña o usuario', 400);
        }
    }
    catch (error) {
        (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
