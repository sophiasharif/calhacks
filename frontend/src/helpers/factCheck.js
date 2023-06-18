import generateChatGPTResponse from "./generateGPTResponse";
import { factCheckPrompt } from "./prompts";

export default async function factCheck(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(factCheckPrompt, text)
	);

	return response;
}
