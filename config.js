import { config } from "dotenv";
 

const origin =  "http://localhost:5173";

config();
export const {
  PORT,
  DB_PORT,
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
  SECRET_JWT_SEED,
} = process.env;

export const corsOptions = {
  origin: [origin],
  credentials: true,
};