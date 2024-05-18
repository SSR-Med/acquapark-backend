// Models
import { User } from "../../models/User";
// Interface
import { UserInterface } from "../../schemas/UserSchema";
// Custom error
import { httpError } from "../../config/CustomError";
// Helpers
import { generatePassword } from "../../helpers/user/Password";

export async function getUsers(){
    const users = await User.findAll();
    users.forEach((user: typeof User) => {
        user.dataValues.password = '';
    });
    return users;
}

export async function changeStateUser(id:number){
    const user = await User.findOne({where:{id:id}});
    if(!user){
        throw new httpError('No se encontró al usuario',404);
    }
    user.update({active:!user.active});
    return {message: "Estado del usuario modificado"};
}

export async function createUser(UserInterface: UserInterface){
    const userDocument = await User.findOne({where:{document:UserInterface.document, document_type:UserInterface.document_type}});
    if(userDocument){
        throw new httpError('Usuario ya existe',400);
    }
    UserInterface.password = generatePassword(UserInterface.password)
    await User.create(UserInterface);
    return {message: "Nuevo usuario creado"};
}

export async function modifyUser(id:number, UserInterface: UserInterface){
    const user = await User.findOne({where:{id:id}});
    if(!user){
        throw new httpError('No se encuentra al usuario',404);
    }
    const userDocument = await User.findOne({where:{document:UserInterface.document, document_type:UserInterface.document_type}});
    if(userDocument && userDocument.id != id){
        throw new httpError('Ya existe el usuario',400);
    }
    if (UserInterface.password){
        if (UserInterface.password.length != 4){
            UserInterface.password = user.password;
        }
        else{
            UserInterface.password = generatePassword(UserInterface.password);
        }
    }
    await user.update(UserInterface);
    return {message: "Usuario modificado"}
}

