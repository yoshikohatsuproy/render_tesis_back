import express from "express";
import { create, inactive, getAll } from "../controller/rol-formulario.controller.js";

const router = express.Router();
const modulo = "rol-formulario"

router.get(`/${modulo}`, getAll)
router.post(`/${modulo}`, create)
router.patch(`/${modulo}/:id`, inactive)


export default router