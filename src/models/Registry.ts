// Dependencies
import { DataTypes } from "sequelize";
// Database
import {database} from "../config/Database";

export const Registry = database.define('registry',{
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
    reference:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    large:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
})