import generateChatGPTResponse from "./generateGPTResponse";
import { factCheckPrompt } from "./prompts";

export default async function factCheck(text) {
	const prompt = factCheckPrompt + text;
	const response = JSON.parse(await generateChatGPTResponse(prompt));

	return response;
}
