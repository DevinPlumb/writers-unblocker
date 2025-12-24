import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { quote, author, prompt } = await request.json();

    if (!quote || !prompt) {
      return NextResponse.json(
        { error: "Quote and prompt are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a skilled screenwriter who writes compelling, emotionally resonant scenes. 
Your task is to write a short screenplay scene (1-2 pages) inspired by a given quote.

Format your output in proper screenplay format:
- Scene headings in ALL CAPS (e.g., INT. COFFEE SHOP - DAY)
- Character names centered and in ALL CAPS before dialogue
- Action lines in present tense
- Parentheticals for tone/delivery when needed
- Keep dialogue natural and subtext-rich

The scene should:
- Capture the essence or theme of the inspiring quote
- Be dramatic and engaging
- Have 2-3 characters maximum
- Include a clear beginning, middle, and emotional beat
- Be approximately 300-500 words`;

    const userPrompt = `Inspiring Quote: "${quote}" — ${author}

Scene Context: ${prompt}

Write a compelling screenplay scene inspired by this quote and context.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const scene = completion.choices[0]?.message?.content;

    if (!scene) {
      throw new Error("No scene generated");
    }

    return NextResponse.json({ scene });
  } catch (error) {
    console.error("Error generating scene:", error);
    
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add your API key to .env.local" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate scene. Please try again." },
      { status: 500 }
    );
  }
}

