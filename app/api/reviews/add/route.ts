import { type NextRequest } from "next/server";

export function POST(req: NextRequest) {
    return new Response("Hello, Next.js!");
};
