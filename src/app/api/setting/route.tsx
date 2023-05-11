import { NextResponse } from "next/server";
import { DB } from "@/lib/DB";

export async function GET() {
  const connection = await DB();
  const [rows] = await connection.query("SELECT name, value FROM setting");
  await connection.end();
  return NextResponse.json(rows);
}
export async function POST(request: Request) {
  const connection = await DB();
  const { name, value } = await request.json();
  const [rows] = await connection.query("UPDATE setting SET name = ?, value = ? WHERE name = ? ", [name, value, name]);
  await connection.end();
  return NextResponse.json(rows);
}
