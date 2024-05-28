import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
// Database
export const database_name = process.env.DATABASE_NAME;
export const database_user = process.env.DATABASE_USER;
export const database_host = process.env.DATABASE_HOST;
export const database_password = process.env.DATABASE_PASSWORD;
export const database_port = Number(process.env.DATABASE_PORT);
export const salt = Number(process.env.SALT);
export const jwt_key = process.env.JWT_KEY;
