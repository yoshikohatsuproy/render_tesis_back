import { sequelize } from "../database/db.js";

import { messageLogin, messageError } from "../utils/message-util.js";

import { errorJson, returnJson } from "../utils/returnJson.js";
import { comparePassword } from "../utils/passwords-utils.js";
import { generateToken } from "../utils/token-util.js";

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    let query = `select * from usuario where emailuser ='${usuario}'`;
    const response = await sequelize.query(query);
 
    if (response[0].length == 0) {
      return returnJson(res, 201, { mensaje: "El correo no se encuentra registrado en el sistema" }
      );
    }

    const { id, nomUser, emailUser, passUser, is_delete } = response[0][0];

    if (is_delete) {
      return returnJson(res, 201, { mensaje: "El usuario se encuentra bloqueado en el sistema" });
    }

    const validatePassword = await comparePassword(password, passUser);

    if (!validatePassword) {
      return returnJson(res, 201, { mensaje: "Las contraseñas no coinciden" });
    }

    const token = generateToken(id);
    const data = {
      nombre: nomUser,
      email: emailUser,
      token,
      id,
      mensaje: messageLogin(emailUser)
    };

    return returnJson(res, 200, data);
  } catch (error) {
    console.log(error);
    return errorJson(res, messageError, 500, false);
  }
};
