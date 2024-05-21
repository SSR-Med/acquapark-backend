// Models
import {User} from "./User";
import { Record } from "./Record";

// Associations
User.hasMany(Record, {foreignKey: 'id_user'});
Record.belongsTo(User, {foreignKey: 'id_user'});

