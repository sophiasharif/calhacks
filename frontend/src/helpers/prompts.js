const factCheckPrompt =
  "Do not respond with anything except for a json object. The json object should contain a boolean field called factual. If everything in the paragraph is accurate, set the value of factual to true. Otherwise, if the paragraph contains inaccuracies, add a field in the json of an array of one sentence long string describing the corrections.  Here is the text you should fact check: ";

const suggestionPrompt =
  "Do not respond with anything except for a json object, which has a field containsQuestion. If the text below contains a question, do the following three things: 1) set containsQuestion to true. 2) add a field called question with the question in the text in proper english. 3) add a field called answer, with the answer to the question.  Here is the text you should analyze: ";

const summarizePrompt =
  "Summarize the lesson plan provided below. The intent is for the summary to be provided as context before a question relating to the lesson is asked.  Do not respond with anything except for a 1-2 sentence summary.";

export { factCheckPrompt, suggestionPrompt, summarizePrompt };
