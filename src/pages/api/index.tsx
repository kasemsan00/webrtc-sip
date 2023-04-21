import type { NextApiRequest, NextApiResponse } from "next";
const conn = require("../../lib/db");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
