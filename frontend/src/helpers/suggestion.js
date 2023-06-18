import generateChatGPTResponse from "./generateGPTResponse";
import { suggestionPrompt } from "./prompts";

export default async function factCheck(text) {
  const prompt = suggestionPrompt + text;
  console.log(prompt);
  const response = JSON.parse(await generateChatGPTResponse(prompt));

  return response;
}
