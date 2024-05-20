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

// Schema
const RecordSchema = z.object({
    id_user: z.number().optional(),
    reference: z.string(),
    date: z.string(),
    weight: z.number(),
    large: z.number()
})
// Validator
export const validateRecordSchema = validate(RecordSchema);