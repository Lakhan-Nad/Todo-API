import * as DotEnv from "dotenv";
DotEnv.config();

export const HOST = process.env.HOST || "localhost";

export const PORT = Number.parseInt(process.env.PORT || "3000");

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const IS_TEST = NODE_ENV === "test" || false;

export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "tasks";

export const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";

export const MYSQL_PORT = Number.parseInt(process.env.MYSQL_PORT || "3306");

export const MYSQL_USER = process.env.MYSQL_USER || "admin";

export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "password";
