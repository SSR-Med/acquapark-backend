import express, {Router, Request, Response} from "express";

// Helpers
import { verifyToken, createToken} from "../../helpers/Token";

const router = Router();
router.use(express.json());

// Get token
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try{
        const id = req.params.idToken;
        const token = createToken(id);
        return res.status(200).json({token});
    }
    catch(error:any){
        res.status(500).json({message:"Internal server error"})
    }
});

module.exports = router;