// Models
import {User} from "./User";
import { Record } from "./Record";
import { Alert } from "./Alert";

// Associations
User.hasMany(Record, {foreignKey: 'id_user'});
Record.belongsTo(User, {foreignKey: 'id_user'});
User.hasMany(Alert, {foreignKey: 'id_user'});
Alert.belongsTo(User, {foreignKey: 'id_user'});
