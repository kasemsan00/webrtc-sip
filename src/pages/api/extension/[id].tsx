require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/DB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await db();
  if (req.method === "DELETE") {
    const { id } = req.query;
    const [rows] = await connection.query(`DELETE FROM extension WHERE id = ?`, [id]);
    res.status(200).json(rows);
  }
  await connection.end();
}
