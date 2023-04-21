import type { NextApiRequest, NextApiResponse } from "next";
const conn = require("../../lib/db");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { extension, secret, domain, websocket } = req.body;
    const result = await conn.query(`INSERT INTO extension (extension, secret, domain, websocket) VALUES (?,?,?,?)`, [
      extension,
      secret,
      domain,
      websocket,
    ]);
    res.status(200).json(result);
    return;
  }
  res.status(200).send(null);
}
