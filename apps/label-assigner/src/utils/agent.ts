import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({api_key:process.env.api_key!});
asynnc function assignLabel(body:string):Promise<string>{
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:`Your task: Read the email body provided below and assign the most suitable tag.
The tag should reflect the overall intent or category of the email. 
Possible example tags include (but are NOT limited to): 
"important", "spam", "work", "personal", "urgent", 
"follow-up", "meeting", "invoice", "support", "job-application", 
"newsletter", "notification", "promotion", "reminder".

Rules:
1. Only choose ONE tag.
2. Think based on the content, tone, urgency, and purpose of the email.
3. The final output must ALWAYS be a valid JSON object.
4. Do NOT include explanations, only the JSON result.

Email Body:
${body}
Output JSON format:
{
  "tag": "<tag-name>"
}`,
  });
  return response.text
}

export default assignLabel;