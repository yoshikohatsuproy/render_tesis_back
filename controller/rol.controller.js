import {
  messageCreate,
  messageDelete,
  messageError,
  messageExistByFId,
  messageUpdate,
} from "../utils/message-util.js";
import { returnJson } from "../utils/returnJson.js";
import { sequelize } from "../database/db.js";

let modelo = "el rol";

export const getAll = async (req, res) => {
  try {

    let query = `select id 'rolId', nomrol 'name' from rol where is_delete = 0`
    const response = await sequelize.query(query)
    return returnJson(res, 201, response[0]);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    let query = `select * from rol where id = ${id}`
    const response = await sequelize.query(query)

    if (response[0] === null) {
      return returnJson(res, messageExistByFId(modelo, id), 404, true  );
    }
    return returnJson(res, `Lista ${modelo}`, 201, true, response[0]);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const create = async (req, res) => {
  try {
    const { nomRol, createdBy } = req.body;
    let query = `insert into rol (nomrol, created_by, updated_by) values('${nomRol}', '${createdBy}', '${createdBy}')`;
    await sequelize.query(query)
    return returnJson(res, messageCreate(modelo), 201, true);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    let query = `select * from rol where id = ${id}`
    const response = await sequelize.query(query)

    if (response[0] === null) {
      return returnJson(res, messageExistByFId(modelo, id), 404, true  );
    }
    const { nomRol, updatedBy } = req.body;

    query = `update rol set nomrol = '${nomRol}', is_delete = 0, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, messageUpdate(modelo), 201, true);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const inactive = async (req, res) => {
  try {
    const id = req.params.id;
    let query = `select * from rol where id = ${id}`

    const response = await sequelize.query(query)
    if (response[0] === null) {
      return returnJson(res, messageExistByFId(modelo, id), 404, true  );
    }
    const {  updatedBy } = req.body;

    query = `update rol set is_delete = 1, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, messageDelete(modelo), 201, true);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};
