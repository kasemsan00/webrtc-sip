import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const connection = await db();
  const { searchParams } = new URL(request.url);
  const [rows] = await connection.query("SELECT * FROM extension");
  return NextResponse.json(rows);
}
export async function POST(request: Request) {
  const connection = await db();
  const { domain, webSocket, extension, password } = await request.json();
  const [rows] = await connection.query(
    `INSERT INTO extension (extension, secret, domain, websocket) VALUES (?, ?, ?, ?)`,
    [extension, password, domain, webSocket]
  );
  return NextResponse.json(rows);
}
export async function PUT(request: Request) {
  const connection = await db();
  const { id, extension, password, domain, websocket } = await request.json();
  const sql = `UPDATE extension SET extension = '${extension}', secret = '${password}', domain = '${domain}', websocket = '${websocket}' WHERE id = '${id}'`;
  const [rows] = await connection.query(sql);
  return NextResponse.json(rows);
}
