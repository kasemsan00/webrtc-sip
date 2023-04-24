require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/DB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await db();
  if (req.method === "GET") {
    const [rows] = await connection.query("SELECT * FROM extension");
    res.status(200).json(rows);
  }
  if (req.method === "POST") {
    const { extension, secret, domain, websocket } = req.body;
    const [rows] = await connection.query(`INSERT INTO extension (extension, secret, domain, websocket) VALUES (?, ?, ?, ?)`, [
      extension,
      secret,
      domain,
      websocket,
    ]);
    res.status(200).json(rows);
  }
  if (req.method === "PUT") {
    const { id, extension, password, domain, websocket } = req.body;
    const sql = `UPDATE extension SET extension = '${extension}', secret = '${password}', domain = '${domain}', websocket = '${websocket}' WHERE id = '${id}'`;
    const [rows] = await connection.query(sql);
    res.status(200).json(rows);
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    const [rows] = await connection.query(`DELETE FROM extension WHERE extension = ?`, [id]);
    res.status(200).json(rows);
  }
  await connection.end();
}
