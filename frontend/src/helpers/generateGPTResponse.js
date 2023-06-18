import axios from "axios";

/*
Parameter explanation:
    prompt: a string with the prompt you want to send ChatGPT
    tokens: 1 token = 4 chars / .75 words
            100 tokens = 75 words / 1 paragraph;
            (this is how OpenAI determines the cost of the query)
    temperature: determines the randomness / creativity of the response. Ranges from 0 to 1.
        0 = very straightforward, almost deterministic; you almost always get the same response from a given prompt
        1 = responses can vary wildly

Function returns ChatGPT's response. 
Make sure to inlude "await" before the function call since the API query happens asyncronously.
    (meaning the rest of the code won't wait for the line to complete before it runs)
*/

export default async function generateChatGPTResponse(
	responseInstructions,
	content,
	tokens = 500,
	temperature = 0.1
) {
	const api_key = import.meta.env.VITE_OPENAI_KEY;
	const client = axios.create({
		headers: {
			Authorization: "Bearer " + api_key,
		},
	});

	// TODO: fix this
	const messages = [
		{
			role: "system",
			content:
				"You are an AI language model that responds as consicely as possible and follows the propmts properly.",
		},
		{ role: "user", content: responseInstructions + "\n\n" + content },
		// { role: "user", content: content },
	];
	// const messageJson = JSON.stringify(messages);
	// console.log("messages json: ", messageJson);

	// const prompt = responseInstructions + "\n\n" + content + "\n";

	const params = {
		prompt: prompt,
		messages: messages,
		model: "gpt-3.5-turbo",
		max_tokens: tokens,
		temperature: temperature,
	};

	try {
		console.log("params: ", params);
		const result = await client.post(
			"https://api.openai.com/v1/chat/completions",
			params
		);

		const response = result.data.choices[0].message.content;
		console.log("response: ", response);

		return response;
	} catch (error) {
		console.error("ERROR!!", error);
	}
}
