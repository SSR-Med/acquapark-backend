// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Bug = database.define('bug',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})