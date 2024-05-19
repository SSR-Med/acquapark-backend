// Dependencies
import express, { Request, Response } from "express";
// Services
import { login } from "../../services/user/UserService";
// Validate
import { validateLoginSchema } from "../../schemas/UserSchema";
// Custom error
import { errorHandler, httpError } from "../../config/CustomError";

const router = express.Router();

router.post('/', validateLoginSchema ,async (req: Request, res: Response) => {
  try{
    const token = await login(req.body);
    if(token){
      return res.status(200).json({token});
    }
    else{
      throw new httpError('Error en la contraseña o usuario',400);
    }
  }
  catch(error: any){
    errorHandler(error, res);
  }
})

module.exports = router;