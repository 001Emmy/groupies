import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const courseId = formData.get("courseId") as string;
    const courseName = formData.get("courseName") as string;

    if (!file || !courseId || !courseName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to Base64 for storage in database
    const base64Content = buffer.toString("base64");

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;

    // Save to database (with Base64 encoded content)
    const document = await prisma.document.create({
      data: {
        filename,
        originalName: file.name,
        courseId,
        courseName,
        fileSize: buffer.length,
        filePath: base64Content, // Store Base64 content in filePath field
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");

    let documents;
    if (courseId) {
      documents = await prisma.document.findMany({
        where: { courseId },
        include: {
          questions: true,
        },
        orderBy: {
          uploadedAt: "desc",
        },
      });
    } else {
      documents = await prisma.document.findMany({
        include: {
          questions: true,
        },
        orderBy: {
          uploadedAt: "desc",
        },
      });
    }

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
