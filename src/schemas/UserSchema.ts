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
    active?: boolean;
}
export interface loginInterface{
    document_type: string;
    document: number;
    password: string;
}

// Schema
export const documentTypeSchema = ['CC','CE','TI','PP'];
export const roleSchema = ['superadmin','admin','user'];
const UserCreateSchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    name: z.string(),
    password: z.string().length(4),
    role: z.enum(roleSchema as [string, ...string[]]),
    active: z.boolean().optional()
})
const UserModifySchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    name: z.string(),
    password: z.string(),
    role: z.enum(roleSchema as [string, ...string[]]),
    active: z.boolean()
})
const loginSchema = z.object({
    document_type: z.enum(documentTypeSchema as [string, ...string[]]),
    document: z.number(),
    password: z.string().length(4)
})

// Validator
export const validateUserSchema = validate(UserCreateSchema);
export const validateModifyUserSchema = validate(UserModifySchema);
export const validateLoginSchema = validate(loginSchema);


