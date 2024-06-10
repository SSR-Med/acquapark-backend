"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAlertSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
const AlertSchema = zod_1.z.object({
    bug: zod_1.z.string().min(1),
    machine: zod_1.z.string().min(1),
    date: zod_1.z.string()
});
// Validator
exports.validateAlertSchema = (0, Validator_1.validate)(AlertSchema);
