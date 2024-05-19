// Dependencies
const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express';
// Env
import { jwt_key } from "../config/Config";



export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        const payload = jwt.verify(token, jwt_key);
        req.params.idToken = payload.idNumber;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}

export function createToken(id: string) {
    const idNumber = Number(id);
    return jwt.sign({idNumber}, jwt_key, { expiresIn: "10h" });
}