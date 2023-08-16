
import { errorJson, returnJson } from "../utils/returnJson.js";
import { sequelize } from "../database/db.js";
import { encryptPassword } from "../utils/passwords-utils.js";

let modelo = "el usuario";

export const getAll = async (req, res) => {
  try {
    let query = `select u.id, nomUser 'nombre', apeUser 'apellido', emailUser 'email', 
          r.nomrol 'rolDescription',  
          case
            when isApprover = 1  then 'SI'
            when isApprover = 0  then 'NO'
          END
        'aprobador', 'acciones' from usuario u  
        inner join rol r on u.rolid  = r.id 
         where u.is_delete = 0`;

    const response = await sequelize.query(query)

    return returnJson(res, 201, response[0]);

  } catch (error) {
    console.log(error);
    return errorJson(res, 500);
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    let query = `select u.id, nomUser 'nombre', apeUser 'apellido', emailUser 'email', 
              r.nomrol 'rolDescription',   r.id 'rolId',
              case
                when isApprover = 1  then 'SI'
                when isApprover = 0  then 'NO'
              END
            'aprobador' from usuario u  
            inner join rol r on u.rolid  = r.id 
             where u.is_delete = 0 and u.id = ${id}`
    const response = await sequelize.query(query)

    if (response[0].length === 0) {
      return returnJson(res, 203, response[0]);
    }
    return returnJson(res, 201, response[0]);
  } catch (error) {
    console.log(error);
    return errorJson(res, 500);
  }
};

export const create = async (req, res) => {
  try {
    console.log(req.body)
    const { nombre, rolId, apellido, email, password, isApprover, createdBy } = req.body;
    const passwordEncriptado = await encryptPassword(password)

    let query = `select * from usuario where emailuser = '${email}'`
    const response = await sequelize.query(query)


    if (response[0].length > 0) {
      return returnJson(res, 203, { mensaje: `El correo ${email} ya existe en la base de datos` });
    }

    query = `
        insert into usuario (nomUser, apeuser, emailuser, passuser, rolid, isApprover, is_delete, created_by, updated_by) 
        values('${nombre}', '${apellido}', '${email}','${passwordEncriptado}',${rolId},${isApprover},0,'${createdBy}','${createdBy}')
      `
    await sequelize.query(query)

    return returnJson(res, 201, {});
  } catch (error) {
    console.log(error);
    return errorJson(res, 500);
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const {nombre, apellido, updatedBy, isApprover} = req.body;

 
    let query = `select * from usuario where id = ${id}`
    const response = await sequelize.query(query)

    if (response[0].length ===  0) {
      return returnJson(res, 203, { mensaje: `El usuario no existe en la base de datos` });
    }

    query = `update usuario set nomUser = '${nombre}', apeUser = '${apellido}', isApprover = ${isApprover}, is_delete = 0, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, 201, {});
  } catch (error) {
    console.log(error);
    return errorJson(res, 500);
  }
};

export const cambiarContrasenia = async (req, res) => {
  try {
    const id = req.params.id;
    let query = `select * from usuario where id = ${id}`
    const response = await sequelize.query(query)

    if (response[0].length ===  0) {
      return returnJson(res, 203, { mensaje: `El usuario no existe en la base de datos` });
    }

    const { password, updatedBy } = req.body;
    const passwordEncriptado = await encryptPassword(password)

    query = `update usuario set passUser = '${passwordEncriptado}', is_delete = 0, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, 201, {});
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
    return errorJson(res, 500);
  }
};


export const inactive = async (req, res) => {
  try {
    const id = req.params.id;
    const {  updatedBy } = req.body;
    let query = `select * from formulario where id = ${id}`
    const response = await sequelize.query(query)

    if (response[0] === null) {
      return returnJson(res, messageExistByFId(modelo, id), 404, true);
    }
 
    query = `update usuario set is_delete = 1, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, 201, {});
  } catch (error) {
    console.log(error);
    return errorJson(res, 500);
  }
};
