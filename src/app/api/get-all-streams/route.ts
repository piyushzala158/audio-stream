import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get the user's ID from the session
    const {
        data: { session },
      } = await supabase.auth.getSession()
    console.log('user111111111111111111111: ', session);

    if (!session) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const userId = session.user.id

    // Fetch streams for the current user
    const { data, error } = await supabase.from("streams").select("id, title, user_id").eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ streams: data })
  } catch (error) {
    console.error("Error fetching streams:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

