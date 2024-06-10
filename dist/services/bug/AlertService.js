"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyAlert = exports.deleteAlert = exports.createAlert = exports.getAlerts = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Models
const Alert_1 = require("../../models/Alert");
const User_1 = require("../../models/User");
// Error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const DateRecord_1 = require("../../helpers/record/DateRecord");
// Log
const Log_1 = require("../../config/Log");
function getAlerts(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const alerts = yield Alert_1.Alert.findAll({
            raw: true,
            where: userAction.role === 'user' ? { id_user: idUser } : {},
            order: [['date', 'DESC']],
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('user.name'), 'name'],
                [sequelize_1.Sequelize.col('user.document'), 'document'],
                [sequelize_1.Sequelize.col('user.document_type'), 'document_type'],
                'bug',
                'machine',
                'date'
            ],
            include: [
                {
                    model: User_1.User,
                    attributes: [],
                    required: true
                }
            ]
        });
        return alerts;
    });
}
exports.getAlerts = getAlerts;
function createAlert(AlertInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        AlertInterface.id_user = idUser;
        if (!(0, DateRecord_1.checkDate)(AlertInterface.date)) {
            throw new CustomError_1.httpError('La fecha no es válida', 400);
        }
        const alert = yield Alert_1.Alert.create(Object.assign(Object.assign({}, AlertInterface), { date: new Date(AlertInterface.date) }));
        Log_1.customLogger.info(`El usuario con la id ${idUser} creó una alarma de la máquina ${AlertInterface.machine} con el fallo ${AlertInterface.bug}`);
        return { message: "Alarma creada" };
    });
}
exports.createAlert = createAlert;
function deleteAlert(id, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const alert = yield Alert_1.Alert.findOne({ where: { id: id } });
        if (!alert) {
            throw new CustomError_1.httpError('No se encontró la alarma', 404);
        }
        if (userAction.role === 'user' && alert.id_user != idUser) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        yield alert.destroy();
        Log_1.customLogger.info(`El usuario con la id ${idUser} eliminó una alarma de la máquina ${alert.machine} con el fallo ${alert.bug}`);
        return { message: "Alarma eliminada" };
    });
}
exports.deleteAlert = deleteAlert;
function modifyAlert(id, ModifyAlertInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const alert = yield Alert_1.Alert.findOne({ where: { id: id } });
        if (!alert) {
            throw new CustomError_1.httpError('No se encontró la alarma', 404);
        }
        if (!(0, DateRecord_1.checkDate)(ModifyAlertInterface.date)) {
            throw new CustomError_1.httpError('La fecha no es válida', 400);
        }
        // Check if user exists with document and document_type
        const user = yield User_1.User.findOne({ where: { document: ModifyAlertInterface.document, document_type: ModifyAlertInterface.document_type } });
        if (!user) {
            throw new CustomError_1.httpError('No se encontró el usuario', 404);
        }
        // Check if the user is an user, if it is then he shouldnt be allowed to modify other users alerts
        if (userAction.role === 'user' && alert.id_user != idUser || (userAction.role === 'user' && alert.id_user != user.id)) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        // Change the date and user id
        ModifyAlertInterface.id_user = user.id;
        yield alert.update(Object.assign(Object.assign({}, ModifyAlertInterface), { date: new Date(ModifyAlertInterface.date) }));
        Log_1.customLogger.info(`El usuario con la id ${idUser} modificó una alarma de la máquina ${alert.machine} con el fallo ${alert.bug}`);
        return { message: "Alarma modificada" };
    });
}
exports.modifyAlert = modifyAlert;
