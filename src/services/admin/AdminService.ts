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

export async function getUserByDocument(document_type:string,document:number){
    const user = await User.findOne({where:{document:document,document_type:document_type}});
    if(!user){
        throw new httpError('No se encontró al usuario',404);
    }
    return {id: user.id}
}

export async function changeStateUser(id:number,idUser:number){
    // Search for the user making the action
    const admin = await User.findOne({where:{id:idUser}});

    const user = await User.findOne({where:{id:id}});
    if(!user){
        throw new httpError('No se encontró al usuario',404);
    }
    // Cant change your ouwn state, superadmin cant be changed, admins cant change admins
    if (user.role == 'superadmin' || (user.role == 'admin' && admin.role == 'admin') || user.id == idUser){
        throw new httpError('No se puede realizar la acción',401);
    }
    
    user.update({active:!user.active});
    return {message: "Estado del usuario modificado"};
}

export async function createUser(UserInterface: UserInterface, idUser:number){
    // Search for the user making the action
    const admin = await User.findOne({where:{id:idUser}});

    const userDocument = await User.findOne({where:{document:UserInterface.document, document_type:UserInterface.document_type}});
    if(userDocument){
        throw new httpError('Usuario ya existe',400);
    }

    // No one can create a superadmin, admins cant create admins
    if (UserInterface.role == 'superadmin' || (UserInterface.role == 'admin' && admin.role == 'admin')){
        throw new httpError('No se puede realizar la acción',401);
    }

    UserInterface.password = generatePassword(UserInterface.password)
    await User.create(UserInterface);
    return {message: "Nuevo usuario creado"};
}

export async function modifyUser(id:number, UserInterface: UserInterface,idUser:number){
    // Search for the user making the action
    const admin = await User.findOne({where:{id:idUser}});

    const user = await User.findOne({where:{id:id}});
    if(!user){
        throw new httpError('No se encuentra al usuario',404);
    }
    const userDocument = await User.findOne({where:{document:UserInterface.document, document_type:UserInterface.document_type}});
    if(userDocument && userDocument.id != id){
        throw new httpError('Ya existe el usuario',400);
    }

    // Admins cant modify admins, cant change their own role or active state, superadmin cant be modified if the user is not a superadmin,
    // If you were not a superadmin, you cant be a superadmin
    if((admin.role == 'admin' && user.role == 'admin' && user.id != idUser) 
        || (user.id == idUser && UserInterface.role != user.role) || (user.id == idUser && UserInterface.active != user.active)
        || (user.role == 'superadmin' && admin.role != 'superadmin') || (UserInterface.role == 'superadmin' && user.role != 'superadmin')){
        throw new httpError('No se puede realizar la acción',401);
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

