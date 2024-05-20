"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const User_1 = require("./User");
const Record_1 = require("./Record");
// Associations
User_1.User.hasMany(Record_1.Record, { foreignKey: 'id_user' });
Record_1.Record.belongsTo(User_1.User, { foreignKey: 'id_user' });
