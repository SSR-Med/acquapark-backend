// Dependencies
import express, { Request, Response } from "express";
// Services
import { createMachine, modifyMachine, deleteMachine, getMachines } from "../../services/bug/MachineService";
// Error
import { errorHandler } from "../../config/CustomError";
// Helpers
import checkAdmin from "../../helpers/CheckAdmin";
import { verifyToken } from "../../helpers/Token";
// Schemas
import { validateMachineSchema } from "../../schemas/MachineSchema";

const router = express.Router();

router.get('/',verifyToken,checkAdmin, async (req: Request, res: Response) => {
  try{
    const machines = await getMachines();
    return res.status(200).json(machines);
  }
  catch(error: any){
    errorHandler(error, res);
  }
})

router.post('/',verifyToken,checkAdmin,validateMachineSchema, async (req: Request, res: Response) => {
    try{
        const machine = await createMachine(req.body);
        return res.status(201).json(machine);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})

router.delete('/:id',verifyToken,checkAdmin, async (req: Request, res: Response) => {
    try{
        const machine = await deleteMachine(Number(req.params.id));
        return res.status(200).json(machine);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})

router.put('/:id',verifyToken,checkAdmin,validateMachineSchema, async (req: Request, res: Response) => {
    try{
        const machine = await modifyMachine(Number(req.params.id),req.body);
        return res.status(200).json(machine);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})

module.exports = router;