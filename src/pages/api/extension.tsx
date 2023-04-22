require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";

const bluebird = require("bluebird");
const mysql = require("mysql2");

let DATABASE_URL = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "development") {
  DATABASE_URL =
    'mysql://6hatczqauzbpb7voytq5:pscale_pw_wwKhEJ8wZFF33r2yxCkqHTgjA4KTMxTOw70UFa4ov7u@aws.connect.psdb.cloud/mydb?ssl={"rejectUnauthorized":true}';
  pass: "pscale_pw_wwKhEJ8wZFF33r2yxCkqHTgjA4KTMxTOw70UFa4ov7u";
}

console.log("DATABASE_URL", DATABASE_URL);
const database = "mydb";
const username = "iq64xuw64517nmeygdoe";
const host = "aws.connect.psdb.cloud";
const password = "pscale_pw_727gB870LgrWRBJwrN5M67nrqqFKjex6XrbJGamzgTN";

const db = async () => {
  return mysql.createConnection({
    host,
    user: username,
    password: password,
    database,
    Promise: bluebird,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

const data = [
  {
    extension: "0000168180001",
    secret: "Opy0SGsa2G5fiw64",
    domain: "sipagent.ttrs.in.th",
    websocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
  {
    extension: "0000168180004",
    secret: "HENLwnvRcH9e5SNQ",
    domain: "sipagent.ttrs.in.th",
    websocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
  {
    extension: "0000168180021",
    secret: "i7yVhkvojEUn4KvR",
    domain: "sipagent.ttrs.in.th",
    websocket: "wss://sipagent.ttrs.in.th:8089/ws",
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // if (req.method === "GET") {
    //   // console.log("Get Extension", connection);
    //   //
    //   const connection = await db();
    //   const [rows, fields] = await connection.execute("SELECT * FROM extension");
    //   //
    //   console.log(rows, fields);
    //   // // res.status(200).json(rows);
    //   // // connection.end();
    //   res.status(200).json({});
    //   return;
    // }
    // if (req.method === "POST") {
    //   console.log("Post Extension");
    //
    //   const { extension, secret, domain, websocket } = req.body;
    //   const result = connection.query(`INSERT INTO extension (extension, secret, domain, websocket) VALUES (?,?,?,?)`, [
    //     extension,
    //     secret,
    //     domain,
    //     websocket,
    //   ]);
    //   connection.end();
    //   res.status(200).json(result);
    //   return;
    res.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to load data" });
  }
}
