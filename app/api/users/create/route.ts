import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const roleHierarchy = {
  ADMIN: ["PRINCIPAL", "HOD", "DEPARTMENT_COORDINATOR", "PROFESSOR", "STUDENT"],
  PRINCIPAL: ["HOD", "DEPARTMENT_COORDINATOR", "PROFESSOR", "STUDENT"],
  HOD: ["DEPARTMENT_COORDINATOR", "PROFESSOR", "STUDENT"],
  DEPARTMENT_COORDINATOR: ["STUDENT"],
  PROFESSOR: [], // cannot create accounts
  STUDENT: [], // cannot create accounts
};

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (uncomment when auth is fully implemented)
    // const user = authenticate(request);
    // if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { userId, name, email, password, role, departmentId } =
      await request.json();

    // Basic validation
    if (!userId || !name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if userId or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ userId: userId }, { email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.userId === userId) {
        return NextResponse.json(
          { message: "User ID already exists" },
          { status: 409 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "Email already exists" },
          { status: 409 }
        );
      }
    }

    // Validate department for roles that require it
    const rolesRequiringDepartment = [
      "HOD",
      "DEPARTMENT_COORDINATOR",
      "PROFESSOR",
      "STUDENT",
    ];
    if (rolesRequiringDepartment.includes(role)) {
      if (!departmentId) {
        return NextResponse.json(
          { message: "Department is required for this role" },
          { status: 400 }
        );
      }

      // Check if department exists
      const department = await prisma.department.findUnique({
        where: { id: departmentId },
      });

      if (!department) {
        return NextResponse.json(
          { message: "Invalid department" },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        userId: userId.trim(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role as any,
        departmentId: rolesRequiringDepartment.includes(role)
          ? departmentId
          : null,
        // createdBy: user.id, // Uncomment when auth is implemented
      },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        role: true,
        departmentId: true,
        createdAt: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "User ID or email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
