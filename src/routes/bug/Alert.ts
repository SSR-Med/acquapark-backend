// Dependencies
import express, { Request, Response } from "express";
// Services
import { createAlert, deleteAlert, modifyAlert, getAlerts } from "../../services/bug/AlertService";
// Error
import { errorHandler } from "../../config/CustomError";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Schemas
import { validateAlertSchema } from "../../schemas/AlertSchema";

const router = express.Router();

router.get('/', verifyToken,async (req:Request,res:Response)=>{
    try{
        const alerts = await getAlerts(Number(req.params.idToken));
        res.json(alerts);
    }catch(error){
        errorHandler(error,res);
    }
})

router.post('/',verifyToken,validateAlertSchema,async (req:Request,res:Response)=>{
    try{
        const alert = await createAlert(req.body,Number(req.params.idToken));
        res.status(201).json(alert);
    }catch(error){
        errorHandler(error,res);
    }
})

router.delete('/:id',verifyToken,async (req:Request,res:Response)=>{
    try{
        const alert = await deleteAlert(Number(req.params.id),Number(req.params.idToken));
        res.json(alert);
    }catch(error){
        errorHandler(error,res);
    }
})

router.put('/:id',verifyToken,validateAlertSchema,async (req:Request,res:Response)=>{
    try{
        const alert = await modifyAlert(Number(req.params.id),req.body,Number(req.params.idToken));
        res.json(alert);
    }catch(error){
        errorHandler(error,res);
    }
})

module.exports = router;