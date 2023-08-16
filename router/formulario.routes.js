import express from "express";
import { create, inactive, getAll, getOne, update } from "../controller/formulario.controller.js";
import { verifyToken } from "../utils/token-util.js";

const router = express.Router();
const modulo = "formulario"

//router.use(verifyToken)
router.get(`/${modulo}`, getAll)
router.get(`/${modulo}/:id`, getOne)
router.post(`/${modulo}`, create)
router.put(`/${modulo}/:id`, update)
router.patch(`/${modulo}/:id`, inactive)


export default router