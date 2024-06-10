// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Alert = database.define('alert',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_user:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    bug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    machine: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})