import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    request.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
