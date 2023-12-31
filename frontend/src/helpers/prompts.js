const factCheckPrompt =
	"Do not respond with anything except for a JSON object. The JSON object should contain the following fields: \n1) factual: If everything in the paragraph below is accurate, set the value of factual to true. If the paragraph below contains inaccuracies, set factual to false. \n2) unclear: If the statement is too vague or short to evaluate, set unclear to true. If it is not possible to determine if there are inaccuracies, set unclear to true. \n3) corrections: If factual is false, set corrections to an array of one sentence long strings describing the corrections to the paragraph. \n\nHere is the text you should fact check:";

const suggestionPrompt =
	"Do not respond with anything except for a JSON object, which has a field containsQuestion. If the text below contains a question, do the following three things: 1) set containsQuestion to true. 2) add a field called question with the question in the text in proper english. 3) add a field called answer, with the answer to the question. Here is the text you should analyze: ";

const summarizePrompt =
	"Do not respond with anything except for a JSON object. The JSON object should contain a field called summary. Summarize the lesson plan provided below in 1 to 2 sentences. The intent is for the summary to be provided as context before a question relating to the lesson is asked.";

const getFactsPrompt =
	"List all the claims made in the text provided below. Do not respond with anything except for a JSON object with a claims field that is an array of claims made in the text. Each claim should be stand-alone and comprehensible when read on its own. Here is the text:";

export { factCheckPrompt, suggestionPrompt, summarizePrompt, getFactsPrompt };
