// Dependencies
import { Request, Response, NextFunction } from "express";
// Models
import { User } from "../models/User";

export default async function checkAdmin(req: Request, res: Response, next: NextFunction){
    const user = await User.findOne({where: {id: req.params.idToken}});
    if(user && user.role != "user") {
        next();
    }
    else{
        return res.status(403).json({ message: "User is not superAdmin" });
    }
}