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
exports.modifyBug = exports.deleteBug = exports.createBug = exports.getBugs = void 0;
// Dependencies
const FormatString_1 = require("../../helpers/FormatString");
// Models
const Bug_1 = require("../../models/Bug");
// Error
const CustomError_1 = require("../../config/CustomError");
// Log
const Log_1 = require("../../config/Log");
function getBugs() {
    return __awaiter(this, void 0, void 0, function* () {
        const bugs = yield Bug_1.Bug.findAll({
            order: [['id', 'ASC']],
        });
        return bugs;
    });
}
exports.getBugs = getBugs;
function createBug(BugInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        BugInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(BugInterface.name));
        const bug = yield Bug_1.Bug.create(BugInterface);
        Log_1.customLogger.info(`Se creó un fallo con el nombre ${BugInterface.name}`);
        return { message: "Fallo creado" };
    });
}
exports.createBug = createBug;
function deleteBug(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const bug = yield Bug_1.Bug.findOne({ where: { id: id } });
        if (!bug) {
            throw new CustomError_1.httpError('No se encontró el fallo', 404);
        }
        yield bug.destroy();
        Log_1.customLogger.info(`Se eliminó un fallo con el nombre ${bug.name}`);
        return { message: "Fallo eliminado" };
    });
}
exports.deleteBug = deleteBug;
function modifyBug(id, BugInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        BugInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(BugInterface.name));
        const bug = yield Bug_1.Bug.findOne({ where: { id: id } });
        if (!bug) {
            throw new CustomError_1.httpError('No se encontró el fallo', 404);
        }
        const bugName = yield Bug_1.Bug.findOne({ where: { name: BugInterface.name } });
        if (bugName && bugName.id != id) {
            throw new CustomError_1.httpError('Ya existe un fallo con ese nombre', 400);
        }
        yield bug.update(BugInterface);
        Log_1.customLogger.info(`Se modificó un fallo con el nombre ${BugInterface.name}`);
        return { message: "Fallo modificado" };
    });
}
exports.modifyBug = modifyBug;
