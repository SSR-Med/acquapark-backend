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
exports.login = void 0;
// Models
const User_1 = require("../../models/User");
// Custom Error
const CustomError_1 = require("../../config/CustomError");
// Helpers
const Password_1 = require("../../helpers/user/Password");
const Token_1 = require("../../helpers/Token");
function login(loginInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { document: loginInterface.document, document_type: loginInterface.document_type } });
        if (!user) {
            throw new CustomError_1.httpError('Error en la contraseña o usuario', 404);
        }
        const id = user.id;
        if (user && (0, Password_1.comparePassword)(loginInterface.password, user.password)) {
            return (0, Token_1.createToken)(id);
        }
        else {
            throw new CustomError_1.httpError('Error en la contraseña o usuario', 400);
        }
    });
}
exports.login = login;
