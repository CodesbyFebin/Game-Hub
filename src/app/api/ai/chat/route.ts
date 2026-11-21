import { NextRequest, NextResponse } from "next/server";
import { SarvamAIClient } from "sarvamai";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const SYSTEM_PROMPT = "You are GameHub AI, a helpful, concise gaming assistant. Never imply fictional platform games, rewards, or connections are verified.";
export async function POST(req: NextRequest) {
  const key = process.env.SARVAM_API_KEY;
  if (!key) return NextResponse.json({error: "Sarvam is not configured."}, {status:503});
  try {
    const body = await req.json();
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 12 ||
        !messages.every((m: unknown) => {
          if (!m || typeof m !== "object") return false;
          const v = m as Record<string,unknown>;
          return ["assistant","user"].includes(String(v.role)) && typeof v.content === "string" && v.content.length > 0 && v.content.length <= 2000;
        })) {
      return NextResponse.json({error:"Expected 1–12 user/assistant messages, each <=2000 characters."}, {status:400});
    }
    const client = new SarvamAIClient({apiSubscriptionKey:key});
    const model = process.env.SARVAM_MODEL || "sarvam-105b-conversations";
    const response = await client.chat.completions({
      model,
      messages:[{role:"system",content:SYSTEM_PROMPT}, ...messages]
    } as Parameters<typeof client.chat.completions>[0]);
    const data = response as unknown as {choices?:{message?:{content?:string}}[];usage?:{total_tokens?:number}};
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return NextResponse.json({error:"The AI returned no response."},{status:502});
    return NextResponse.json({reply,model,charged:false,creditsUsed:0});
  } catch (e) {
    console.error("Sarvam API request failed", e instanceof Error ? e.name : "Unknown error");
    return NextResponse.json({error:"Unable to reach AI service."},{status:502});
  }
}
