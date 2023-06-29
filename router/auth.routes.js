import express from "express";
import { login } from "../controller/auth.controller.js";

const router = express.Router();
const modulo = "auth"

router.post(`/${modulo}`, login)
export default router