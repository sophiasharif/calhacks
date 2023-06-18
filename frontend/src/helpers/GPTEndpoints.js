import generateChatGPTResponse from "./generateGPTResponse";
import { factCheckPrompt, suggestionPrompt, summarizePrompt } from "./prompts";

export async function factCheck(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(factCheckPrompt, text)
	);

	return response;
}

export async function suggestAnswers(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(suggestionPrompt, text)
	);

	return response;
}

export async function summarizeLessonPlan(text) {
	const response = await generateChatGPTResponse(summarizePrompt, text);

	return response;
}
