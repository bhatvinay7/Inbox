import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({api_key:process.env.api_key!});
asynnc function assignLabel(body:string):Promise<string>{
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:`Your task: Read the email body provided below and assign the most suitable tag.
The tag should reflect the overall intent or category of the email.

You must also detect alternative words that map to the same tag based on the following mapping:

Tag → Alternative Code Words Mapping:
{
  "important": "high-priority",
  "spam": "unwanted",
  "work":"task",
  "personal":"family",
  "urgent":"emergency",
  "follow-up":"checking-in",
  "meeting":"discussion",
  "invoice":"receipt",
  "support":"help",
  "job-application":"hiring",
  "newsletter":"subscription",
  "notification":"system-update",
  "promotion":"offer",
  "reminder":"later-alert"
}

Rules:
1. Only choose ONE tag.
2. Use the above alternative words—if any appear in the email body, map them to the correct tag.
3. Think based on the content, tone, urgency, purpose, and the alternative keyword matches.
4. The final output must ALWAYS be a valid JSON object.
5. Do NOT include explanations, only the JSON result.

Email Body:
${body}

Output JSON format:
{
  "tag": "<tag-name>"
}`

  });
  return response.text
}

export default assignLabel;