// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Reference = database.define('reference',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_number:{
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})