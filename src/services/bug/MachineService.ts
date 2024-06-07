// Dependencies
import { deleteBlankSpaces,capitalizeWords } from "../../helpers/FormatString";
// Models
import { Machine } from "../../models/Machine";
// Interface
import { MachineInterface } from "../../schemas/MachineSchema";
// Error
import { httpError } from "../../config/CustomError";

export async function getMachines(){
    const machineries = await Machine.findAll({
        order: [['id', 'ASC']],
    });
    return machineries;
}

export async function createMachine(MachineInterface: MachineInterface){
    MachineInterface.name = capitalizeWords(deleteBlankSpaces(MachineInterface.name));
    const machine = await Machine.create(MachineInterface);
    return {message: "Máquina creada"};
}

export async function deleteMachine(id:number){
    const machine = await Machine.findOne({where:{id:id}});
    if(!machine){
        throw new httpError('No se encontró la máquina',404);
    }
    machine.destroy();
    return {message: "Máquina eliminada"};
}

export async function modifyMachine(id:number,MachineInterface: MachineInterface){
    MachineInterface.name = capitalizeWords(deleteBlankSpaces(MachineInterface.name));
    const machine = await Machine.findOne({where:{id:id}});
    if(!machine){
        throw new httpError('No se encontró la maquina',404);
    }
    const machineName = await Machine.findOne({where:{name:MachineInterface.name}});
    if(machineName && machineName.id != id){
        throw new httpError('Ya existe una maquina con ese nombre',400);
    }
    machine.update(MachineInterface);
    return {message: "Máquina modificada"};
}