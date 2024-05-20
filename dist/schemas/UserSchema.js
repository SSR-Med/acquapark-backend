"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginSchema = exports.validateModifyUserSchema = exports.validateUserSchema = exports.roleSchema = exports.documentTypeSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
exports.documentTypeSchema = ['CC', 'CE', 'TI', 'PP'];
exports.roleSchema = ['superadmin', 'admin', 'user'];
const UserCreateSchema = zod_1.z.object({
    document_type: zod_1.z.enum(exports.documentTypeSchema),
    document: zod_1.z.number(),
    name: zod_1.z.string(),
    password: zod_1.z.string().length(4),
    role: zod_1.z.enum(exports.roleSchema),
    active: zod_1.z.boolean().optional()
});
const UserModifySchema = zod_1.z.object({
    document_type: zod_1.z.enum(exports.documentTypeSchema),
    document: zod_1.z.number(),
    name: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(exports.roleSchema),
    active: zod_1.z.boolean()
});
const loginSchema = zod_1.z.object({
    document_type: zod_1.z.enum(exports.documentTypeSchema),
    document: zod_1.z.number(),
    password: zod_1.z.string().length(4)
});
// Validator
exports.validateUserSchema = (0, Validator_1.validate)(UserCreateSchema);
exports.validateModifyUserSchema = (0, Validator_1.validate)(UserModifySchema);
exports.validateLoginSchema = (0, Validator_1.validate)(loginSchema);
