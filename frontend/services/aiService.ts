import { Theme, FeedbackItem } from '../types.ts';

const OPENROUTER_API_KEY = (import.meta as any).env?.VITE_OPENROUTER_API_KEY || (typeof process !== 'undefined' ? process.env.OPENROUTER_API_KEY : '') || '';

export async function synthesizeFeedback(feedbackItems: FeedbackItem[]): Promise<Theme[]> {
  // We only send the ID and text to the model to save tokens and keep the prompt focused.
  const feedbackData = feedbackItems.map(f => ({ id: f.id, text: f.text }));
  
  const prompt = `
    You are an expert AI Product Manager. Analyze the following customer feedback items.
    Group them into recurring themes or problems.
    
    For each theme, provide:
    - title: A short, descriptive title (e.g., "Onboarding Complexity")
    - problemStatement: A clear, 1-sentence problem statement explaining what users are struggling with.
    - confidence: A confidence score (0-100) based on how clear and consistent the signal is across the feedback.
    - trend: 'up', 'down', or 'flat' (estimate based on the severity and consistency of the language).
    - trendValue: A string representing the trend (e.g., '15%', 'Stable', 'High').
    - affectedSegment: Guess the affected customer segment based on context (e.g., 'New Users', 'Enterprise', 'All Users').
    - mentions: The exact number of feedback items you grouped into this theme.
    - isEmerging: boolean (true if it seems like a new, acute issue).
    - feedbackIds: An array of the exact 'id' strings of the feedback items that belong to this theme. This is critical for traceability.

    Feedback Data:
    ${JSON.stringify(feedbackData)}

    IMPORTANT: Return ONLY a valid JSON array of objects with these properties. Do not include introductory text.
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'liquid/lfm-2.5-2.6b:free',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      throw new Error(data.error.message || "OpenRouter API request failed");
    }

    const contentText = data.choices?.[0]?.message?.content || "";
    const cleanJson = contentText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJson);
    
    return result.map((item: any, index: number) => ({
      id: `ai-theme-${Date.now()}-${index}`,
      title: item.title || "Feedback Issue",
      problemStatement: item.problemStatement || "User feedback signal detected.",
      confidence: item.confidence || 85,
      trend: (item.trend as 'up' | 'down' | 'flat') || 'flat',
      trendValue: item.trendValue || 'Stable',
      mentions: item.mentions || 1,
      affectedSegment: item.affectedSegment || 'All Users',
      feedbackIds: item.feedbackIds || [],
      isEmerging: item.isEmerging || false
    }));
  } catch (e: any) {
    console.error("Failed to synthesize feedback:", e);
    throw new Error(`AI Processing Error: ${e.message}`);
  }
}
