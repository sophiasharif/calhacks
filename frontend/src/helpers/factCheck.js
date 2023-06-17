import generateChatGPTResponse from "./generateGPTResponse";

export default async function factCheck(text) {
  const question =
    "Do not respond with anything except for a json object. The json object should contain a boolean field called factual. If everything in the paragraph is accurate, set the value of factual to true. Otherwise, if the paragraph contains inaccuracies, add a field in the json of an array of one sentence long string describing the corrections.  Here is the text you should fact check: \n\n";
  const prompt = question + text;
  //   const prompt = JSON.stringify([
  //     {
  //       role: "system",
  //       content:
  //         "Do not respond with anything except for a json object. The json object should contain a boolean field called factual. If everything in the paragraph is accurate, set the value of factual to true. Otherwise, if the paragraph contains inaccuracies, add a field in the json of an array of one sentence long string describing the corrections.",
  //     },
  //     { role: "user", content: text },
  //   ]);
  const response = JSON.parse(await generateChatGPTResponse(prompt));

  return response;
}
