// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";
// Schema
import { documentTypeSchema, roleSchema } from "../schemas/UserSchema";

export const User = database.define('user',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    document_type:{
        type: DataTypes.ENUM,
        values: documentTypeSchema,
        allowNull: false
    },
    document:{
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role:{
        type: DataTypes.ENUM,
        values: roleSchema,
        defaultValue: 'user'
    }
},{
    tableName:'user',
    indexes: [
        {
            unique: true,
            fields: ['document','document_type']
        }
    ]
}
)