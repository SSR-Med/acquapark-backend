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
exports.modifyUser = exports.createUser = exports.changeStateUser = exports.getUserIdByDocument = exports.getUsers = void 0;
// Models
const User_1 = require("../../models/User");
// Custom error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const Password_1 = require("../../helpers/user/Password");
const FormatString_1 = require("../../helpers/FormatString");
// Log
const Log_1 = require("../../config/Log");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.User.findAll({
            order: [['id', 'ASC']],
        });
        users.forEach((user) => {
            user.dataValues.password = '';
        });
        return users;
    });
}
exports.getUsers = getUsers;
function getUserIdByDocument(document_type, document) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { document: document, document_type: document_type } });
        if (!user) {
            throw new CustomError_1.httpError('No se encontró al usuario', 404);
        }
        return { id: user.id };
    });
}
exports.getUserIdByDocument = getUserIdByDocument;
function changeStateUser(id, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const admin = yield User_1.User.findOne({ where: { id: idUser } });
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user) {
            throw new CustomError_1.httpError('No se encontró al usuario', 404);
        }
        // Cant change your ouwn state, superadmin cant be changed, admins cant change admins
        if (user.role == 'superadmin' || (user.role == 'admin' && admin.role == 'admin') || user.id == idUser) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        yield user.update({ active: !user.active });
        Log_1.customLogger.info(`El administrador ${admin.name} cambió el estado del usuario ${user.name}`);
        return { message: "Estado del usuario modificado" };
    });
}
exports.changeStateUser = changeStateUser;
function createUser(UserInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const admin = yield User_1.User.findOne({ where: { id: idUser } });
        const userDocument = yield User_1.User.findOne({ where: { document: UserInterface.document, document_type: UserInterface.document_type } });
        if (userDocument) {
            throw new CustomError_1.httpError('Usuario ya existe', 400);
        }
        // No one can create a superadmin, admins cant create admins
        if (UserInterface.role == 'superadmin' || (UserInterface.role == 'admin' && admin.role == 'admin')) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        UserInterface.password = (0, Password_1.generatePassword)(UserInterface.password);
        UserInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(UserInterface.name));
        yield User_1.User.create(UserInterface);
        Log_1.customLogger.info(`El administrador ${admin.name} creó al usuario ${UserInterface.name}`);
        return { message: "Nuevo usuario creado" };
    });
}
exports.createUser = createUser;
function modifyUser(id, UserInterface, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        // Search for the user making the action
        const admin = yield User_1.User.findOne({ where: { id: idUser } });
        const user = yield User_1.User.findOne({ where: { id: id } });
        if (!user) {
            throw new CustomError_1.httpError('No se encuentra al usuario', 404);
        }
        const userDocument = yield User_1.User.findOne({ where: { document: UserInterface.document, document_type: UserInterface.document_type } });
        if (userDocument && userDocument.id != id) {
            throw new CustomError_1.httpError('Ya existe el usuario', 400);
        }
        // Admins cant modify admins, cant change their own role or active state, superadmin cant be modified if the user is not a superadmin,
        // If you were not a superadmin, you cant be a superadmin
        if ((admin.role == 'admin' && user.role == 'admin' && user.id != idUser)
            || (user.id == idUser && UserInterface.role != user.role) || (user.id == idUser && UserInterface.active != user.active)
            || (user.role == 'superadmin' && admin.role != 'superadmin') || (UserInterface.role == 'superadmin' && user.role != 'superadmin')) {
            throw new CustomError_1.httpError('No se puede realizar la acción', 401);
        }
        if (UserInterface.password == '' || UserInterface.password == undefined) {
            UserInterface.password = user.password;
        }
        else if (UserInterface.password.length < 4) {
            throw new CustomError_1.httpError('La contraseña debe tener al menos 4 caracteres', 400);
        }
        else {
            UserInterface.password = (0, Password_1.generatePassword)(UserInterface.password);
        }
        UserInterface.name = (0, FormatString_1.capitalizeWords)((0, FormatString_1.deleteBlankSpaces)(UserInterface.name));
        Log_1.customLogger.info(`El administrador ${admin.name} modificó al usuario ${user.name}`);
        yield user.update(UserInterface);
        return { message: "Usuario modificado" };
    });
}
exports.modifyUser = modifyUser;
