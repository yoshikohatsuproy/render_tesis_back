import { Usuario } from "../models/usuario.js";
import { Rol } from "../models/rol.js";
import { Formulario } from "../models/formulario.js";
 
Rol.hasMany(Usuario, { as: "role", foreignKey: "rolId" });
Usuario.belongsTo(Rol, { as: "rol" });


Rol.belongsToMany(Formulario, {through: "rol_formulario"})
Formulario.belongsToMany(Rol, {through: "rol_formulario"})
