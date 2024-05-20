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
// Services
const AdminService_1 = require("../../services/admin/AdminService");
// CustomError
const CustomError_1 = require("../../config/CustomError");
// Validate user schema 
const UserSchema_1 = require("../../schemas/UserSchema");
// Helpers
const Token_1 = require("../../helpers/Token");
const CheckAdmin_1 = __importDefault(require("../../helpers/CheckAdmin"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
// Routes
// Get all users
router.get("/", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, AdminService_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Check admin
router.get("/check_admin", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ admin: true });
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Get user id by document type and document
router.get("/document/:document_type/:document", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AdminService_1.getUserIdByDocument)(req.params.document_type, Number(req.params.document));
        return res.status(200).json(user);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Create user
router.post("/", Token_1.verifyToken, CheckAdmin_1.default, UserSchema_1.validateUserSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AdminService_1.createUser)(req.body, Number(req.params.idToken));
        return res.status(201).json(user);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Disable user
router.patch("/id/:id", Token_1.verifyToken, CheckAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AdminService_1.changeStateUser)(Number(req.params.id), Number(req.params.idToken));
        return res.status(200).json(user);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
// Modify user
router.put("/id/:id", Token_1.verifyToken, CheckAdmin_1.default, UserSchema_1.validateModifyUserSchema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AdminService_1.modifyUser)(Number(req.params.id), req.body, Number(req.params.idToken));
        return res.status(200).json(user);
    }
    catch (error) {
        return (0, CustomError_1.errorHandler)(error, res);
    }
}));
module.exports = router;
