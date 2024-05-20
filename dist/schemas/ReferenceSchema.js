"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReferenceSchema = void 0;
// Dependencies
const zod_1 = require("zod");
// Validator
const Validator_1 = require("../helpers/Validator");
// Schema
const ReferenceSchema = zod_1.z.object({
    id_number: zod_1.z.number(),
    name: zod_1.z.string()
});
// Validator
exports.validateReferenceSchema = (0, Validator_1.validate)(ReferenceSchema);
