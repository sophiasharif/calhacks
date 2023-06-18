import generateChatGPTResponse from "./generateGPTResponse";
import { factCheckPrompt } from "./prompts";

export default async function factCheck(text) {
	console.log("factCheck text: ", factCheckPrompt);
	const response = JSON.parse(
		await generateChatGPTResponse(factCheckPrompt, text)
	);

	return response;
}
