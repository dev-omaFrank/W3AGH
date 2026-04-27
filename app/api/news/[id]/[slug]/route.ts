import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string; slug: string } }) {
    console.log(3)
    try {
        const { id, slug } = params;
        const url = `https://api.chaingpt.org/news/${id}/${slug}`;

        const response = await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            }
        });

        const data = await response.json();

        console.log(data);

        return NextResponse.json(data);

    } catch (error) {
        console.error("API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        );
    }
}