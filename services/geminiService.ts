import { GoogleGenAI, SchemaType } from "@google/genai";
import { SocialUpdate, Contact, UserPreferences } from '../types';

// Initialize Gemini Client
// CRITICAL: Using process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Generates suggested replies for a specific social update.
 */
export const generateReplySuggestions = async (
  update: SocialUpdate,
  contact: Contact,
  prefs: UserPreferences
): Promise<string[]> => {
  try {
    const prompt = `
      You are a personal social assistant. 
      Context: My friend ${contact.name} sent/posted: "${update.content}" via ${update.channel}.
      My relationship circle: ${contact.circle}.
      My preferences: Tone: ${prefs.tone}, Emojis: ${prefs.emojiUsage}.
      Forbidden words: ${prefs.forbiddenWords.join(', ')}.

      Generate 3 distinct reply options I could send back.
      1. Supportive/Nice
      2. Question/Curious
      3. Short/Casual
      
      Return ONLY the 3 reply strings separated by a pipe character "|". Do not add numbering.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    const text = response.text || "";
    const suggestions = text.split('|').map(s => s.trim()).filter(s => s.length > 0);
    return suggestions.slice(0, 3);
  } catch (error) {
    console.error("Error generating replies:", error);
    return ["Sounds great!", "Wow!", "Can't wait to hear more."];
  }
};

/**
 * Chat with the agent about your social circle.
 */
export const chatWithAgent = async (
  message: string,
  contextUpdates: SocialUpdate[],
  contextContacts: Contact[]
): Promise<string> => {
  try {
    // Prepare context for the model
    const recentActivity = contextUpdates.map(u => {
        const contact = contextContacts.find(c => c.id === u.contactId);
        return `- ${contact?.name} (${u.channel}): ${u.content} [${u.timestamp}]`;
    }).join('\n');

    const prompt = `
      You are "Kinship", a helpful, warm social assistant friend.
      
      Here is the recent activity from the user's social circle:
      ${recentActivity}

      User's message: "${message}"

      Answer the user's question based on the activity log above. 
      If the user asks to draft a message, draft it clearly.
      Be conversational, concise, and helpful.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "I'm having trouble connecting to your social brain right now.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "I apologize, I'm experiencing a temporary glitch. Please try again.";
  }
};