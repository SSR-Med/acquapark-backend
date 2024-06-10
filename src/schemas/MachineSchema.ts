// Dependencies
import {z} from "zod";
// Validator
import { validate } from "../helpers/Validator";

// Interface
export interface MachineInterface {
    name: string;
}

// Schema
const MachineSchema = z.object({
    name: z.string().min(1)
})

// Validator
export const validateMachineSchema = validate(MachineSchema);