import { NextResponse } from "next/server";
import { DB } from "@/lib/DB";

export async function GET(request: Request) {
  const connection = await DB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const [rows] = await connection.query(`DELETE FROM mydb.extension WHERE id = ?`, [id]);
  await connection.end();
  return NextResponse.json(rows);
}
