import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const database_url = process.env.DATABASE_URL;
export const database_host = process.env.DATABASE_HOST;
export const salt = Number(process.env.SALT);
