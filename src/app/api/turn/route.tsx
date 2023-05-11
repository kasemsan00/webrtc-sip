import { NextResponse } from "next/server";
import { DB } from "@/lib/DB";

export async function GET() {
  const connection = await DB();
  const [rows] = await connection.query("SELECT * FROM turn_data");
  await connection.end();
  return NextResponse.json(rows);
}
export async function POST(request: Request) {
  const connection = await DB();
  const { id, url, username, credential } = await request.json();
  const [rows] = await connection.query("UPDATE turn_data SET url = ?, username = ?, credential = ? WHERE id = ?", [
    url,
    username,
    credential,
    id,
  ]);
  await connection.end();
  return NextResponse.json(rows);
}
