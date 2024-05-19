// Models
import { Reference } from "../../models/Reference";
// Custom error
import { httpError } from "../../config/CustomError";
// Schema
import { ReferenceInterface } from "../../schemas/ReferenceSchema";

export async function getReferences(){
    const references = await Reference.findAll();
    return references;
}

export async function getNameReferenceByIdNumber(id_number:Number){
    const reference = await Reference.findOne({where:{id_number:id_number}});
    if(!reference){
        throw new httpError('No se encontró la referencia',404);
    }
    return {name: reference.name};
}

export async function deleteReference(id:Number){
    const reference = await Reference.findOne({where:{id:id}});
    if(!reference){
        throw new httpError('No se encontró la referencia',404);
    }
    reference.destroy();
    return {message: "Referencia eliminada"};
}

export async function createReference(ReferenceInterface: ReferenceInterface){
    const referenceName = await Reference.findOne({where:{name:ReferenceInterface.name}});
    if (referenceName){
        throw new httpError('Ya existe una referencia con ese nombre',400);
    }
    const referenceId = await Reference.findOne({where:{id_number:ReferenceInterface.id_number}});
    if (referenceId){
        throw new httpError('Ya existe una referencia con ese id',400);
    }
    await Reference.create(ReferenceInterface);
    return {message: "Nueva referencia creada"};
}

export async function modifyReference(id:Number,ReferenceInterface: ReferenceInterface){
    const reference = await Reference.findOne({where:{id:id}});
    if(!reference){
        throw new httpError('No se encontró la referencia',404);
    }
    const referenceId = await Reference.findOne({where:{id_number:ReferenceInterface.id_number}});
    if (referenceId && referenceId.id != id){
        throw new httpError('Ya existe una referencia con ese id',400);
    }
    const referenceName = await Reference.findOne({where:{name:ReferenceInterface.name}});
    if (referenceName && referenceName.id != id){
        throw new httpError('Ya existe una referencia con ese nombre',400);
    }
    reference.update(ReferenceInterface);
    return {message: "Referencia modificada"};
}