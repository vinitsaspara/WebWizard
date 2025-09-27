import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d"; // token valid for 7 days

export function generateToken(user: User) {
  return jwt.sign(
    { id: user.id, role: user.role }, // payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      iat: number;
      exp: number;
    };
  } catch (error) {
    return null;
  }
}
