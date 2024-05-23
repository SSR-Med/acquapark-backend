// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface loginInterface{
    document_type: string;
    document: number;
    password: string;
}
export interface UserInterface extends loginInterface {
    name: string;
    role: string;
    active?: boolean;
}


// Schema
export const documentTypeSchema = ['CC','CE','TI','PA'];
export const roleSchema = ['superadmin','admin','user'];
const loginSchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    password: z.string().length(4)
})
const UserCreateSchema = z.object({
    name: z.string().min(1),
    role: z.enum(roleSchema as [string, ...string[]]),
    active: z.boolean().optional()
}).merge(loginSchema);
const UserModifySchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    name: z.string().min(1),
    password: z.string(),
    role: z.enum(roleSchema as [string, ...string[]]),
    active: z.boolean()
})


// Validator
export const validateUserSchema = validate(UserCreateSchema);
export const validateModifyUserSchema = validate(UserModifySchema);
export const validateLoginSchema = validate(loginSchema);


