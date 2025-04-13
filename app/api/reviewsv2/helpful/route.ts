import dbConnect from "@/lib/db"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        
    } catch (error) {
        
    }
}