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
exports.modifyRecord = exports.createRecord = exports.deleteRecord = exports.getRegistries = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Models
const Record_1 = require("../../models/Record");
const User_1 = require("../../models/User");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const DateRecord_1 = require("../../helpers/record/DateRecord");
function getRegistries(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const records = yield Record_1.Record.findAll({
            raw: true,
            where: userAction.role === 'user' ? { id_user: idUser } : {},
            order: [['date', 'DESC']],
            attributes: [
                'id',
                [sequelize_1.Sequelize.col('user.name'), 'name'],
                [sequelize_1.Sequelize.col('user.document'), 'document'],
                [sequelize_1.Sequelize.col('user.document_type'), 'document_type'],
                'reference',
                'date',
                'weight',
                'large'
            ],
            include: [
                {
                    model: User_1.User,
                    attributes: [],
                    required: true
                },
            ]
        });
        return records;
    });
}
exports.getRegistries = getRegistries;
function deleteRecord(id, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const record = yield Record_1.Record.findOne({ where: { id: id } });
        if (!record) {
            throw new CustomError_1.httpError('No se encontró el registro', 404);
        }
        if (userAction.role === 'user' && record.id_user != idUser) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        record.destroy();
        return { message: "Registro eliminado" };
    });
}
exports.deleteRecord = deleteRecord;
function createRecord(RecordInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if id_user
        if (!RecordInterface.id_user) {
            RecordInterface.id_user = idUser;
        }
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        // Check if the date is valid
        if (!(0, DateRecord_1.checkDate)(RecordInterface.date)) {
            throw new CustomError_1.httpError('Fecha inválida', 400);
        }
        yield Record_1.Record.create(Object.assign(Object.assign({}, RecordInterface), { date: new Date(RecordInterface.date) }));
        return { message: "Nuevo registro creado" };
    });
}
exports.createRecord = createRecord;
function modifyRecord(id, ModifyRecordInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const record = yield Record_1.Record.findOne({ where: { id: id } });
        if (!record) {
            throw new CustomError_1.httpError('No se encontró el registro', 404);
        }
        // Check if user exists with document and document_type
        const user = yield User_1.User.findOne({ where: { document: ModifyRecordInterface.document, document_type: ModifyRecordInterface.document_type } });
        if (!user) {
            throw new CustomError_1.httpError('Usuario no encontrado', 404);
        }
        // Check if the user making the action is the same as the user to be modified
        if (userAction.role === 'user' && record.id_user != idUser || (userAction.role === 'user' && user.id != idUser)) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        // Check if the date is valid
        if (!(0, DateRecord_1.checkDate)(ModifyRecordInterface.date)) {
            throw new CustomError_1.httpError('Fecha inválida', 400);
        }
        yield record.update({
            user_id: user.id,
            reference: ModifyRecordInterface.reference,
            date: new Date(ModifyRecordInterface.date),
            weight: ModifyRecordInterface.weight,
            large: ModifyRecordInterface.large
        });
        return { message: "Registro modificado" };
    });
}
exports.modifyRecord = modifyRecord;
