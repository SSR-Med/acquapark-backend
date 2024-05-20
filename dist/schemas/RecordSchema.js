"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecordSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
const RecordSchema = zod_1.z.object({
    id_user: zod_1.z.number().optional(),
    reference: zod_1.z.string(),
    date: zod_1.z.string(),
    weight: zod_1.z.number(),
    large: zod_1.z.number()
});
// Validator
exports.validateRecordSchema = (0, Validator_1.validate)(RecordSchema);
