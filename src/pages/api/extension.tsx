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
    const { extension, secret, domain, websocket } = req.body;
    const [rows] = await connection.query(`UPDATE extension SET extension = ?, secret = ?, domain = ?, websocket = ?`, [
      extension,
      secret,
      domain,
      websocket,
    ]);
    res.status(200).json(rows);
  }
  if (req.method === "DELETE") {
    console.log(req.query);
    const { id } = req.query;
    const [rows] = await connection.query(`DELETE FROM extension WHERE extension = ?`, [id]);
    res.status(200).json(rows);
  }
  await connection.end();
}
