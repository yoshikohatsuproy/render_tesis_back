import { SECRET_JWT_SEED } from "../config.js";
import jwt from "jsonwebtoken";

export function generateToken(id) {
    const token = jwt.sign({ id: id }, SECRET_JWT_SEED, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    console.log(token)
    return token
}
export async function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No existe un token" });
    }
  
    const decoded = await jwt.verify(token, SECRET_JWT_SEED);
    req.userId = decoded.id;
    next();
  }