import { NextResponse } from "next/server";
import { verifyJwt } from "./jwt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authenticate(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function authenticateAndAuthorize(
  request: Request,
  allowedRoles?: string[]
) {
  const user = authenticate(request) as any;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}

export function handleAuthError(error: Error) {
  if (error.message === "Unauthorized") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (error.message === "Invalid token") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  if (error.message === "Forbidden") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}
