import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class Usuario extends Model {}
Usuario.init(
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nomUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { args: true, msg: "El nombre solo puede contener letras" },
        len: {
          args: [3, 100],
          msg: "El nombre tiene que ser entre 3 y 100 caracteres",
        },
      },
    },

    apeUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { args: true, msg: "El apellido solo puede contener letras" },
        len: {
          args: [3, 100],
          msg: "El apellido tiene que ser entre 3 y 100 caracteres",
        },
      },
    },

    emailUser: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { args: true, msg: "El dato tiene que ser un email" },
        len: {
          args: [3, 100],
          msg: "El email tiene que ser entre 3 y 100 caracteres",
        },
      },
    },
    passUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "El password tiene que ser entre 10 y 100 caracteres",
        },
      },
    },
    rolId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    isApprover: { type: DataTypes.BOOLEAN },
    is_delete: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: { type: DataTypes.STRING, allowNull: false },
    updatedBy: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "Usuario",
  }
);
