// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface 
export interface RegistryInterface {
    id_user: number;
    reference: string;
    date: string;
    weight: number;
    large: number;
}

// Schema
export const RegistrySchema = z.object({
    id_user: z.number(),
    reference: z.string(),
    date: z.string(),
    weight: z.number(),
    large: z.number()
})
// Validator
export const validateRegistrySchema = validate(RegistrySchema);