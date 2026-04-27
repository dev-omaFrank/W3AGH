import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL("https://api.chaingpt.org/news");
        url.searchParams.append("limit", "20");
        url.searchParams.append("sortBy", "createdAt");

        const response = await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            }
        });

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error) {
        console.error("API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        );
    }
}