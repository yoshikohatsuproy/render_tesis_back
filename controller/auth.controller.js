import { sequelize } from "../database/db.js";


import {
  messageLogin,
  messageError,
} from "../utils/message-util.js";

import { returnJson } from "../utils/returnJson.js";
import { comparePassword } from "../utils/passwords-utils.js";
import { generateToken } from "../utils/token-util.js";
 


export const login = async (req, res) => {
  try {
    const { usuario, password} = req.body;
    let query = `select * from usuario where emailuser ='${usuario}'`
    console.log(query)

    const response = await sequelize.query(query)
    console.log(response)
    
    if (response[0].length == 0) {
      return returnJson(
        res,
        'El correo no se encuentra registrado en el sistema',
        404,
        false,
        []
      );
    }

    const {id, nomUser, emailUser, passUser, is_delete} = response[0][0]

    if (is_delete) {
      return returnJson(
        res,
        'El usuario se encuentra bloqueado en el sistema',
        404,
        false,
        []
      );
    }

    const validatePassword = await comparePassword(password, passUser)

    if (!validatePassword) {
      return returnJson(
        res,
        'Las contraseñas no coinciden',
        404,
        false,
        []
      );
    }

    const token = generateToken(id)
    const data = {
      'nombre' : nomUser,
      'email' : emailUser,
      token
    }

    return returnJson(res, messageLogin(emailUser), 201, true,data );
    
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};
