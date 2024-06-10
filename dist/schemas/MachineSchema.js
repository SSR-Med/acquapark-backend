"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMachineSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
const MachineSchema = zod_1.z.object({
    name: zod_1.z.string().min(1)
});
// Validator
exports.validateMachineSchema = (0, Validator_1.validate)(MachineSchema);
