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
exports.modifyMachine = exports.deleteMachine = exports.createMachine = exports.getMachines = void 0;
// Dependencies
const FormatString_1 = require("../../helpers/FormatString");
// Models
const Machine_1 = require("../../models/Machine");
// Error
const CustomError_1 = require("../../config/CustomError");
// Log
const Log_1 = require("../../config/Log");
function getMachines() {
    return __awaiter(this, void 0, void 0, function* () {
        const machineries = yield Machine_1.Machine.findAll({
            order: [['id', 'ASC']],
        });
        return machineries;
    });
}
exports.getMachines = getMachines;
function createMachine(MachineInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        MachineInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(MachineInterface.name));
        const machine = yield Machine_1.Machine.create(MachineInterface);
        Log_1.customLogger.info(`Se creó una máquina con el nombre ${MachineInterface.name}`);
        return { message: "Máquina creada" };
    });
}
exports.createMachine = createMachine;
function deleteMachine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const machine = yield Machine_1.Machine.findOne({ where: { id: id } });
        if (!machine) {
            throw new CustomError_1.httpError('No se encontró la máquina', 404);
        }
        machine.destroy();
        Log_1.customLogger.info(`Se eliminó una máquina con el nombre ${machine.name}`);
        return { message: "Máquina eliminada" };
    });
}
exports.deleteMachine = deleteMachine;
function modifyMachine(id, MachineInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        MachineInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(MachineInterface.name));
        const machine = yield Machine_1.Machine.findOne({ where: { id: id } });
        if (!machine) {
            throw new CustomError_1.httpError('No se encontró la maquina', 404);
        }
        const machineName = yield Machine_1.Machine.findOne({ where: { name: MachineInterface.name } });
        if (machineName && machineName.id != id) {
            throw new CustomError_1.httpError('Ya existe una maquina con ese nombre', 400);
        }
        machine.update(MachineInterface);
        Log_1.customLogger.info(`Se modificó una máquina con el nombre ${MachineInterface.name}`);
        return { message: "Máquina modificada" };
    });
}
exports.modifyMachine = modifyMachine;
