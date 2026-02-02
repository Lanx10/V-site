
import { GoogleGenAI, Type } from "@google/genai";
import { Preferences, QuoteData } from "./types";

export async function generatePersonalizedQuote(prefs: Preferences): Promise<QuoteData> {
  // Fix: Always use direct process.env.API_KEY when initializing GoogleGenAI
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate a beautiful, inspiring, and romantic quote for a person who loves the following things:
  - Color Theme: ${prefs.color}
  - Favorite Flower: ${prefs.bloom}
  - Favorite Companion: ${prefs.companion}
  - Favorite Treat: ${prefs.treat}

  The quote should be elegant and heartwarming. Subtly weave in imagery related to their choices if possible (e.g., mention the sweetness of the treat or the softness of the bloom). 
  Attribute it to a famous romantic figure (like Maya Angelou, Rumi, or Pablo Neruda) or a generic but beautiful persona if a specific one doesn't fit.

  Return the result in JSON format with keys "text" and "author".`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The inspirational quote text" },
            author: { type: Type.STRING, description: "The name of the author or persona" }
          },
          required: ["text", "author"]
        }
      }
    });

    // Fix: Use property access for response.text as per guidelines
    const result = JSON.parse(response.text || '{"text": "Love is the only reality and it is not a mere sentiment.", "author": "Rumi"}');
    return result as QuoteData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
      author: "Maya Angelou"
    };
  }
}
