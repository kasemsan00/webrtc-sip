import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const connection = await db();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(searchParams.get("id"));
  const [rows] = await connection.query(`DELETE FROM extension WHERE id = ?`, [id]);
  return NextResponse.json(rows);
}
