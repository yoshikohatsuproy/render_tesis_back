import { config } from "dotenv";

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
