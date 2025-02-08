import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import { auth } from "@/auth";



export async function GET(req:NextRequest) {

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");


  try {

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
 
    )

    // Now you can query with RLS enabled.
    const {data , error}= await supabase.schema('public').from('streams').select('*')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ streams: data })
  } catch (error) {
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}