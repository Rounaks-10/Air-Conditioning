import { CohereClient }
from "cohere-ai";

const cohere =
new CohereClient({
 token:
 process.env.COHERE_API_KEY
});

export async function askLLM(
 question,
 context
){

 const prompt=`

You are an AC Store Assistant.

Use ONLY the provided context.

If answer is unavailable,
reply:

"I couldn't find that information."

Context:

${context}

Question:

${question}

`;

 const response=
 await cohere.chat({
   model:"command-a-03-2025",
   message:prompt
 });

 return response.text;
}