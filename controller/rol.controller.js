import {
  messageCreate,
  messageDelete,
  messageError,
  messageExistByFId,
  messageUpdate,
} from "../utils/message-util.js";
import { returnJson } from "../utils/returnJson.js";
import { Rol } from "../models/rol.js";

let modelo = "el rol";

export const getAll = async (req, res) => {
  try {
    const lista = await Rol.findAll( {
      where : { is_delete : false}
    });
    return returnJson(res, `Lista ${modelo}`, 201, true, lista);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const model = await Rol.findOne({ where: { id: id } });
    if (model === null) {
      return returnJson(res, messageExistByFId(modelo, id), 201, true, model);
    }
    return returnJson(res, `Lista ${modelo}`, 201, true, model);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};

export const create = async (req, res) => {
  try {
    const { nomRol, createdBy, updatedBy } = req.body;
    const newModel = await Rol.create({ nomRol, createdBy, updatedBy });
    return returnJson(res, messageCreate(modelo), 201, true, newModel);
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

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const model = await Rol.findOne({ where: { id: id } });
    if (model === null) {
      return returnJson(res, messageExistByFId(modelo, id), 201, true, model);
    }
    const { nomRol, updatedBy } = req.body;
    model.nomRol = nomRol;
    model.updatedBy = updatedBy;
    model.is_delete = 0;

    await model.save();
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
    const model = await Rol.findOne({ where: { id: id } });
    if (model === null) {
      return returnJson(res, messageExistByFId(modelo, id), 201, true, model);
    }

    const { updatedBy } = req.body;
    model.updatedBy = updatedBy;
    model.is_delete = 1;

    await model.save();
    return returnJson(res, messageDelete(modelo), 201, true, model);
  } catch (error) {
    console.log(error);
    return returnJson(res, messageError, 500, false);
  }
};
