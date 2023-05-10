import mysql from "mysql2";

const DATABASE_URL = process.env.DATABASE_URL;

export const DB = async () => {
  const pool = mysql.createPool(DATABASE_URL as any);
  return pool.promise();
};
