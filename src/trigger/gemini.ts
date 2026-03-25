import { task } from "@trigger.dev/sdk/v3";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiTaskPayload {
  system_prompt?: string;
  user_message: string;
  images?: string[];
  model?: string;
}

export const geminiTask = task({
  id: "gemini-llm",
  run: async (payload: GeminiTaskPayload) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: payload.model || "gemini-1.5-pro" });

    const promptParts: any[] = [];
    if (payload.system_prompt) {
      promptParts.push(payload.system_prompt);
    }
    promptParts.push(payload.user_message);

    if (payload.images && payload.images.length > 0) {
      for (const imageUrl of payload.images) {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        promptParts.push({
          inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType: "image/jpeg", // Simplified for demo
          },
        });
      }
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    return response.text();
  },
});
