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
exports.modifyReference = exports.createReference = exports.deleteReference = exports.getNameReferenceByIdNumber = exports.getReferences = void 0;
// Models
const Reference_1 = require("../../models/Reference");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const FormatString_1 = require("../../helpers/FormatString");
function getReferences() {
    return __awaiter(this, void 0, void 0, function* () {
        const references = yield Reference_1.Reference.findAll({
            order: [['id', 'ASC']]
        });
        return references;
    });
}
exports.getReferences = getReferences;
function getNameReferenceByIdNumber(id_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const reference = yield Reference_1.Reference.findOne({ where: { id_number: id_number } });
        if (!reference) {
            throw new CustomError_1.httpError('No se encontró la referencia', 404);
        }
        return { name: reference.name };
    });
}
exports.getNameReferenceByIdNumber = getNameReferenceByIdNumber;
function deleteReference(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const reference = yield Reference_1.Reference.findOne({ where: { id: id } });
        if (!reference) {
            throw new CustomError_1.httpError('No se encontró la referencia', 404);
        }
        reference.destroy();
        return { message: "Referencia eliminada" };
    });
}
exports.deleteReference = deleteReference;
function createReference(ReferenceInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const referenceName = yield Reference_1.Reference.findOne({ where: { name: ReferenceInterface.name } });
        if (referenceName) {
            throw new CustomError_1.httpError('Ya existe una referencia con ese nombre', 400);
        }
        const referenceId = yield Reference_1.Reference.findOne({ where: { id_number: ReferenceInterface.id_number } });
        if (referenceId) {
            throw new CustomError_1.httpError('Ya existe una referencia con ese id', 400);
        }
        ReferenceInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(ReferenceInterface.name));
        yield Reference_1.Reference.create(ReferenceInterface);
        return { message: "Nueva referencia creada" };
    });
}
exports.createReference = createReference;
function modifyReference(id, ReferenceInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const reference = yield Reference_1.Reference.findOne({ where: { id: id } });
        if (!reference) {
            throw new CustomError_1.httpError('No se encontró la referencia', 404);
        }
        const referenceId = yield Reference_1.Reference.findOne({ where: { id_number: ReferenceInterface.id_number } });
        if (referenceId && referenceId.id != id) {
            throw new CustomError_1.httpError('Ya existe una referencia con ese id', 400);
        }
        const referenceName = yield Reference_1.Reference.findOne({ where: { name: ReferenceInterface.name } });
        if (referenceName && referenceName.id != id) {
            throw new CustomError_1.httpError('Ya existe una referencia con ese nombre', 400);
        }
        ReferenceInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(ReferenceInterface.name));
        reference.update(ReferenceInterface);
        return { message: "Referencia modificada" };
    });
}
exports.modifyReference = modifyReference;
