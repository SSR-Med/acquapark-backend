// Dependencies
import { Sequelize } from "sequelize";
// Models
import { Record } from "../../models/Record";
import { User } from "../../models/User";
// Custom error
import { httpError } from "../../config/CustomError";
// Schema
import { RecordInterface, ModifyRecordInterface } from "../../schemas/RecordSchema";
// Helpers
import { checkDate } from "../../helpers/record/DateRecord";

export async function getRegistries(idUser:number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const records = await Record.findAll({
        raw:true,
        where: userAction.role === 'user' ? {id_user:idUser} : {}
        ,
        order: [['date', 'DESC']],
        attributes: [
            'id',
            [Sequelize.col('user.name'),'name'],
            [Sequelize.col('user.document'),'document'],
            [Sequelize.col('user.document_type'),'document_type'],
            'reference',
            'date',
            'weight',
            'large'
        ],
        include:[
        {

            model: User,
            attributes: [],
            required: true
        },
    ]});
    return records;
}

export async function deleteRecord(id:number,idUser:number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const record = await Record.findOne({where:{id:id}});
    if(!record){
        throw new httpError('No se encontró el registro',404);
    }

    if (userAction.role === 'user' && record.id_user != idUser){
        throw new httpError('No se puede realizar la acción',401);
    }

    record.destroy();
    return {message: "Registro eliminado"};
}

export async function createRecord(RecordInterface: RecordInterface,idUser:number){
    // Check if id_user
    if(!RecordInterface.id_user){
        RecordInterface.id_user = idUser;
    }
    // Check if the date is valid
    if (!checkDate(RecordInterface.date)){
        throw new httpError('Fecha inválida',400);
    }
    await Record.create({...RecordInterface, date: new Date(RecordInterface.date)});
    return {message: "Nuevo registro creado"};
}

export async function modifyRecord(id:Number,ModifyRecordInterface: ModifyRecordInterface,idUser:number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const record = await Record.findOne({where:{id:id}});
    if(!record){
        throw new httpError('No se encontró el registro',404);
    }
    // Check if user exists with document and document_type
    const user = await User.findOne({where:{document:ModifyRecordInterface.document,document_type:ModifyRecordInterface.document_type}});
    if(!user){
        throw new httpError('Usuario no encontrado',404);
    }
    // Check if the user making the action is the same as the user to be modified
    if(userAction.role === 'user' && record.id_user != idUser || (userAction.role === 'user' && user.id != idUser)){
        throw new httpError('No se puede realizar la acción',401);
    }
    // Check if the date is valid
    if (!checkDate(ModifyRecordInterface.date)){
        throw new httpError('Fecha inválida',400);
    }
    // Change the date and user id
    ModifyRecordInterface.id_user = user.id;
    await record.update({
        ...ModifyRecordInterface,
        date: new Date(ModifyRecordInterface.date)
    });
    return {message: "Registro modificado"};
}