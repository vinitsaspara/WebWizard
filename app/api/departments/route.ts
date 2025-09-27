import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Authenticate user (uncomment when auth is fully implemented)
    // const user = authenticate(request);
    // if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { message: "Error fetching departments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (uncomment when auth is fully implemented)
    // const user = authenticate(request);
    // if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "Department name is required" },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error: any) {
    console.error("Error creating department:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Department name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error creating department" },
      { status: 500 }
    );
  }
}
