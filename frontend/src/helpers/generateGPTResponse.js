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
  prompt,
  tokens = 500,
  temperature = 0.75
) {
  const api_key = import.meta.env.VITE_OPENAI_KEY;
  console.log(api_key);
  const client = axios.create({
    headers: {
      Authorization: "Bearer " + api_key,
    },
  });

  const params = {
    prompt: prompt,
    model: "text-davinci-003",
    max_tokens: tokens,
    temperature: temperature,
  };

  try {
    const result = await client.post(
      "https://api.openai.com/v1/completions",
      params
    );
    return result.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}
