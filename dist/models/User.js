"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
// Schema
const UserSchema_1 = require("../schemas/UserSchema");
exports.User = Database_1.database.define('user', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    document_type: {
        type: sequelize_1.DataTypes.ENUM,
        values: UserSchema_1.documentTypeSchema,
        allowNull: false
    },
    document: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: UserSchema_1.roleSchema,
        defaultValue: 'user'
    }
}, {
    tableName: 'user',
    indexes: [
        {
            unique: true,
            fields: ['document', 'document_type']
        }
    ]
});
