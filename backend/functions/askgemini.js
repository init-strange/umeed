import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askGemini = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return {
      success: true,
      text: response.text,
    };
  } catch (error) {
    console.error("❌ Gemini error:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }
};

export default askGemini;
