// Dependencies
import { Sequelize } from "sequelize";
// Models
import { Alert } from "../../models/Alert";
import {User} from "../../models/User";
// Error
import { httpError } from "../../config/CustomError";
// Interface
import { AlertInterface, ModifyAlertInterface } from "../../schemas/AlertSchema";
// Helpers
import { checkDate } from "../../helpers/record/DateRecord";

export async function getAlerts(idUser:number){
    const userAction = await User.findOne({where:{id:idUser}});
    const alerts = await Alert.findAll({
        raw: true,
        where: userAction.role === 'user' ? {id_user:idUser} : {},
        order: [['date', 'DESC']],
        attributes: [
            'id',
            [Sequelize.col('user.name'),'name'],
            [Sequelize.col('user.document'),'document'],
            [Sequelize.col('user.document_type'),'document_type'],
            'bug',
            'machine',
            'date'
        ],
        include:[
            {
                model: User,
                attributes: [],
                required: true
            }
        ]
    })
    return alerts
}

export async function createAlert(AlertInterface: AlertInterface,idUser:number){
    AlertInterface.id_user = idUser;
    if(!checkDate(AlertInterface.date)){
        throw new httpError('La fecha no es válida',400);
    }
    const alert = await Alert.create({...AlertInterface,date: new Date(AlertInterface.date)});
    return {message: "Alerta creada"};
}

export async function deleteAlert(id:number,idUser:number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});
    const alert = await Alert.findOne({where:{id:id}});
    if(!alert){
        throw new httpError('No se encontró la alerta',404);
    }
    if(userAction.role === 'user' && alert.id_user != idUser){
        throw new httpError('No se puede realizar la acción',401);
    }
    await alert.destroy();
    return {message: "Alerta eliminada"};
}

export async function modifyAlert(id:number,ModifyAlertInterface:ModifyAlertInterface,idUser:number){
    // Search for the user making the action
    const userAction = await User.findOne({where:{id:idUser}});

    const alert = await Alert.findOne({where:{id:id}});
    if(!alert){
        throw new httpError('No se encontró la alerta',404);
    }
    if(!checkDate(ModifyAlertInterface.date)){
        throw new httpError('La fecha no es válida',400);
    }
    // Check if user exists with document and document_type
    const user = await User.findOne({where:{document:ModifyAlertInterface.document,document_type:ModifyAlertInterface.document_type}});
    if(!user){
        throw new httpError('No se encontró el usuario',404);
    }
    // Check if the user is an user, if it is then he shouldnt be allowed to modify other users alerts
    if(userAction.role === 'user' && alert.id_user != idUser || (userAction.role === 'user' && alert.id_user != user.id)){
        throw new httpError('No se puede realizar la acción',401);
    }
    // Change the date and user id
    ModifyAlertInterface.id_user = user.id;
    await alert.update({
        ...ModifyAlertInterface,
        date: new Date(ModifyAlertInterface.date)
    })
    return {message: "Alerta modificada"};
}

