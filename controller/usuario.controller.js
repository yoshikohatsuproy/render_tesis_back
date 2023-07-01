import {
    messageCreate,
    messageDelete,
    messageError,
    messageExistByCorreo,
    messageExistByFId,
    messageUpdate,
  } from "../utils/message-util.js";
  import { returnJson } from "../utils/returnJson.js";
  import { sequelize } from "../database/db.js";
  import { encryptPassword } from "../utils/passwords-utils.js";

  let modelo = "el usuario";
  
  export const getAll = async (req, res) => {
    try {
      let query = `select * from usuario where is_delete = 0`
      const response = await sequelize.query(query)
      
      return returnJson(res, `Lista ${modelo}`, 201, true, response[0]);
    } catch (error) {
      console.log(error);
      return returnJson(res, messageError, 500, false);
    }
  };
  
  export const getOne = async (req, res) => {
    try {
      const id = req.params.id;
      let query = `select * from formulario where id = ${id}`
      const response = await sequelize.query(query)
  
      if (response[0] === null) {
        return returnJson(res, messageExistByFId(modelo, id), 404, true);
      }
      return returnJson(res, `Lista ${modelo}`, 201, true, response[0]);
    } catch (error) {
      console.log(error);
      return returnJson(res, messageError, 500, false);
    }
  };
  
  export const create = async (req, res) => {
    try {
      const { nomUser,rolId, apeUser, emailUser, passUser, isApprover, createdBy } = req.body;
      const passwordEncriptado = await encryptPassword(passUser)

      let query = `select * from usuario where emailuser = '${emailUser}'`
      const response = await sequelize.query(query)

      if (response[0] ) {
        return returnJson(res, messageExistByCorreo( emailUser), 404, false );
      }

      query = `
        insert into usuario (nomUser, apeuser, emailuser, passuser, rolid, isApprover, is_delete, created_by, updated_by) 
        values('${nomUser}', '${apeUser}', '${emailUser}','${passwordEncriptado}',${rolId},${isApprover},0,'${createdBy}','${createdBy}')
      `
      await sequelize.query(query)

      return returnJson(res, messageCreate(modelo), 201, true);
    } catch (error) {
      console.log(error);
      return returnJson(res, messageError, 500, false, error);
    }
  };
  
  export const update = async (req, res) => {
    try {
      const id = req.params.id;
      let query = `select * from formulario where id = ${id}`
      const response = await sequelize.query(query)
  
      if (response[0] === null) {
        return returnJson(res, messageExistByFId(modelo, id), 404, true);
      }
      return returnJson(res, messageUpdate(modelo), 201, true, model);
    } catch (error) {
      console.log(error);
      if (error.name == "SequelizeValidationError") {
        return returnJson(
          res,
          error.errors[0].message,
          404,
          false,
          error.errors[0].type
        );
      }
      return returnJson(res, messageError, 500, false);
    }
  };
  
  export const inactive = async (req, res) => {
    try {
      const id = req.params.id;
      let query = `select * from formulario where id = ${id}`
      const response = await sequelize.query(query)
  
      if (response[0] === null) {
        return returnJson(res, messageExistByFId(modelo, id), 404, true);
      }
      await model.save();
      return returnJson(res, messageDelete(modelo), 201, true, model);
    } catch (error) {
      console.log(error);
      return returnJson(res, messageError, 500, false);
    }
  };
  