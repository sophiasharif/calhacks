import factCheckClaim from "./factCheckClaim";
import generateChatGPTResponse from "./generateGPTResponse";
import {
	factCheckPrompt,
	suggestionPrompt,
	summarizePrompt,
	getFactsPrompt,
} from "./prompts";

export const LESSON_CONTEXT = {};

export async function factCheck(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(LESSON_CONTEXT.text, factCheckPrompt, text)
	);

	return response;
}

export async function suggestAnswers(text) {
	const response = JSON.parse(
		await generateChatGPTResponse(LESSON_CONTEXT.text, suggestionPrompt, text)
	);

	return response;
}

export async function summarizeLessonPlan(text) {
	const response = await generateChatGPTResponse(summarizePrompt, text);

	return response;
}

export async function getContradictingSources(text) {
	// works but is very slow!

	const claims = JSON.parse(
		await generateChatGPTResponse(getFactsPrompt, text)
	)["claims"];

	let sources = [];
	for (let i = 0; i < claims.length; i++) {
		const claimCheck = await factCheckClaim(claims[i]);
		console.log(claimCheck); // print every claim it sends a request to
		sources.push(claimCheck.article);
	}

	console.log(sources); // prints all the sources at the end
	return sources;
}
