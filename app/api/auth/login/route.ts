import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ id: user.id, role: user.role, department: user.departmentId }, JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json({ token });
}
