// Dependencies
import express, { Request, Response } from "express";
// Services
import { createBug, deleteBug, modifyBug, getBugs } from "../../services/bug/BugService";
// Error
import { errorHandler } from "../../config/CustomError";
// Helpers
import checkAdmin from "../../helpers/CheckAdmin";
import { verifyToken } from "../../helpers/Token";
// Schemas
import { validateBugSchema } from "../../schemas/BugSchema";

const router = express.Router();

router.get('/',verifyToken,checkAdmin, async (req: Request, res: Response) => {
  try{
    const bugs = await getBugs();
    return res.status(200).json(bugs);
  }
  catch(error: any){
    errorHandler(error, res);
  }
})

router.post('/',verifyToken,checkAdmin,validateBugSchema, async (req: Request, res: Response) => {
    try{
        const bug = await createBug(req.body);
        return res.status(201).json(bug);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})

router.delete('/:id',verifyToken,checkAdmin, async (req: Request, res: Response) => {
    try{
        const bug = await deleteBug(Number(req.params.id));
        return res.status(200).json(bug);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})

router.put('/:id',verifyToken,checkAdmin,validateBugSchema, async (req: Request, res: Response) => {
    try{
        const bug = await modifyBug(Number(req.params.id),req.body);
        return res.status(200).json(bug);
    }
    catch(error: any){
        errorHandler(error, res);
    }
})



module.exports = router;