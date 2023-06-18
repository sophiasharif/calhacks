import generateChatGPTResponse from "./generateGPTResponse";
import { summarizePrompt } from "./prompts";

export default async function summarize(lesson_plan) {
  const prompt = summarizePrompt + lesson_plan;
  const response = await generateChatGPTResponse(prompt);

  return response;
}
