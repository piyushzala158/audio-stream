import { NextResponse } from "next/server";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

export async function GET(request, { params }) {
  try {
    const id = params.id;

    // const { data, error } = await supabase
    //   .from("streams")
    //   .select("*")
    //   .eq("id", id)
    //   .single();

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }

    // if (!data) {
    //   return NextResponse.json({ error: "Stream not found" }, { status: 404 });
    // }

    // return NextResponse.json({ stream: data });
  } catch (error) {
    console.error("Error fetching stream details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
