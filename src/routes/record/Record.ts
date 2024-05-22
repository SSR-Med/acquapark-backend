// Dependencies
import express, { Router } from "express";
// Services
import { getRegistries, createRecord, modifyRecord, deleteRecord } from "../../services/record/RecordService";
// CustomError
import { errorHandler } from "../../config/CustomError";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Schema
import { validateRecordSchema } from "../../schemas/RecordSchema";

const router = Router();
router.use(express.json());

// Routes

// Get all registries
router.get("/",verifyToken, async (req, res) => {
    try{
        const registries = await getRegistries(Number(req.params.idToken));
        return res.status(200).json(registries);
    }
    catch(error: any){
        console.log(error)
        return errorHandler(error, res);
    }
})

// Create registry
router.post("/",verifyToken,validateRecordSchema, async (req, res) => {
    try{
        const registry = await createRecord(req.body,Number(req.params.idToken));
        return res.status(201).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Modify registry
router.put("/id/:id",verifyToken,validateRecordSchema, async (req, res) => {
    try{
        const registry = await modifyRecord(Number(req.params.id),req.body,Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Delete registry
router.delete("/id/:id",verifyToken, async (req, res) => {
    try{
        const registry = await deleteRecord(Number(req.params.id),Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

module.exports = router;