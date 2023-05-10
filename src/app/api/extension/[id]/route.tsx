import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function DELETE(request: Request) {
  const connection = await db();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log(request);
  const [rows] = await connection.query(
    `DELETE FROM extension WHERE extension = ?`,
    [id]
  );
  return NextResponse.json(rows);
}
