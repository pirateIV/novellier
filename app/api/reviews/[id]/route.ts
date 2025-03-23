import dbConnect from "@/lib/db";
import Review from "@/shared/models/Review";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!id) {
    return NextResponse.json({ error: "Review ID not found!" });
  }

  console.log({ id });

  try {
    await dbConnect();

    const review = await Review.findById(id).populate("reviewer", "-password -books",);
    console.log({ review });
    return NextResponse.json({ review });
  } catch (error) { 
    return NextResponse.json(error);
  }
}
