import express from "express";
import {
  create,
  inactive,
  getAll,
  getOne,
  update,
} from "../controller/rol.controller.js";
import { verifyToken } from "../utils/token-util.js";
import { check } from "express-validator";
import { validarCampo } from "../utils/valiidacion-util.js";

const router = express.Router();
const modulo = "roles";

router.use(verifyToken)
router.get(`/${modulo}`, getAll);
router.get(`/${modulo}/:id`, getOne);
router.post(
  `/${modulo}`,
  [
    check("nomRol", "El nombre es obligatorio").not().isEmpty(),
    check("createdBy", "El usuario creador es obligatorio").not().isEmpty(),
    validarCampo,
  ],
  create
);
router.put(
  `/${modulo}/:id`,
  [
    check("nomRol", "El nombre es obligatorio").not().isEmpty(),
    check("updatedBy", "El usuario actualizador es obligatorio")
      .not()
      .isEmpty(),
    validarCampo,
  ],
  update
);
router.patch(
  `/${modulo}/:id`,
  [
    check("updatedBy", "El usuario actualizador es obligatorio")
      .not()
      .isEmpty(),
    validarCampo,
  ],
  inactive
);

export default router;
