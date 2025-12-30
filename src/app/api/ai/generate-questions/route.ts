import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import { join } from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractPdfText(filepath: string): Promise<string> {
  try {
    // For now, use a simple placeholder extraction
    // In production, you would use pdfjs-dist or a server-side PDF parser
    // This returns sample text for demonstration
    const sampleText = `This is sample educational content extracted from your PDF document. 
    The AI will generate questions based on your actual PDF content once you configure the PDF extraction library.
    For production use, integrate pdfjs-dist or python-based PDF parsing like PyPDF2 or pdfplumber.`;
    
    return sampleText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return "";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, numQuestions = 5 } = body;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { questions: true },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Extract text from PDF
    const pdfText = await extractPdfText(document.filePath);

    if (!pdfText) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      );
    }

    // Generate questions using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert educational content creator. Generate ${numQuestions} multiple-choice questions based on the provided text. 
          For each question, provide:
          1. The question text
          2. Four options (A, B, C, D)
          3. The correct answer (A, B, C, or D)
          
          Format your response as a JSON array with objects containing: { "text": "question", "options": ["A) option1", "B) option2", "C) option3", "D) option4"], "answer": "A" }`,
        },
        {
          role: "user",
          content: `Generate questions from this text (first 2000 characters):\n\n${pdfText.substring(0, 2000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let questions = [];
    try {
      const content = response.choices[0].message.content || "";
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 400 }
      );
    }

    // Save questions to database
    const savedQuestions = await Promise.all(
      questions.map((q: any) =>
        prisma.question.create({
          data: {
            text: q.text,
            options: JSON.stringify(q.options),
            answer: q.answer,
            type: "multiple-choice",
            documentId,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      questionsGenerated: savedQuestions.length,
      questions: savedQuestions,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
