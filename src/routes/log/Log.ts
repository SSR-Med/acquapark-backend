// Dependencies
import express, { Request, Response } from "express";
// Services
import { getLogsText, exportLogs2Excel } from "../../services/log/LogService";
// Custom error
import { errorHandler } from "../../config/CustomError";
// Helpers
import checkAdmin from "../../helpers/CheckAdmin";
import { verifyToken } from "../../helpers/Token";

const router = express.Router();

router.get("/",verifyToken,checkAdmin, async (req: Request, res: Response) => {
    try {
        const logs = getLogsText();
        return res.status(200).json({message: logs});
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/csv",verifyToken,checkAdmin, async (req: Request, res: Response) => {
    try{
        exportLogs2Excel();
        res.download("src/config/logs/csv/logs.csv");
    }catch(error: any){
        return errorHandler(error, res);
    }
})
module.exports = router;