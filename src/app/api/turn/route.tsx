import { NextResponse } from "next/server";
import { DB } from "@/lib/DB";

export async function GET() {
  const connection = await DB();
  const [rows] = await connection.query("SELECT * FROM turn_data");
  return NextResponse.json(rows);
}
