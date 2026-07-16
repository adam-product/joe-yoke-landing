import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mockDatabaseGames = [
      { id: 1, title: "Neon Rush", genre: "Racing & Speed", accent: "text-primary" },
    ];
    return NextResponse.json(mockDatabaseGames, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Saving new game to database:", data);
    return NextResponse.json({ message: "Game saved successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save game" }, { status: 500 });
  }
}