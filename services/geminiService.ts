
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface Recommendation {
  mood: string;
  activity: string;
  reason: string;
  matchScore: number;
}

export const getExperienceRecommendations = async (intent: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is looking for an experience in an urban setting. Their current state or desire is: "${intent}". 
      Suggest 3 unique experience types (like forest bathing, mixology, etc.) that would provide the joy they seek. 
      Be poetic and high-end in your reasoning.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mood: { type: Type.STRING, description: "The emotional landscape of this recommendation." },
                  activity: { type: Type.STRING, description: "The specific Trove-style activity." },
                  reason: { type: Type.STRING, description: "A poetic explanation of why this matches the user's soul." },
                  matchScore: { type: Type.NUMBER, description: "A percentage from 0 to 100." }
                },
                required: ["mood", "activity", "reason", "matchScore"]
              }
            }
          },
          required: ["recommendations"]
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Curation Error:", error);
    return null;
  }
};
