import dotenv from "dotenv";
dotenv.config();

export const _app = {
  app_name: process.env.APP_NAME,
  connection_url: process.env.CONNECTION_URL,
  db_name: process.env.DB_NAME,
  secret_key: process.env.SECRET_KEY,
  port: process.env.PORT,
};
