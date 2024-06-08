// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface BugInterface {
    name: string;
}

// Schema
const BugSchema = z.object({
    name: z.string().min(1)
})

// Validator
export const validateBugSchema = validate(BugSchema);