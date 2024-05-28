"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModifyRecordSchema = exports.validateRecordSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
const RecordSchema = zod_1.z.object({
    reference: zod_1.z.string(),
    date: zod_1.z.string(),
    weight: zod_1.z.number(),
    large: zod_1.z.number()
});
const modifyRecordSchema = zod_1.z.object({
    document_type: zod_1.z.string(),
    document: zod_1.z.number(),
}).merge(RecordSchema);
// Validator
exports.validateRecordSchema = (0, Validator_1.validate)(RecordSchema);
exports.validateModifyRecordSchema = (0, Validator_1.validate)(modifyRecordSchema);
