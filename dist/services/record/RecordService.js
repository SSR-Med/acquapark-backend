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
            where: userAction.role === 'user' ? { id_user: idUser } : {},
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
        // If the user is not an admin, the id_user must be the same as the id of the user making the action
        if (userAction.role === 'user' && RecordInterface.id_user !== idUser) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        // Check if the date is valid
        if (!(0, DateRecord_1.checkDate)(RecordInterface.date)) {
            throw new CustomError_1.httpError('Fecha inválida', 400);
        }
        yield Record_1.Record.create(Object.assign(Object.assign({}, RecordInterface), { date: new Date(RecordInterface.date) }));
        return { message: "Nuevo registro creado" };
    });
}
exports.createRecord = createRecord;
function modifyRecord(id, RecordInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const userAction = yield User_1.User.findOne({ where: { id: idUser } });
        const record = yield Record_1.Record.findOne({ where: { id: id } });
        if (!record) {
            throw new CustomError_1.httpError('No se encontró el registro', 404);
        }
        if (userAction.role === 'user' && record.id_user != idUser || (userAction.role === 'user' && RecordInterface.id_user != idUser)) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        // Check if the date is valid
        if (!(0, DateRecord_1.checkDate)(RecordInterface.date)) {
            throw new CustomError_1.httpError('Fecha inválida', 400);
        }
        yield record.update(Object.assign(Object.assign({}, RecordInterface), { date: new Date(RecordInterface.date) }));
        return { message: "Registro modificado" };
    });
}
exports.modifyRecord = modifyRecord;
