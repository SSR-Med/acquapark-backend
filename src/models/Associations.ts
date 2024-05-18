// Models
import {User} from "./User";
import { Registry } from "./Registry";

// Associations
User.hasMany(Registry, {foreignKey: 'id_user'});
Registry.belongsTo(User, {foreignKey: 'id_user'});

