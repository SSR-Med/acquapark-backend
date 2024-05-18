// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface UserInterface {
    document_type: string;
    document: number;
    name: string;
    password: string;
    role: string;
}

// Schema
export const documentTypeSchema = ['CC','CE','TI','PP'];
export const roleSchema = ['superadmin','admin','user'];
const UserSchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    name: z.string(),
    password: z.string().length(4),
    role: z.enum(roleSchema as [string, ...string[]]),
    active: z.boolean().optional()
})

// Validator
export const validateUserSchema = validate(UserSchema);


