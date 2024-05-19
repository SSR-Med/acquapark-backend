// Dependencies
import express, { Router } from "express";
// Services
import { getUsers, getUserIdByDocument, createUser, changeStateUser, modifyUser } from "../../services/admin/AdminService";
// CustomError
import { errorHandler } from "../../config/CustomError";
// Validate user schema 
import { validateUserSchema, validateModifyUserSchema } from "../../schemas/UserSchema";
// Helpers
import { verifyToken } from "../../helpers/Token";
import checkAdmin from "../../helpers/CheckAdmin";

const router = Router();
router.use(express.json());

// Routes

// Get all users
router.get("/", verifyToken,checkAdmin,async (req, res) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Get user id by document type and document
router.get("/document/:document_type/:document",verifyToken,checkAdmin, async (req, res) => {
    try{
        const user = await getUserIdByDocument(req.params.document_type,Number(req.params.document));
        return res.status(200).json(user);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Create user
router.post("/",verifyToken,checkAdmin,validateUserSchema, async (req, res) => {
    try{
        const user = await createUser(req.body,Number(req.params.idToken));
        return res.status(201).json(user);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Disable user
router.patch("/id/:id",verifyToken,checkAdmin, async (req, res) => {
    try{
        const user = await changeStateUser(Number(req.params.id),Number(req.params.idToken));
        return res.status(200).json(user);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

// Modify user
router.put("/id/:id",verifyToken,checkAdmin,validateModifyUserSchema, async (req, res) => {
    try{
        const user = await modifyUser(Number(req.params.id), req.body,Number(req.params.idToken));
        return res.status(200).json(user);
    }
    catch(error: any){
        return errorHandler(error, res);
    }
})

module.exports = router;