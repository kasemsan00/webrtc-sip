require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";

const mysql = require("mysql2");

let DATABASE_URL = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "development") {
  DATABASE_URL =
    'mysql://yiljifq2d8232648owhp:pscale_pw_GfymxGwjg2qOOuSExPlEVkMfOC4GDVPRV5IzfrHI9iW@aws.connect.psdb.cloud/mydb?ssl={"rejectUnauthorized":true}';
}

console.log("DATABASE_URL", DATABASE_URL);

const db = async () => {
  const pool = mysql.createPool(DATABASE_URL as any);
  return pool.promise();
};

const data = [
  {
    extension: "0000168180001",
    secret: "Opy0SGsa2G5fiw64",
    domain: "sipagent.ttrs.in.th",
    webSocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
  {
    extension: "0000168180004",
    secret: "HENLwnvRcH9e5SNQ",
    domain: "sipagent.ttrs.in.th",
    webSocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
  {
    extension: "0000168180021",
    secret: "i7yVhkvojEUn4KvR",
    domain: "sipagent.ttrs.in.th",
    webSocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
];

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
  connection.end();
}
