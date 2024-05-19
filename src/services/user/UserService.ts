// Models
import { User } from "../../models/User"
// Schema
import { loginInterface } from "../../schemas/UserSchema"
// Custom Error
import { httpError } from "../../config/CustomError"
// Helpers
import { comparePassword } from "../../helpers/user/Password";
import {createToken} from "../../helpers/Token";

export async function login(loginInterface: loginInterface){
    const user = await User.findOne({where:{document:loginInterface.document, document_type:loginInterface.document_type}});
    if (!user){
        throw new httpError('Error en la contraseña o usuario',404);
    }
    const id = user.id;
    if (user && comparePassword(loginInterface.password, user.password)){
        return createToken(id)
    }else{
        throw new httpError('Error en la contraseña o usuario',400);
    }
}