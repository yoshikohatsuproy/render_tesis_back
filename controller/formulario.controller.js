import {
  messageCreate,
  messageDelete,
  messageError,
  messageExistByFId,
  messageUpdate,
} from "../utils/message-util.js";
import { returnJson } from "../utils/returnJson.js";
import { sequelize } from "../database/db.js";

let modelo = "el formulario";

export const getAll = async (req, res) => {
  try {
    let query = `select * from formulario where is_delete = 0`
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
    const { nomForm, iconForm, routeform, createdBy } = req.body;
    let query = `insert into formulario (nomForm, iconForm, routeform, created_by, updated_by) values('${nomForm}','${iconForm}', '${routeform}', '${createdBy}', '${createdBy}')`;
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
      return returnJson(res, messageExistByFId(modelo, id), 404, true  );
    }

    const { nomForm, iconForm, routeform, updatedBy } = req.body;
    query = `update formulario set nomform = '${nomForm}', iconform = '${iconForm}', routeform = '${routeform}', is_delete = 0, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    
    return returnJson(res, messageUpdate(modelo), 201, true);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false, error);
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
    const { updatedBy } = req.body;

    query = `update formulario set is_delete = 1, updated_by = '${updatedBy}' where id = ${id}`;
    await sequelize.query(query)

    return returnJson(res, messageDelete(modelo), 201, true);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};
