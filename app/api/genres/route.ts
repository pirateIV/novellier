import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("https://openlibrary.org/subjects/history.json?details=true")
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
    }
}