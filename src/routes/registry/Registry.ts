// Dependencies
import express, { Router } from "express";
// Services
import { getRegistries, createRegistry, modifyRegistry, deleteRegistry } from "../../services/registry/RegistryService";
// CustomError
import { errorHandler } from "../../config/CustomError";
// Helpers
import { verifyToken } from "../../helpers/Token";
// Schema
import { validateRegistrySchema } from "../../schemas/RegistrySchema";

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
        return errorHandler(error, res);
    }
})

// Create registry
router.post("/",verifyToken,validateRegistrySchema, async (req, res) => {
    try{
        const registry = await createRegistry(req.body,Number(req.params.idToken));
        return res.status(201).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Modify registry
router.put("/id/:id",verifyToken,validateRegistrySchema, async (req, res) => {
    try{
        const registry = await modifyRegistry(Number(req.params.id),req.body,Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Delete registry
router.delete("/id/:id",verifyToken, async (req, res) => {
    try{
        const registry = await deleteRegistry(Number(req.params.id),Number(req.params.idToken));
        return res.status(200).json(registry);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

module.exports = router;