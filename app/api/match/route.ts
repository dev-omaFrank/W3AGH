import { NextRequest, NextResponse } from "next/server";
import grants from "@/app/data/grants.json";

export async function POST(req: NextRequest) {
    try {
        const { category, ecosystem, stage, description, supportNeeded } =
            await req.json();

        const prompt = `
            You are a grant ranking engine.

            You will be given:
            1. A list of real grants
            2. A startup profile

            Your job:
            - Rank the grants by relevance
            - Return ONLY the top 10
            - Do NOT create new grants

            STRICT RULES:
            - Output ONLY valid JSON
            - No explanations
            - No markdown
            - No extra text
            - Use ONLY provided grant IDs

            Return format:
            {
            "matches": [
                {
                "id": "string",
                "score": number,
                "reason": "string"
                }
            ]
            }

            User profile:
            Category: ${category}
            Ecosystem: ${ecosystem}
            Stage: ${stage}
            Description: ${description}
            Support Needed: ${supportNeeded?.join(", ")}

            Available Grants:
            ${JSON.stringify(grants.slice(0, 50))}
        `;

        const response = await fetch("https://api.chaingpt.org/chat/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            },
            body: JSON.stringify({
                model: "general_assistant",
                question: prompt
            }),
        });

        //read the full response stream

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

        // extract json
        let parsed;

        try {

            // Step 1: clean markdown
            let cleaned = result
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            // Step 2: extract JSON block safely
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error("No JSON object found");
            }

            let jsonString = jsonMatch[0];

            // Step 3: remove invalid trailing commas (VERY IMPORTANT)
            jsonString = jsonString.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

            // Step 4: parse
            parsed = JSON.parse(jsonString);

            //transform
            const enriched = parsed.matches.map((m: any) => {
                const grant = grants.find((g) => g.id === m.id);

                if(!grant) return null;

                return {
                    ...grant, 
                    score: m.score,
                    reason: m.reason,
                };
            }).filter(Boolean);

            return NextResponse.json({ matches: enriched })
        } catch (err) {

            console.error("JSON Parse Error:", err);
            console.log("Raw AI Response:", result);

            return NextResponse.json({ matches: [] });
        }

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("API Error: ", error);

        return NextResponse.json(
            { matches: [] },
            { status: 500 }
        )
    }
}