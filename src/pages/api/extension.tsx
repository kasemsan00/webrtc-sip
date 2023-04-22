import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
const mysql = require("mysql2");

console.log(process.env.NODE_ENV);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  if (req.method === "GET") {
    connection.query("SELECT * FROM extension", (err: any, result: any) => {
      res.status(200).json(result);
    });
    connection.end();
    return;
  }
  if (req.method === "POST") {
    const { extension, secret, domain, websocket } = req.body;
    const result = connection.query(`INSERT INTO extension (extension, secret, domain, websocket) VALUES (?,?,?,?)`, [
      extension,
      secret,
      domain,
      websocket,
    ]);
    connection.end();
    res.status(200).json(result);
    return;
  }
  res.status(200);
}
