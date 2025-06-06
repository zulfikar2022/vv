import dotenv from "dotenv";
import path from "path";

const dotenvFilePath = path.join(process.cwd(), ".env");
dotenv.config({
  path: dotenvFilePath,
});

export const environmentVariables = {
  database_connection_string: process.env.DATABASE_CONNECTION_STRING,
  default_port: process.env.PORT,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
  version: process.env.VERSION,
  free_url_limit: process.env.FREE_URL_LIMIT,
  paid_url_limit: process.env.PAID_URL_LIMIT,
  base_url_local: process.env.BASE_URL_LOCAL,
  base_url_prod: process.env.BASE_URL_PROD,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
};
