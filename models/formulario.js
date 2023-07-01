import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class Formulario extends Model {}
Formulario.init(
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nomForm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { args: true, msg: "El nombre solo puede contener letras" },
        len: {
            args: [3, 100], msg: "El nombre tiene que ser entre 3 y 100 caracteres"
        }
      },
    },
    iconForm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { args: true, msg: "El icono solo puede contener letras" },
        len: {
            args: [3, 100], msg: "El icono tiene que ser entre 3 y 100 caracteres"
        }
      },
    },
    routeForm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { args: true, msg: "La ruta solo puede contener letras" },
        len: {
            args: [3, 100], msg: "La ruta tiene que ser entre 3 y 100 caracteres"
        }
      },
    },
    is_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    updatedBy: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Formulario",
    tableName: "Formulario",
  }
);
