import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const {title, description, category, ecosystem, funding, message} = await req.json();

    
    const grantInfo = `
        Name: ${title}
        Description: ${description}
        Category: ${category}
        Ecosystem: ${ecosystem}
        Funding: ${funding}
    `;

    const prompt = `
        You are a helpful Web3 grant assistant.

        GRANT DETAILS: 
        ${grantInfo}

        USER QUESTION:
        ${message}

        Using the grant details, answer the users questions clearly and concisely.
    `;

    try {
        const response = await fetch("https://api.chaingpt.org/chat/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            },
            body: JSON.stringify({
                model: "general_assistant",
                question: prompt,
                "selectedTone": "CONVERSATIONAL"
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

        console.log("result: ", result);
        return NextResponse.json({ reply: result });
    }catch(err){
        console.error(err);

        return NextResponse.json({status: 500})
    }
}