// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface AlertInterface {
    id_user?: number;
    bug: string;
    machine: string;
    date: string;
}

export interface ModifyAlertInterface extends AlertInterface {
    document_type: string;
    document: number;
}


// Schema
const AlertSchema = z.object({
    bug: z.string().min(1),
    machine: z.string().min(1),
    date: z.string()
})

// Validator
export const validateAlertSchema = validate(AlertSchema);