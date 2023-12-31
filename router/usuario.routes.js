import express from "express";
import { create, inactive, getAll, getOne, update, cambiarContrasenia } from "../controller/usuario.controller.js";
import { verifyToken } from "../utils/token-util.js";

const router = express.Router();
const modulo = "usuarios"

//router.use(verifyToken)
router.get(`/${modulo}` ,getAll)
router.get(`/${modulo}/:id`,  getOne)
router.post(`/${modulo}`, create)
router.put(`/${modulo}/:id`, update)
router.put(`/${modulo}/cambiar/:id`, cambiarContrasenia)

router.patch(`/${modulo}/:id`, inactive)


export default router