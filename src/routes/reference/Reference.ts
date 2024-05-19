// Dependencies
import express, { Router } from "express";
// Custom error
import { errorHandler } from "../../config/CustomError";
// Services
import { getReferences, deleteReference, modifyReference, createReference } from "../../services/reference/ReferenceService";
// Helpers
import { verifyToken } from "../../helpers/Token";
import checkAdmin from "../../helpers/CheckAdmin";
// Schema
import { validateReferenceSchema } from "../../schemas/ReferenceSchema";

const router = Router();
router.use(express.json());

router.get("/",verifyToken,checkAdmin, async (req, res) => {
    try{
        const references = await getReferences();
        return res.status(200).json(references);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

router.delete("/id/:id",verifyToken,checkAdmin, async (req, res) => {
    try{
        const reference = await deleteReference(Number(req.params.id));
        return res.status(200).json(reference);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

router.post("/",verifyToken,checkAdmin,validateReferenceSchema, async (req, res) => {
    try{
        const reference = await createReference(req.body);
        return res.status(201).json(reference);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

router.put("/id/:id",verifyToken,checkAdmin,validateReferenceSchema, async (req, res) => {
    try{
        const reference = await modifyReference(Number(req.params.id),req.body);
        return res.status(200).json(reference);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

module.exports = router;