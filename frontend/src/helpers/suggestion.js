import generateChatGPTResponse from "./generateGPTResponse";
import { suggestionPrompt } from "./prompts";

export default async function factCheck(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(suggestionPrompt, text)
	);

	return response;
}
