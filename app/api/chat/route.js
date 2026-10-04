import Anthropic from "@anthropic-ai/sdk";
import { BLOCKED_MESSAGE, HANDOFF_MESSAGE, SYSTEM_PROMPT, isBlocked, localAnswer } from "@/lib/support";

const MAX_MESSAGES = 20;
const MAX_LENGTH = 1000;

// Without ANTHROPIC_API_KEY the bot answers from the built-in keyword replies
const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
        .slice(-MAX_MESSAGES)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_LENGTH) }))
    : [];

  // The API requires the conversation to start with a user turn
  while (messages.length && messages[0].role !== "user") messages.shift();
  const question = messages.at(-1);
  if (!question || question.role !== "user") {
    return Response.json({ error: "Missing question" }, { status: 400 });
  }

  if (isBlocked(question.content)) {
    return Response.json({ reply: BLOCKED_MESSAGE, blocked: true });
  }

  if (!client) {
    return Response.json({ reply: localAnswer(question.content) });
  }

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ reply: BLOCKED_MESSAGE, blocked: true });
    }

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    return Response.json({ reply: reply || HANDOFF_MESSAGE });
  } catch (error) {
    console.error("Chat support error:", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
    // Keep helping the visitor even if the AI service is unavailable
    return Response.json({ reply: localAnswer(question.content) });
  }
}
