import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json()
    try {
        const response = await fetch("https://api.chaingpt.org/chat/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            },
            body: JSON.stringify({
                model: "general_assistant",
                question: message,
                "selectedTone": "CONVERSATIONAL",
                "chatHistory": "off"
            }),
        });


        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let result = "";

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value);
            }
        }

        // console.log("result: ", result);

        return NextResponse.json({ reply: result });        
    } catch (error) {
        console.error(error);

        return NextResponse.json({ status: 500 })
    }
}
