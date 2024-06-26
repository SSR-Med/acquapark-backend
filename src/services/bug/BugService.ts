// Dependencies
import { deleteBlankSpaces,capitalizeWords } from "../../helpers/FormatString";
// Models
import { Bug } from "../../models/Bug";
// Interface
import { BugInterface } from "../../schemas/BugSchema";
// Error
import { httpError } from "../../config/CustomError";
// Log
import { customLogger } from "../../config/Log";

export async function getBugs(){
    const bugs = await Bug.findAll({
        order: [['id', 'ASC']],
    });
    return bugs;
}

export async function createBug(BugInterface: BugInterface){
    BugInterface.name = capitalizeWords(deleteBlankSpaces(BugInterface.name));
    const bug = await Bug.create(BugInterface);
    customLogger.info(`Se creó un fallo con el nombre ${BugInterface.name}`);
    return {message: "Fallo creado"};
}

export async function deleteBug(id:number){
    const bug = await Bug.findOne({where:{id:id}});
    if(!bug){
        throw new httpError('No se encontró el fallo',404);
    }
    await bug.destroy();
    customLogger.info(`Se eliminó un fallo con el nombre ${bug.name}`);
    return {message: "Fallo eliminado"};
}

export async function modifyBug(id:number,BugInterface: BugInterface){
    BugInterface.name = capitalizeWords(deleteBlankSpaces(BugInterface.name));
    const bug = await Bug.findOne({where:{id:id}});
    if(!bug){
        throw new httpError('No se encontró el fallo',404);
    }
    const bugName = await Bug.findOne({where:{name:BugInterface.name}});
    if(bugName && bugName.id != id){
        throw new httpError('Ya existe un fallo con ese nombre',400);
    }
    await bug.update(BugInterface);
    customLogger.info(`Se modificó un fallo con el nombre ${BugInterface.name}`);
    return {message: "Fallo modificado"};
}
