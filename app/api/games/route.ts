import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET handler to fetch games from Supabase
export async function GET() {
  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

// POST handler to save a new game to Supabase
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { data: newGame, error } = await supabase
      .from("games")
      .insert([
        {
          title: data.title,
          genre: data.genre,
          accent: data.accent,
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Game saved successfully", game: newGame }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save game" }, { status: 500 });
  }
}