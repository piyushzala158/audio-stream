// import supabase from "@/config/supabase"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    console.log('request: ', request);
  try {
    const { userId, title, description } = await request.json()
    console.log(' userId, title, description: ',  userId, title, description);

    // Input validation
    if (!userId || !title) {
      return NextResponse.json({ error: "User ID and title are required" }, { status: 400 })
    }

    // const { data, error } = await supabase.from("streams").insert([{ user_id: userId, title, description }])

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 })
    // }

    // return NextResponse.json({ data })
  } catch (error) {
    console.error("Error creating stream:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

