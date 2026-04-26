import { NextRequest, NextResponse } from "next/server";

type Vulnerability = {
    type: string;
    description: string;
    severity: "Low" | "Medium" | "High";
};

type AuditResult = {
    summary: string;
    vulnerabilities: Vulnerability[];
    suggestions: string[];
};

export async function POST(req: NextRequest) {
    try {
        const { codeToAudit } = await req.json();

        if (!codeToAudit) {
            return NextResponse.json(
                { error: "codeToAudit is required" },
                { status: 400 }
            );
        }

        const prompt = `
            You are an expert Web3 smart contract auditor.

            Analyze the provided code for security issues and best practices.

            STRICT RULES:
            - Output ONLY valid JSON
            - No markdown
            - No explanations
            - No extra text

            Return format:
            {
                "summary": "Brief overall assessment",
                "vulnerabilities": [
                    {
                        "type": "Vulnerability name",
                        "description": "Explanation",
                        "severity": "Low | Medium | High"
                    }
                ],
                "suggestions": [
                    "Fix 1",
                    "Fix 2"
                ]
            }

            Code to audit:
            ${codeToAudit}
        `;

        const response = await fetch("https://api.chaingpt.org/chat/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHAINGPT_API_KEY}`,
            },
            body: JSON.stringify({
                model: "smart_contract_auditor",
                question: prompt,
                selectedTone: "PROFESSIONAL",
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

        let parsed: AuditResult | null = null;

        try {
            // Step 1: clean markdown
            let cleaned = result
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            // Step 2: extract JSON
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error("No JSON object found");
            }

            let jsonString = jsonMatch[0];

            // Step 3: fix trailing commas
            jsonString = jsonString
                .replace(/,\s*}/g, "}")
                .replace(/,\s*]/g, "]");

            // Step 4: parse
            parsed = JSON.parse(jsonString);

            return NextResponse.json({ result: parsed });
        } catch (err) {
            console.error("JSON Parse Error:", err);
            console.log("Raw AI Response:", result);

            return NextResponse.json({
                summary: "Failed to parse AI response",
                vulnerabilities: [],
                suggestions: [],
            });
        }
    } catch (error) {
        console.error("API Error:", error);

        return NextResponse.json(
            {
                error: "Internal server error",
                summary: "",
                vulnerabilities: [],
                suggestions: [],
            },
            { status: 500 }
        );
    }
}