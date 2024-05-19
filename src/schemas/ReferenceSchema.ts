// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface ReferenceInterface {
    id_number: number,
    name: string
}

// Schema
const ReferenceSchema = z.object({
    id_number: z.number(),
    name: z.string()
})

// Validator
export const validateReferenceSchema = validate(ReferenceSchema);