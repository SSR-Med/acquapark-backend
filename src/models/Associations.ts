// Models
import {User} from "./User";
import { Registry } from "./Record";

// Associations
User.hasMany(Registry, {foreignKey: 'id_user'});
Registry.belongsTo(User, {foreignKey: 'id_user'});

