import mysql from "mysql2";

const DATABASE_URL = process.env.DATABASE_URL;

export const DB = async () => {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT+ ''),
    charset: "utf8mb4_bin",
    multipleStatements: true,
    connectionLimit: 20,
  });
  return pool.promise();
};
