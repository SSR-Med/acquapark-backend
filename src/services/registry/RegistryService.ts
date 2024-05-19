// Models
import { Registry } from "../../models/Registry";
import { Reference } from "../../models/Reference";
import { User } from "../../models/User";
// Custom error
import { httpError } from "../../config/CustomError";
// Schema
import { RegistryInterface } from "../../schemas/RegistrySchema";
// Helpers
import { checkDate } from "../../helpers/registry/DateRegistry";

export async function getRegistries(idUser:Number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const registries = await Registry.findAll({
        where: userAction.role === 'user' ? { id_user: idUser } : {},
    });
    return registries;
}

export async function deleteRegistry(id:Number,idUser:Number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const registry = await Registry.findOne({where:{id:id}});
    if(!registry){
        throw new httpError('No se encontró el registro',404);
    }

    if (userAction.role === 'user' && registry.id_user != idUser){
        throw new httpError('No se puede realizar la acción',401);
    }

    registry.destroy();
    return {message: "Registro eliminado"};
}

export async function createRegistry(RegistryInterface: RegistryInterface,idUser:Number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    // If the user is not an admin, the id_user must be the same as the id of the user making the action
    if(userAction.role === 'user' && RegistryInterface.id_user !== idUser){
        throw new httpError('No se puede realizar la acción',401);
    }
    // Check if the date is valid
    if (!checkDate(RegistryInterface.date)){
        throw new httpError('Fecha inválida',400);
    }
    await Registry.create({...RegistryInterface, date: new Date(RegistryInterface.date)});
    return {message: "Nuevo registro creado"};
}

export async function modifyRegistry(id:Number,RegistryInterface: RegistryInterface,idUser:Number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const registry = await Registry.findOne({where:{id:id}});
    if(!registry){
        throw new httpError('No se encontró el registro',404);
    }
    if(userAction.role === 'user' && registry.id_user != idUser || (userAction.role === 'user' && RegistryInterface.id_user != idUser)){
        throw new httpError('No se puede realizar la acción',401);
    }
    // Check if the date is valid
    if (!checkDate(RegistryInterface.date)){
        throw new httpError('Fecha inválida',400);
    }
    await registry.update({...RegistryInterface, date: new Date(RegistryInterface.date)});
    return {message: "Registro modificado"};
}