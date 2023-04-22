import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
const mysql = require("mysql2");

let DATABASE_URL = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "development") {
  DATABASE_URL =
    'mysql://8plhsi5dbdpkkg8crbz5:pscale_pw_mQgWAGvM2FeJ1l3lpAqWluhY9zTNNvbsjwooZq3yBj6@aws.connect.psdb.cloud/mydb?ssl={"rejectUnauthorized":true}';
}

console.log(DATABASE_URL);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = mysql.createConnection(DATABASE_URL);
  if (req.method === "GET") {
    connection
      .promise()
      .query("SELECT extension, secret, domain, websocket FROM extension")
      .then(([rows]: any) => {
        res.status(200).json(rows);
      })
      .catch((error: any) => {
        console.log("error", error);
        res.status(200).json({});
      })
      .then(() => connection.end());

    res.status(200).json({});
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
