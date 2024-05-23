// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface 
export interface RecordInterface {
    id_user?: number;
    reference: string;
    date: string;
    weight: number;
    large: number;
}

export interface ModifyRecordInterface extends RecordInterface {
    document_type: string;
    document: number;
}

// Schema
const RecordSchema = z.object({
    reference: z.string(),
    date: z.string(),
    weight: z.number(),
    large: z.number()
})
const modifyRecordSchema = z.object({
    document_type: z.string(),
    document: z.number(),
}).merge(RecordSchema);
// Validator
export const validateRecordSchema = validate(RecordSchema);
export const validateModifyRecordSchema = validate(modifyRecordSchema);