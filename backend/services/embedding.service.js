import { CohereClient }
from "cohere-ai";

const cohere = new CohereClient({
 token: process.env.COHERE_API_KEY
});

export async function createEmbedding(
 text
){

 const response =
 await cohere.embed({
   texts:[text],
   model:"embed-v4.0",
   inputType:"search_document"
 });

 return response.embeddings[0];
}